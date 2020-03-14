module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended"
  ],
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ["*.tsx"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": ["off"]
      }
    }
  ]
};
