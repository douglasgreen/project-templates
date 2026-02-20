// version: 1.0.0
// modified: 2026-02-20

// eslint.config.mjs
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import pluginPlaywright from "eslint-plugin-playwright";
import pluginSecurity from "eslint-plugin-security";
import pluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";

export default defineConfig([
  // Base JavaScript
  js.configs.recommended,

  // TypeScript strict
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,

  // Vue 3
  ...pluginVue.configs["flat/recommended"],

  // Security baseline
  {
    plugins: { security: pluginSecurity },
    rules: {
      "security/detect-object-injection": "error",
      "security/detect-non-literal-regexp": "error",
      "security/detect-unsafe-regex": "error",
      "security/detect-no-csrf-before-method-override": "error",
      "security/detect-eval-with-expression": "error",
      "security/detect-pseudoRandomBytes": "error",
    }
  },

  // Code quality
  {
    plugins: { unicorn: pluginUnicorn },
    rules: {
      "unicorn/consistent-function-scoping": "warn",
      "unicorn/no-abusive-eslint-disable": "error",
      "unicorn/no-array-reduce": "off",
    }
  },

  // Global settings
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2023,
      }
    }
  },

  // File-specific overrides
  {
    files: ["tests/**/*.ts", "tests/**/*.js", "**/*.spec.ts", "**/*.test.ts"],
    ...pluginPlaywright.configs["flat/recommended"],
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "playwright/no-wait-for-timeout": "error",
      "playwright/prefer-web-first-assertions": "error",
      "playwright/expect-expect": "error",
    }
  },

  // Vue-specific rules
  {
    files: ["**/*.vue"],
    rules: {
      "vue/no-v-html": "error",
      "vue/require-explicit-emits": "error",
      "vue/custom-event-name-casing": ["error", "kebab-case"],
      "vue/attributes-order": "warn",
    }
  },

  // Accessibility for Vue/React
  {
    files: ["**/*.{vue,jsx,tsx}"],
    plugins: { "jsx-a11y": (await import("eslint-plugin-jsx-a11y")).default },
    rules: {
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/click-events-have-key-events": "error",
      "jsx-a11y/label-has-associated-control": "error",
      "jsx-a11y/no-static-element-interactions": "error",
      "jsx-a11y/tabindex-no-positive": "error",
    }
  },

  // TypeScript strictness
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "no-console": "warn",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
    }
  },

  // Ignores
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "coverage/**",
      "*.config.*",
      "playwright-report/**",
      "test-results/**",
    ]
  }
]);
