/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked"
  ],
  rules: {
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",

    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports"
      }
    ],
    "@typescript-eslint/ban-ts-comment": ["warn"],
    "@typescript-eslint/no-explicit-any": ["warn"],
    "react/display-name": ["warn"],
    "@next/next/no-html-link-for-pages": ["warn"],
    "@typescript-eslint/no-unsafe-assignment": ["warn"],
    "@typescript-eslint/no-unsafe-call": ["off"],
    "@typescript-eslint/no-unsafe-argument": ["warn"],
    "@typescript-eslint/no-unsafe-member-access": ["off"],// zustand slice immer
    "@typescript-eslint/no-unsafe-return": ["off"],
    "react/no-children-prop": ["warn"],
    "@typescript-eslint/no-inferrable-types": ["off"],
    "@typescript-eslint/no-empty-interface": ["off"],
    "prefer-const": ["warn"],
    "@typescript-eslint/prefer-nullish-coalescing": ["off"], // 有些时候，是需要 || 的
    "react/no-unescaped-entities": ["off"],
    "@typescript-eslint/require-await": ["off"],
    "@typescript-eslint/no-unnecessary-type-assertion": ["warn"],
    "@typescript-eslint/no-unused-vars": ["off"],
    "@typescript-eslint/ban-types": ["warn"],
    "@typescript-eslint/no-empty-function": ["warn"],
    "@typescript-eslint/no-misused-promises": ["off"],
    // ref:
    // 1. https://stackoverflow.com/a/58271234/9422455
    // 2. https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-namespace.md
    "@typescript-eslint/no-namespace": "off"
  }
};

module.exports = config;
