import { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const getConnectionConfig = (fallbackDbName: string) => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
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
    database: process.env.DB_NAME || fallbackDbName
  };

  if (process.env.DB_USER) {
    config.user = process.env.DB_USER;
  }

  if (process.env.DB_PASSWORD) {
    config.password = process.env.DB_PASSWORD;
  }

  return config;
};

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: getConnectionConfig('moneyshyft'),
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
      extension: 'ts'
    },
    seeds: {
      directory: './seeds/dev',
      extension: 'ts'
    }
  },

  test: {
    client: 'postgresql',
    connection: getConnectionConfig('moneyshyft_test'),
    pool: {
      min: 0,
      max: 2
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
      extension: 'ts'
    },
    seeds: {
      directory: './seeds/dev',
      extension: 'ts'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 20
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
      extension: 'js'  // Use compiled JavaScript files in production
    },
    seeds: {
      directory: './seeds/production',
      extension: 'js'  // Use compiled JavaScript files in production
    }
  }
};

// Use CommonJS export for Knex compatibility
// TypeScript will compile this to module.exports
export = config;
