"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    development: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL || {
            host: 'postgres',
            port: 5432,
            database: 'moneyshyft',
            user: 'jeremiahotis',
            password: 'Oiruueu12'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './src/migrations',
            extension: 'ts'
        },
        seeds: {
            directory: './src/seeds/dev',
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
            directory: './src/migrations',
            extension: 'ts'
        },
        seeds: {
            directory: './src/seeds/production',
            extension: 'ts'
        }
    }
};
exports.default = config;
//# sourceMappingURL=knexfile.js.map