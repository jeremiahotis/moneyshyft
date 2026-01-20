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

const shouldSkipBuilds = process.env.SKIP_BUILD_TESTS === '1';

test('Story 0.3 - packages/shared scaffold exists', () => {
  const pkgDir = repoPath('packages', 'shared');
  assert.ok(fs.existsSync(pkgDir), 'Expected packages/shared directory to exist');

  const pkgJsonPath = path.join(pkgDir, 'package.json');
  assert.ok(fs.existsSync(pkgJsonPath), 'Expected packages/shared/package.json to exist');

  const pkgJson = readJson(pkgJsonPath);
  assert.equal(pkgJson.name, '@moneyshyft/shared', 'Expected shared package name to be @moneyshyft/shared');
  assert.equal(
    pkgJson.types,
    './dist/index.d.ts',
    'Expected shared package types to point at dist/index.d.ts',
  );
  assert.equal(
    pkgJson.exports?.['.']?.types,
    './dist/index.d.ts',
    'Expected shared package exports to map types to dist/index.d.ts',
  );

  const tsconfigPath = path.join(pkgDir, 'tsconfig.json');
  assert.ok(fs.existsSync(tsconfigPath), 'Expected packages/shared/tsconfig.json to exist');

  const tsconfig = readJson(tsconfigPath);
  assert.equal(
    tsconfig.extends,
    '../../tsconfig.json',
    'Expected packages/shared/tsconfig.json to extend ../../tsconfig.json',
  );

  const srcIndexPath = path.join(pkgDir, 'src', 'index.ts');
  assert.ok(fs.existsSync(srcIndexPath), 'Expected packages/shared/src/index.ts to exist');
});

test('Story 0.3 - shared package emits declarations', () => {
  const tsconfigPath = repoPath('packages', 'shared', 'tsconfig.json');
  const tsconfig = readJson(tsconfigPath);
  const compilerOptions = tsconfig.compilerOptions ?? {};

  assert.equal(
    compilerOptions.declaration,
    true,
    'Expected shared tsconfig to enable declaration output',
  );
  assert.equal(
    compilerOptions.emitDeclarationOnly,
    true,
    'Expected shared tsconfig to emit declarations only',
  );
  assert.equal(
    compilerOptions.outDir,
    './dist',
    'Expected shared tsconfig to output declarations to ./dist',
  );
  assert.equal(
    compilerOptions.rootDir,
    './src',
    'Expected shared tsconfig to use ./src as rootDir',
  );
});

test('Story 0.3 - shared package exports User type from @moneyshyft/shared', () => {
  const userTypePath = repoPath('packages', 'shared', 'src', 'types', 'user.ts');
  assert.ok(fs.existsSync(userTypePath), 'Expected packages/shared/src/types/user.ts to exist');

  const userTypeContent = fs.readFileSync(userTypePath, 'utf8');
  assert.match(userTypeContent, /export\s+type\s+User\s*=/, 'Expected user.ts to export type User');

  const indexPath = repoPath('packages', 'shared', 'src', 'index.ts');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  assert.match(
    indexContent,
    /export\s+\*\s+from\s+['"]\.\/types['"]/,
    'Expected packages/shared/src/index.ts to re-export from ./types',
  );
});
test('Story 0.3 - apps wire @moneyshyft/shared workspace dependency and include smoke imports', () => {
  const appPkgPath = repoPath('apps', 'app', 'package.json');
  assert.ok(fs.existsSync(appPkgPath), 'Expected apps/app/package.json to exist');
  const appPkg = readJson(appPkgPath);
  assert.equal(
    appPkg.dependencies?.['@moneyshyft/shared'],
    'workspace:*',
    'Expected apps/app/package.json to depend on @moneyshyft/shared via workspace:*',
  );

  const apiPkgPath = repoPath('apps', 'api', 'package.json');
  assert.ok(fs.existsSync(apiPkgPath), 'Expected apps/api/package.json to exist');
  const apiPkg = readJson(apiPkgPath);
  assert.equal(
    apiPkg.dependencies?.['@moneyshyft/shared'],
    'workspace:*',
    'Expected apps/api/package.json to depend on @moneyshyft/shared via workspace:*',
  );

  const appSmokePath = repoPath('apps', 'app', 'src', 'types', 'shared-types.smoke.ts');
  assert.ok(fs.existsSync(appSmokePath), 'Expected apps/app/src/types/shared-types.smoke.ts to exist');
  const appSmoke = fs.readFileSync(appSmokePath, 'utf8');
  assert.match(
    appSmoke,
    /import\s+type\s+\{\s*User\s*\}\s+from\s+['"]@moneyshyft\/shared['"]/,
    'Expected apps/app smoke file to import type User from @moneyshyft/shared',
  );

  const apiSmokePath = repoPath('apps', 'api', 'src', 'types', 'shared-types.smoke.ts');
  assert.ok(fs.existsSync(apiSmokePath), 'Expected apps/api/src/types/shared-types.smoke.ts to exist');
  const apiSmoke = fs.readFileSync(apiSmokePath, 'utf8');
  assert.match(
    apiSmoke,
    /import\s+type\s+\{\s*User\s*\}\s+from\s+['"]@moneyshyft\/shared['"]/,
    'Expected apps/api smoke file to import type User from @moneyshyft/shared',
  );
});

if (shouldSkipBuilds) {
  test.skip('Story 0.3 - pnpm -C packages/shared build succeeds', () => {});
  test.skip('Story 0.3 - pnpm -C apps/api build succeeds with shared import', () => {});
  test.skip('Story 0.3 - pnpm -C apps/app build succeeds with shared import', () => {});
} else {
  test(
    'Story 0.3 - pnpm -C packages/shared build succeeds',
    { timeout: 120000 },
    () => {
      const result = spawnSync('pnpm', ['-C', 'packages/shared', 'build'], {
        cwd: repoPath(),
        encoding: 'utf8',
        stdio: 'pipe',
      });

      assert.equal(
        result.status,
        0,
        `Expected pnpm -C packages/shared build to exit 0. stderr:\n${result.stderr}`,
      );

      const distIndexPath = repoPath('packages', 'shared', 'dist', 'index.d.ts');
      assert.ok(fs.existsSync(distIndexPath), 'Expected shared build to emit dist/index.d.ts');
    },
  );

  test(
    'Story 0.3 - pnpm -C apps/api build succeeds with shared import',
    { timeout: 120000 },
    () => {
      const sharedBuild = spawnSync('pnpm', ['-C', 'packages/shared', 'build'], {
        cwd: repoPath(),
        encoding: 'utf8',
        stdio: 'pipe',
      });
      assert.equal(
        sharedBuild.status,
        0,
        `Expected pnpm -C packages/shared build to exit 0. stderr:\n${sharedBuild.stderr}`,
      );

      const result = spawnSync('pnpm', ['-C', 'apps/api', 'build'], {
        cwd: repoPath(),
        encoding: 'utf8',
        stdio: 'pipe',
      });

      assert.equal(result.status, 0, `Expected pnpm -C apps/api build to exit 0. stderr:\n${result.stderr}`);
    },
  );

  test(
    'Story 0.3 - pnpm -C apps/app build succeeds with shared import',
    { timeout: 120000 },
    () => {
      const sharedBuild = spawnSync('pnpm', ['-C', 'packages/shared', 'build'], {
        cwd: repoPath(),
        encoding: 'utf8',
        stdio: 'pipe',
      });
      assert.equal(
        sharedBuild.status,
        0,
        `Expected pnpm -C packages/shared build to exit 0. stderr:\n${sharedBuild.stderr}`,
      );

      const result = spawnSync('pnpm', ['-C', 'apps/app', 'build'], {
        cwd: repoPath(),
        encoding: 'utf8',
        stdio: 'pipe',
      });

      assert.equal(result.status, 0, `Expected pnpm -C apps/app build to exit 0. stderr:\n${result.stderr}`);
    },
  );
}
