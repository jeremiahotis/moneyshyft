// Root ESLint flat config (ESLint v9+)
// Story 0.2: Configure Tooling Baseline

const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const vuePlugin = require('eslint-plugin-vue');
const vueParser = require('vue-eslint-parser');

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  // Ignore build and dependency outputs
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.turbo/**',
      '**/.vite/**',
      'frontend/dist/**',
      'src/dist/**',
    ],
  },

  // Base JS settings
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'script',
    },
  },

  // TypeScript (recommended baseline)
  ...tsPlugin.configs['flat/recommended'].map((cfg) => ({
    ...cfg,
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ...(cfg.languageOptions || {}),
      parser: tsParser,
      parserOptions: {
        ...(cfg.languageOptions?.parserOptions || {}),
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      ...(cfg.plugins || {}),
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...(cfg.rules || {}),
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  })),

  // Vue SFCs (Vue 3 recommended + TS rules for <script> blocks)
  ...vuePlugin.configs['flat/recommended'].map((cfg) => ({
    ...cfg,
    files: ['**/*.vue'],
    languageOptions: {
      ...(cfg.languageOptions || {}),
      parser: vueParser,
      parserOptions: {
        ...(cfg.languageOptions?.parserOptions || {}),
        parser: tsParser,
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      ...(cfg.plugins || {}),
      vue: vuePlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...(cfg.rules || {}),
      // Keep warn-level to reduce noise during incremental migration
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  })),
];

