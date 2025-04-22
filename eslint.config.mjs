import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ),

    plugins: {
        "@typescript-eslint": typescriptEslint,
        prettier,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 2021, // Updated to align with ES2021
        sourceType: "module",
    },

    rules: {
        "prettier/prettier": "error",

        "@typescript-eslint/no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
        }],

        "no-console": "warn",
        eqeqeq: "error",

        // Additional project-specific rules
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/consistent-type-imports": "error",

        "no-unused-vars": "error",
        "no-implicit-globals": "error",
        "no-var": "error",
        "prefer-const": "error",
        "import/order": ["error", {
            "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
            "newlines-between": "always",
        }],
        "no-magic-numbers": ["warn", { "ignore": [0, 1], "enforceConst": true }],
    },

    files: ["*.test.ts", "*.spec.ts"],
    rules: {
        "@typescript-eslint/no-explicit-any": "off", // Allow 'any' in test files
    },
}]);