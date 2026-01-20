const fs = require('fs');
const path = require('path');
const test = require('node:test');
const assert = require('node:assert/strict');

test('baseline CI workflow includes required quality gate steps', () => {
  const workflowPath = path.join(__dirname, '..', '.github', 'workflows', 'ci.yml');
  assert.ok(fs.existsSync(workflowPath), 'Expected .github/workflows/ci.yml to exist');

  const workflow = fs.readFileSync(workflowPath, 'utf8');
  const requiredSnippets = [
    'pull_request:',
    'push:',
    'branches:',
    '- main',
    'node-version: 20',
    'cache: pnpm',
    'pnpm install --frozen-lockfile',
    'pnpm lint',
    'pnpm typecheck',
    'pnpm build',
    'pnpm test',
    'pnpm -C apps/api test',
  ];

  const missing = requiredSnippets.filter((snippet) => !workflow.includes(snippet));
  assert.strictEqual(
    missing.length,
    0,
    `CI workflow missing required entries:\n${missing.map((entry) => `- ${entry}`).join('\n')}`
  );
});
