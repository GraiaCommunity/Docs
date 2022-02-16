module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "vuepress",
    "prettier",
  ],
  rules: {
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "max-len": [
      "warn",
      {
        code: 120,
        tabWidth: 2,
        comments: 120,
        ignoreComments: false,
        ignoreTrailingComments: false,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: false,
        ignoreRegExpLiterals: true,
      },
    ],
    "vue/max-len": [
      "error",
      {
        code: 120,
        template: 120,
        tabWidth: 2,
        comments: 120,
        ignoreComments: false,
        ignoreTrailingComments: false,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: false,
        ignoreRegExpLiterals: true,
        ignoreHTMLAttributeValues: true,
        ignoreHTMLTextContents: true,
      },
    ],
  },
  overrides: [
    {
      files: ["*.vue"],
      globals: {
        defineEmits: "readonly",
        defineProps: "readonly",
      },
      rules: {
        // disable for setup script
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
    {
      files: ["docs/**"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
}
