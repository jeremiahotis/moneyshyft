import { Pool } from 'pg';
import logger from '../utils/logger';

// Parse DATABASE_URL or use individual env vars
const getDatabaseConfig = () => {
  if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    return {
      host: url.hostname,
      port: parseInt(url.port || '5432'),
      database: url.pathname.slice(1), // Remove leading slash
      user: url.username,
      password: url.password,
    };
  }

  const config: {
    host: string;
    port: number;
    database: string;
    user?: string;
    password?: string;
  } = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'moneyshyft',
  };

  if (process.env.DB_USER) {
    config.user = process.env.DB_USER;
  }

  if (process.env.DB_PASSWORD) {
    config.password = process.env.DB_PASSWORD;
  }

  return config;
};

const pool = new Pool({
  ...getDatabaseConfig(),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('connect', () => {
  logger.info('Database connection established');
});

pool.on('error', (err) => {
  logger.error('Unexpected error on idle database client', err);
  process.exit(-1);
});

export default pool;
