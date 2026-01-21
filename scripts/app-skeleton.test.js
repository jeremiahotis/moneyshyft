const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.join(__dirname, '..');
const appRoot = path.join(repoRoot, 'apps', 'app');

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const hasScript = (scripts, name) => Object.prototype.hasOwnProperty.call(scripts, name);

test('Story 0.7 - apps/app scaffold exists with required scripts and files', () => {
  const pkgPath = path.join(appRoot, 'package.json');
  assert.ok(fs.existsSync(pkgPath), 'Expected apps/app/package.json to exist');

  const pkg = readJson(pkgPath);
  assert.ok(pkg.scripts, 'Expected apps/app/package.json scripts to exist');
  assert.ok(hasScript(pkg.scripts, 'dev'), 'Expected dev script in apps/app/package.json');
  assert.ok(hasScript(pkg.scripts, 'build'), 'Expected build script in apps/app/package.json');
  assert.ok(hasScript(pkg.scripts, 'preview'), 'Expected preview script in apps/app/package.json');

  const mainPath = path.join(appRoot, 'src', 'main.ts');
  const appVuePath = path.join(appRoot, 'src', 'App.vue');
  assert.ok(fs.existsSync(mainPath), 'Expected apps/app/src/main.ts to exist');
  assert.ok(fs.existsSync(appVuePath), 'Expected apps/app/src/App.vue to exist');
});

test('Story 0.7 - apps/app tooling setup matches repo standards', () => {
  const eslintConfigPath = path.join(appRoot, 'eslint.config.cjs');
  assert.ok(fs.existsSync(eslintConfigPath), 'Expected apps/app/eslint.config.cjs to exist');

  const tailwindPath = path.join(appRoot, 'tailwind.config.js');
  const postcssPath = path.join(appRoot, 'postcss.config.js');
  assert.ok(fs.existsSync(tailwindPath), 'Expected apps/app/tailwind.config.js to exist');
  assert.ok(fs.existsSync(postcssPath), 'Expected apps/app/postcss.config.js to exist');

  const tsconfigPath = path.join(appRoot, 'tsconfig.json');
  assert.ok(fs.existsSync(tsconfigPath), 'Expected apps/app/tsconfig.json to exist');
  const tsconfigContents = fs.readFileSync(tsconfigPath, 'utf8');
  assert.ok(/"strict"\s*:\s*true/.test(tsconfigContents), 'Expected apps/app tsconfig strict=true');
});
