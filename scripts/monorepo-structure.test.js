const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

function readUtf8(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function repoPath(...parts) {
  return path.join(__dirname, '..', ...parts);
}

test('Story 0.1 - root package.json has pnpm workspace configuration', () => {
  const pkgPath = repoPath('package.json');
  assert.ok(fs.existsSync(pkgPath), 'Expected root package.json to exist');

  const pkg = JSON.parse(readUtf8(pkgPath));

  assert.equal(pkg.private, true, 'Expected package.json to set private=true for workspace root');
  assert.ok(
    typeof pkg.packageManager === 'string' && pkg.packageManager.startsWith('pnpm@'),
    'Expected package.json to set packageManager to pnpm@<version>'
  );

  // Optional but explicit: workspace globs in package.json (in addition to pnpm-workspace.yaml)
  assert.ok(Array.isArray(pkg.workspaces), 'Expected package.json to define workspaces[]');
  assert.ok(pkg.workspaces.includes('apps/*'), 'Expected workspaces[] to include apps/*');
  assert.ok(pkg.workspaces.includes('packages/*'), 'Expected workspaces[] to include packages/*');
});

test('Story 0.1 - pnpm-workspace.yaml exists and includes workspace package globs', () => {
  const wsPath = repoPath('pnpm-workspace.yaml');
  assert.ok(fs.existsSync(wsPath), 'Expected pnpm-workspace.yaml to exist');

  const ws = readUtf8(wsPath);
  assert.match(ws, /packages:/, 'Expected pnpm-workspace.yaml to contain packages:');
  assert.match(ws, /['"]apps\/\*['"]/, 'Expected pnpm-workspace.yaml to include apps/*');
  assert.match(ws, /['"]packages\/\*['"]/, 'Expected pnpm-workspace.yaml to include packages/*');
});

test('Story 0.1 - pnpm recognizes workspace structure (pnpm -r list works)', () => {
  const result = spawnSync('pnpm', ['-r', 'list'], {
    cwd: repoPath(),
    encoding: 'utf8',
    stdio: 'pipe',
  });

  assert.equal(result.status, 0, `Expected pnpm -r list to exit 0. stderr:\\n${result.stderr}`);
});

test('Story 0.1 - monorepo directory structure exists (apps/, packages/, placeholders)', () => {
  const requiredDirs = [
    repoPath('apps'),
    repoPath('packages'),
    repoPath('apps', 'crisis'),
    repoPath('apps', 'app'),
    repoPath('apps', 'api'),
    repoPath('packages', 'shared'),
  ];

  for (const dir of requiredDirs) {
    assert.ok(fs.existsSync(dir), `Expected directory to exist: ${dir}`);
    assert.ok(fs.statSync(dir).isDirectory(), `Expected path to be a directory: ${dir}`);
  }
});

test('Story 0.1 - placeholder dirs are tracked (dirs exist after clone)', () => {
  const placeholderDirs = [
    repoPath('apps'),
    repoPath('apps', 'crisis'),
    repoPath('apps', 'app'),
    repoPath('apps', 'api'),
    repoPath('packages'),
    repoPath('packages', 'shared'),
  ];

  for (const dirPath of placeholderDirs) {
    const keepPath = path.join(dirPath, '.gitkeep');
    if (fs.existsSync(keepPath)) {
      assert.ok(fs.statSync(keepPath).isFile(), `Expected .gitkeep path to be a file: ${keepPath}`);
      continue;
    }

    // Once a placeholder dir gains real tracked files in later stories, .gitkeep may be removed.
    const entries = fs.readdirSync(dirPath);
    assert.ok(entries.length > 0, `Expected ${dirPath} to contain files (or a .gitkeep) so it exists after clone`);
  }
});

test('Story 0.1 - root package.json has script placeholders (dev/build/test/lint)', () => {
  const pkgPath = repoPath('package.json');
  const pkg = JSON.parse(readUtf8(pkgPath));

  assert.ok(pkg.scripts && typeof pkg.scripts === 'object', 'Expected package.json to include scripts');
  for (const key of ['dev', 'build', 'test', 'lint']) {
    assert.ok(typeof pkg.scripts[key] === 'string' && pkg.scripts[key].length > 0, `Expected scripts.${key} to be a non-empty string`);
  }
});

