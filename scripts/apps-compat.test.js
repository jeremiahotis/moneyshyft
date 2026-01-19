const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

function repoPath(...parts) {
  return path.join(__dirname, '..', ...parts);
}

test('Story 0.6a - apps/app exists with package.json', () => {
  const appPkg = repoPath('apps', 'app', 'package.json');
  assert.ok(fs.existsSync(appPkg), 'Expected apps/app/package.json to exist');
});

test('Story 0.6a - frontend wrapper remains present', () => {
  const frontendPkg = repoPath('frontend', 'package.json');
  assert.ok(fs.existsSync(frontendPkg), 'Expected frontend/package.json to exist (compat wrapper)');
});

test('Story 0.6a - apps/api exists with package.json', () => {
  const apiPkg = repoPath('apps', 'api', 'package.json');
  assert.ok(fs.existsSync(apiPkg), 'Expected apps/api/package.json to exist');
});

test('Story 0.6a - src wrapper remains present', () => {
  const srcPkg = repoPath('src', 'package.json');
  assert.ok(fs.existsSync(srcPkg), 'Expected src/package.json to exist (compat wrapper)');
});
