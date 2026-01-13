import knex from 'knex';
import knexConfig from '../knexfile';

const environment = process.env.NODE_ENV || (process.env.JEST_WORKER_ID ? 'test' : 'development');
const config = knexConfig[environment];

export const checkDbConnection = async () => {
  const db = knex(config);

  try {
    const result = await db.raw('select 1 as ok');
    return result?.rows?.[0]?.ok === 1;
  } finally {
    await db.destroy();
  }
};
