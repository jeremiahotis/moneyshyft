import bcrypt from 'bcrypt';
import db from '../config/knex';
import { generateAccessToken, generateRefreshToken, JWTPayload } from '../utils/jwt';
import { generateInvitationCode } from '../utils/invitationCode';
import logger from '../utils/logger';

const BCRYPT_ROUNDS = 12;

export interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  householdName?: string; // Optional - creates new household if provided
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  householdId: string | null;
  role: string;
  createdAt: Date;
}

export interface AuthResponse {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
  invitationCode?: string; // Only returned on signup when household is created
}

class AuthService {
  /**
   * Sign up a new user
   */
  async signup(data: SignupData): Promise<AuthResponse> {
    const { email, password, firstName, lastName, householdName } = data;

    // Check if user already exists
    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    // Use transaction to create user and optionally household
    const result = await db.transaction(async (trx) => {
      let householdId: string | null = null;
      let invitationCode: string | null = null;

      // Create household if name provided
      if (householdName) {
        // Generate unique invitation code
        let code = generateInvitationCode();
        let isUnique = false;
        let attempts = 0;
        const maxAttempts = 100;

        // Ensure uniqueness (with retry logic)
        while (!isUnique && attempts < maxAttempts) {
          const existing = await trx('households')
            .where({ invitation_code: code })
            .first();

          if (!existing) {
            isUnique = true;
          } else {
            code = generateInvitationCode();
            attempts++;
          }
        }

        if (attempts >= maxAttempts) {
          throw new Error('Failed to generate unique invitation code');
        }

        invitationCode = code;

        const [household] = await trx('households')
          .insert({
            name: householdName,
            invitation_code: invitationCode,
          })
          .returning('*');
        householdId = household.id;
      }

      // Create user (as admin if they created the household)
      const [user] = await trx('users')
        .insert({
          email,
          password_hash: passwordHash,
          first_name: firstName,
          last_name: lastName,
          household_id: householdId,
          role: householdId ? 'admin' : 'member',
        })
        .returning('*');

      return { user, invitationCode };
    });

    logger.info(`New user signed up: ${email}`);

    // Generate tokens
    const payload: JWTPayload = {
      userId: result.user.id,
      email: result.user.email,
      householdId: result.user.household_id,
      role: result.user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const response: AuthResponse = {
      user: this.formatUserResponse(result.user),
      accessToken,
      refreshToken,
    };

    // Include invitation code if household was created
    if (result.invitationCode) {
      response.invitationCode = result.invitationCode;
    }

    return response;
  }

  /**
   * Login user
   */
  async login(data: LoginData): Promise<AuthResponse> {
    const { email, password, rememberMe = false } = data;

    // Find user
    const user = await db('users').where({ email }).first();
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Update last login
    await db('users')
      .where({ id: user.id })
      .update({ last_login_at: db.fn.now() });

    logger.info(`User logged in: ${email}${rememberMe ? ' (Remember Me enabled)' : ''}`);

    // Generate tokens
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      householdId: user.household_id,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload, rememberMe);
    const refreshToken = generateRefreshToken(payload, rememberMe);

    return {
      user: this.formatUserResponse(user),
      accessToken,
      refreshToken,
    };
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<UserResponse | null> {
    const user = await db('users').where({ id: userId }).first();
    if (!user) {
      return null;
    }
    return this.formatUserResponse(user);
  }

  /**
   * Format user response (remove sensitive data)
   */
  private formatUserResponse(user: any): UserResponse {
    return {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      householdId: user.household_id,
      role: user.role,
      createdAt: user.created_at,
    };
  }
}

export default new AuthService();
