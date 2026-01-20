const fs = require('fs');
const path = require('path');
const test = require('node:test');
const assert = require('node:assert/strict');

const repoRoot = path.join(__dirname, '..');
const ignoredFiles = new Set([
  path.join(repoRoot, 'scripts', 'no-legacy-paths-docs.test.js'),
  path.join(repoRoot, 'scripts', 'legacy-paths.test.js'),
]);
const scanRoots = [
  path.join(repoRoot, 'docs'),
  path.join(repoRoot, 'scripts'),
  path.join(repoRoot, 'AGENTS.md'),
  path.join(repoRoot, 'eslint.config.js'),
  path.join(repoRoot, 'package.json'),
  path.join(repoRoot, 'pnpm-workspace.yaml'),
  path.join(repoRoot, 'CLAUDE.md'),
  path.join(repoRoot, 'SETUP.md'),
  path.join(repoRoot, 'PRODUCTION_DEPLOYMENT_GUIDE.md'),
  path.join(repoRoot, 'DEPLOYMENT_CHECKLIST.md'),
];

const isTextFile = (filePath) =>
  /\.(md|json|js|yml|yaml|toml)$/.test(filePath) ||
  ['AGENTS.md', 'eslint.config.js', 'package.json', 'pnpm-workspace.yaml', 'CLAUDE.md', 'SETUP.md', 'PRODUCTION_DEPLOYMENT_GUIDE.md', 'DEPLOYMENT_CHECKLIST.md'].includes(
    path.basename(filePath),
  );

const listFiles = (targetPath) => {
  if (!fs.existsSync(targetPath)) {
    return [];
  }

  const stats = fs.statSync(targetPath);
  if (stats.isFile()) {
    return [targetPath];
  }

  const entries = fs.readdirSync(targetPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(targetPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
};

const findLegacyReferences = (contents) => {
  const issues = [];

  if (contents.includes('frontend/')) {
    issues.push('frontend/');
  }

  let idx = contents.indexOf('src/');
  while (idx !== -1) {
    const before = contents.slice(0, idx);
    const lineStart = contents.lastIndexOf('\n', idx) + 1;
    const linePrefix = contents.slice(lineStart, idx);
    const isTreeLine = linePrefix.endsWith('└── ') || linePrefix.endsWith('├── ');
    const allowed =
      before.endsWith('apps/app/') ||
      before.endsWith('apps/api/') ||
      before.endsWith('packages/shared/') ||
      isTreeLine;

    if (!allowed) {
      issues.push('src/');
      break;
    }
    idx = contents.indexOf('src/', idx + 4);
  }

  return issues;
};

test('docs and scripts do not reference legacy frontend/src roots', () => {
  const files = scanRoots.flatMap(listFiles).filter(isTextFile);
  const violations = [];

  for (const filePath of files) {
    if (ignoredFiles.has(filePath)) {
      continue;
    }

    const contents = fs.readFileSync(filePath, 'utf8');
    const issues = findLegacyReferences(contents);
    if (issues.length > 0) {
      violations.push(`${path.relative(repoRoot, filePath)}: ${issues.join(', ')}`);
    }
  }

  assert.strictEqual(
    violations.length,
    0,
    `Legacy path references found:\n${violations.map((entry) => `- ${entry}`).join('\n')}`,
  );
});
