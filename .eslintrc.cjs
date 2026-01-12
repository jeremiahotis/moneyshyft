module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/.turbo/**',
    '**/.vite/**',
    '**/coverage/**',
    'frontend/dist/**',
    'src/dist/**',
  ],
  extends: ['eslint:recommended'],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      },
    },
    {
      files: ['**/*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
      },
      plugins: ['vue', '@typescript-eslint'],
      extends: ['plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended'],
      rules: {
        // Vue SFCs commonly use unused vars in templates/components; keep warn-level to reduce noise in early migration.
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      },
    },
    {
      files: ['**/*.cjs'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
};

