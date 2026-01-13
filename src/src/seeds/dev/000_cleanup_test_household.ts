import { Knex } from 'knex';

const seedName = 'Test Household';

export async function seed(knex: Knex): Promise<void> {
  await knex('households')
    .where({ name: seedName })
    .del();
}
