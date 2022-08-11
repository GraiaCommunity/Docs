module.exports = {
  root: true,

  env: {
    browser: true,
    es2021: true,
  },

  extends: [
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],

  parserOptions: {
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: true,
    },
  },

  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        'no-undef': 'off',
        'no-var': 'error',
        'no-useless-return': 'error',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/multi-word-component-names': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx', '*.vue'],
      parserOptions: {
        project: ['tsconfig.json'],
      },
      rules: {
        'no-undef': 'off',
        'no-var': 'error',
        'no-useless-return': 'error',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/multi-word-component-names': 'off',
      },
    },
    {
      files: ['*.vue'],
      globals: {
        defineEmits: 'readonly',
        defineProps: 'readonly',
      },
      rules: {
        '@typescript-eslint/no-unused-vars': 'off', // disable for setup script
        'vue/require-default-prop': 'off',
        'vue/multi-word-component-names': 'off',
      },
    },
    {
      files: ['docs/**'],
      rules: {},
    },
  ],
}
