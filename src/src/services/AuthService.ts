import bcrypt from 'bcrypt';
import db from '../config/knex';
import { generateAccessToken, generateRefreshToken, JWTPayload } from '../utils/jwt';
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

      // Create household if name provided
      if (householdName) {
        const [household] = await trx('households')
          .insert({
            name: householdName,
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

      return user;
    });

    logger.info(`New user signed up: ${email}`);

    // Generate tokens
    const payload: JWTPayload = {
      userId: result.id,
      email: result.email,
      householdId: result.household_id,
      role: result.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {
      user: this.formatUserResponse(result),
      accessToken,
      refreshToken,
    };
  }

  /**
   * Login user
   */
  async login(data: LoginData): Promise<AuthResponse> {
    const { email, password } = data;

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

    logger.info(`User logged in: ${email}`);

    // Generate tokens
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      householdId: user.household_id,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

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
