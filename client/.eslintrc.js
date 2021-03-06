module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],

  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "prettier/prettier": "error",
    "quotes": "off",

    parserOptions: {
      parser: "@typescript-eslint/parser"
    },

    plugins: ["graphql", "html"]
  }
};
