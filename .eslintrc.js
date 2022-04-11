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
      extends: 'vuepress',
      rules: {
        'vue/require-default-prop': 'off',
        'no-undef': 'off',
        'no-var': 'error',
        'no-useless-return': 'error',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx', '*.vue'],
      extends: 'vuepress-typescript',
      parserOptions: {
        project: ['tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'no-undef': 'off',
        'no-var': 'error',
        'no-useless-return': 'error',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      },
    },
    {
      files: ['*.vue'],
      globals: {
        defineEmits: 'readonly',
        defineProps: 'readonly',
      },
      rules: {
        // disable for setup script
        '@typescript-eslint/no-unused-vars': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/require-default-prop': 'off',
      },
    },
    {
      files: ['docs/**'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
}
