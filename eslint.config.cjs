// eslint.config.cjs
const globals = require("globals");
const typescriptParser = require("@typescript-eslint/parser");
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const prettierPlugin = require("eslint-plugin-prettier");

// Get typescript-eslint recommended config
const typescriptConfig = typescriptPlugin.configs.recommended;

// Create the prettier config
const prettierRules = {
  rules: {
    "prettier/prettier": "error",
    ...prettierPlugin.configs.recommended.rules,
  },
};
module.exports = [
  {
    ignores: ["dist/*", "node_modules/*"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...typescriptConfig.rules,
      ...prettierRules.rules,
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/quotes": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-use-before-define": "off",

      "array-callback-return": "error",
      "no-constructor-return": "error",
      "no-duplicate-imports": "off",
      "no-new-native-nonconstructor": "error",
      "no-self-compare": "error",
      "no-template-curly-in-string": "error",
      "no-unused-private-class-members": "error",
      "class-methods-use-this": "off",
      "consistent-return": "off",
      "no-unused-vars": "off",
      "default-case": "error",
      "dot-notation": "error",
      eqeqeq: "error",
      "init-declarations": "error",
      "no-eq-null": "error",
      "no-extend-native": "error",
      "no-implicit-coercion": "error",
      "no-new-object": "error",
      "no-var": "error",
      "prefer-object-spread": "error",
      "require-await": "off",
      yoda: "error",
      "sort-keys": "off",
      "no-undef-init": "off",

      "prettier/prettier": "error",
    },
  },
  {
    files: ["**/*.config.js", "**/*.config.cjs"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.commonjs,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierRules.rules,
      "array-callback-return": "error",
      "no-constructor-return": "error",
      "no-duplicate-imports": "off",
      "no-new-native-nonconstructor": "error",
      "no-self-compare": "error",
      "no-template-curly-in-string": "error",
      "no-unused-private-class-members": "error",
      "class-methods-use-this": "off",
      "consistent-return": "off",
      "no-unused-vars": "warn",
      "default-case": "error",
      "dot-notation": "error",
      eqeqeq: "error",
      "init-declarations": "error",
      "no-eq-null": "error",
      "no-extend-native": "error",
      "no-implicit-coercion": "error",
      "no-new-object": "error",
      "no-var": "error",
      "prefer-object-spread": "error",
      "require-await": "off",
      yoda: "error",
      "sort-keys": "off",
      "no-undef-init": "off",

      "prettier/prettier": "error",
    },
  },
];
