const originalEnv = { ...process.env };

const loadKnexConfig = () => {
  jest.resetModules();
  return require('../knexfile');
};

describe('knexfile env wiring', () => {
  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('uses DATABASE_URL when set', () => {
    process.env.NODE_ENV = 'test';
    process.env.DATABASE_URL = 'postgres://user:pass@localhost:5432/db_test';

    const config = loadKnexConfig();
    expect(config.test.connection).toBe(process.env.DATABASE_URL);
  });

  it('falls back to DB_* when DATABASE_URL is unset', () => {
    process.env.NODE_ENV = 'test';
    process.env.DATABASE_URL = '';
    process.env.DB_HOST = 'db-host';
    process.env.DB_PORT = '5433';
    process.env.DB_NAME = 'moneyshyft_test';
    process.env.DB_USER = 'db-user';
    process.env.DB_PASSWORD = 'db-pass';

    const config = loadKnexConfig();
    expect(config.test.connection).toEqual({
      host: 'db-host',
      port: 5433,
      database: 'moneyshyft_test',
      user: 'db-user',
      password: 'db-pass',
    });
  });
});
