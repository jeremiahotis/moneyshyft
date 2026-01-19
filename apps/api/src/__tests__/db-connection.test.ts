import { checkDbConnection } from '../utils/dbConnectionCheck';

describe('db connection check', () => {
  const hasDbConfig =
    Boolean(process.env.DATABASE_URL) ||
    Boolean(process.env.DB_HOST) ||
    Boolean(process.env.DB_NAME) ||
    Boolean(process.env.DB_USER);
  const shouldRunDbTest = process.env.RUN_DB_TESTS === '1';

  (hasDbConfig && shouldRunDbTest ? it : it.skip)('verifies connectivity without mutating schema', async () => {
    await expect(checkDbConnection()).resolves.toBe(true);
  });
});
