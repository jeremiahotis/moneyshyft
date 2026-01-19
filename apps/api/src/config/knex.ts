import knex, { Knex } from 'knex';
import knexConfig from '../knexfile';

const environment = process.env.NODE_ENV || (process.env.JEST_WORKER_ID ? 'test' : 'development');
const config = knexConfig[environment];

const db: Knex = knex(config);

export default db;
