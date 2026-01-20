const fs = require('fs');
const path = require('path');
const test = require('node:test');
const assert = require('node:assert/strict');

const repoRoot = path.join(__dirname, '..');
const frontendPath = path.join(repoRoot, 'frontend');
const srcPath = path.join(repoRoot, 'src');
const workspacePath = path.join(repoRoot, 'pnpm-workspace.yaml');

test('legacy frontend/src roots are removed from repo and workspace', () => {
  assert.ok(fs.existsSync(workspacePath), 'Expected pnpm-workspace.yaml to exist');

  const workspace = fs.readFileSync(workspacePath, 'utf8');
  assert.ok(!fs.existsSync(frontendPath), 'Expected frontend/ to be removed');
  assert.ok(!fs.existsSync(srcPath), 'Expected src/ to be removed');

  assert.ok(!workspace.includes("'frontend'"), 'Expected pnpm-workspace.yaml to remove frontend');
  assert.ok(!workspace.includes("'src'"), 'Expected pnpm-workspace.yaml to remove src');
});
