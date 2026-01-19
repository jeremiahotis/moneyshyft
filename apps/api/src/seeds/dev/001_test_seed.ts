import { Knex } from 'knex';
import { randomBytes } from 'crypto';

const seedName = 'Test Household';

function generateInvitationCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = randomBytes(6);
  let code = '';

  for (let i = 0; i < 6; i++) {
    code += chars[bytes[i] % chars.length];
  }

  return code;
}

async function getUniqueInvitationCode(knex: Knex): Promise<string> {
  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    const code = generateInvitationCode();
    const existing = await knex('households')
      .where({ invitation_code: code })
      .first();

    if (!existing) {
      return code;
    }

    attempts += 1;
  }

  throw new Error('Failed to generate unique invitation code for seed data');
}

export async function seed(knex: Knex): Promise<void> {
  const existing = await knex('households')
    .where({ name: seedName })
    .first();

  if (existing) {
    return;
  }

  const invitationCode = await getUniqueInvitationCode(knex);

  await knex('households').insert({
    name: seedName,
    invitation_code: invitationCode
  });
}
