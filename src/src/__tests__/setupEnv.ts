import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const envPath = path.resolve(process.cwd(), '.env.test');

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'test';
}
