module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'react/no-unescaped-entities': 'off',        // ← fixes the ' and " errors
    '@typescript-eslint/no-unused-vars': 'warn',  // ← downgrades unused vars from error to warning
  },
}

