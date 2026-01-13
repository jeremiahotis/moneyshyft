import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const envPath = path.resolve(process.cwd(), '.env.test');

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'test';
}

if (process.env.NODE_ENV === 'test' && process.env.DATABASE_URL === undefined) {
  process.env.DATABASE_URL = '';
}
