const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

function repoPath(...parts) {
  return path.join(__dirname, '..', ...parts);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

test('Story 0.2 - root tsconfig.json exists with strict baseline', () => {
  const tsconfigPath = repoPath('tsconfig.json');
  assert.ok(fs.existsSync(tsconfigPath), 'Expected root tsconfig.json to exist');

  const tsconfig = readJson(tsconfigPath);
  assert.ok(tsconfig.compilerOptions, 'Expected tsconfig.json to include compilerOptions');
  assert.equal(tsconfig.compilerOptions.strict, true, 'Expected compilerOptions.strict to be true');
});

test('Story 0.2 - root ESLint config exists and covers TS + Vue + Node baseline', () => {
  const eslintConfigPath = repoPath('eslint.config.js');
  assert.ok(fs.existsSync(eslintConfigPath), 'Expected root eslint.config.js to exist');

  const content = fs.readFileSync(eslintConfigPath, 'utf8');
  assert.match(content, /@typescript-eslint/, 'Expected ESLint config to reference @typescript-eslint for TS support');
  assert.match(content, /vue-eslint-parser|eslint-plugin-vue|plugin:vue/, 'Expected ESLint config to reference Vue support');
});

test('Story 0.2 - ESLint can load config (print-config succeeds)', () => {
  const result = spawnSync('pnpm', ['exec', 'eslint', '--print-config', 'scripts/tooling-baseline.test.js'], {
    cwd: repoPath(),
    encoding: 'utf8',
    stdio: 'pipe',
  });

  assert.equal(
    result.status,
    0,
    `Expected eslint --print-config to exit 0. stderr:\\n${result.stderr}\\nstdout:\\n${result.stdout}`,
  );
});
test('Story 0.2 - root Prettier config exists and .prettierignore exists', () => {
  const prettierCandidates = [
    repoPath('.prettierrc'),
    repoPath('.prettierrc.js'),
    repoPath('.prettierrc.cjs'),
    repoPath('.prettierrc.json'),
    repoPath('prettier.config.js'),
    repoPath('prettier.config.cjs'),
  ];

  const prettierFound = prettierCandidates.filter((p) => fs.existsSync(p));
  assert.ok(prettierFound.length > 0, `Expected a Prettier config to exist. Checked: ${prettierCandidates.join(', ')}`);

  const ignorePath = repoPath('.prettierignore');
  assert.ok(fs.existsSync(ignorePath), 'Expected .prettierignore to exist');
});
test('Story 0.2 - pnpm -r exec eslint --version works from root', () => {
  const result = spawnSync('pnpm', ['-r', 'exec', 'eslint', '--version'], {
    cwd: repoPath(),
    encoding: 'utf8',
    stdio: 'pipe',
  });

  assert.equal(result.status, 0, `Expected pnpm -r exec eslint --version to exit 0. stderr:\\n${result.stderr}`);
});

test('Story 0.2 - pnpm -r exec prettier --version works from root', () => {
  const result = spawnSync('pnpm', ['-r', 'exec', 'prettier', '--version'], {
    cwd: repoPath(),
    encoding: 'utf8',
    stdio: 'pipe',
  });

  assert.equal(result.status, 0, `Expected pnpm -r exec prettier --version to exit 0. stderr:\\n${result.stderr}`);
});

