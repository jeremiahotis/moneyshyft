const fs = require('fs');
const path = require('path');
const test = require('node:test');
const assert = require('node:assert/strict');

const repoRoot = path.join(__dirname, '..');
const appRoot = path.join(repoRoot, 'apps', 'app');
const apiRoot = path.join(repoRoot, 'apps', 'api');
const sharedRoot = path.join(repoRoot, 'packages', 'shared');

const shouldSkipDir = (dirName) =>
  [
    '.git',
    'node_modules',
    'dist',
    'build',
    '.pnpm',
    '.turbo',
    '.vite',
    '.cache',
    'coverage',
  ].includes(dirName);

const isWithin = (parent, child) => {
  const rel = path.relative(parent, child);
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
};

const listFiles = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (shouldSkipDir(entry.name)) {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(fullPath));
    } else if (entry.isFile()) {
      if (/\.(ts|tsx|js|jsx|vue|mjs|cjs)$/.test(entry.name)) {
        files.push(fullPath);
      }
    }
  }

  return files;
};

const extractImports = (contents) => {
  const imports = [];
  const importRegex = /import\s+(?:[^'"]*?\s+from\s+)?['"]([^'"]+)['"]/g;
  const dynamicImportRegex = /import\(\s*['"]([^'"]+)['"]\s*\)/g;
  const requireRegex = /require\(\s*['"]([^'"]+)['"]\s*\)/g;
  const exportRegex = /export\s+(?:\*|\{[^}]*\})\s+from\s+['"]([^'"]+)['"]/g;

  for (const regex of [importRegex, dynamicImportRegex, requireRegex, exportRegex]) {
    let match;
    while ((match = regex.exec(contents)) !== null) {
      imports.push(match[1]);
    }
  }

  return imports;
};

const checkWorkspaceBoundaries = (workspaceName, workspaceRoot) => {
  if (!fs.existsSync(workspaceRoot)) {
    return [];
  }

  const files = listFiles(workspaceRoot);
  const violations = [];

  for (const filePath of files) {
    const contents = fs.readFileSync(filePath, 'utf8');
    const imports = extractImports(contents);
    const fileDir = path.dirname(filePath);

    for (const importPath of imports) {
      if (importPath.startsWith('@moneyshyft/shared/')) {
        violations.push({
          filePath,
          importPath,
          reason: 'Deep import from @moneyshyft/shared is not allowed',
        });
        continue;
      }

      if (!importPath.startsWith('.')) {
        continue;
      }

      const resolvedPath = path.resolve(fileDir, importPath);

      if (isWithin(sharedRoot, resolvedPath)) {
        violations.push({
          filePath,
          importPath,
          reason: 'Relative import into packages/shared is not allowed',
        });
      }

      if (workspaceName === 'app' && isWithin(apiRoot, resolvedPath)) {
        violations.push({
          filePath,
          importPath,
          reason: 'apps/app must not import from apps/api via relative paths',
        });
      }

      if (workspaceName === 'api' && isWithin(appRoot, resolvedPath)) {
        violations.push({
          filePath,
          importPath,
          reason: 'apps/api must not import from apps/app via relative paths',
        });
      }
    }
  }

  return violations;
};

test('workspace boundary rules are enforced', () => {
  const violations = [
    ...checkWorkspaceBoundaries('app', appRoot),
    ...checkWorkspaceBoundaries('api', apiRoot),
  ];

  assert.strictEqual(
    violations.length,
    0,
    `Workspace boundary violations detected:\n${violations
      .map(
        (violation) =>
          `- ${path.relative(repoRoot, violation.filePath)} imports ${violation.importPath} (${violation.reason})`
      )
      .join('\n')}`
  );
});
