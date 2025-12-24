import jwt from 'jsonwebtoken';
import { Response } from 'express';

export interface JWTPayload {
  userId: string;
  email: string;
  householdId: string | null;
  role: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_change_in_production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your_refresh_secret_change_in_production';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '15m';
const JWT_REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || '7d';

/**
 * Generate access token (short-lived)
 */
export function generateAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

/**
 * Generate refresh token (long-lived)
 */
export function generateRefreshToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRY });
}

/**
 * Verify access token
 */
export function verifyAccessToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
}

/**
 * Set auth cookies on response
 */
export function setAuthCookies(res: Response, accessToken: string, refreshToken: string): void {
  const isProduction = process.env.NODE_ENV === 'production';

  // Access token cookie (HTTP-only, secure in production)
  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
  });

  // Refresh token cookie (HTTP-only, secure in production)
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });
}

/**
 * Clear auth cookies
 */
export function clearAuthCookies(res: Response): void {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
}
