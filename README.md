# project-templates

## Todo

Decide on eslint.config.mjs vs. .eslintrc.json.

## Harmonization Notes

Where standards disagreed, I made these typical-value choices:

| Conflict                           | Resolution                                                              | Rationale                                             |
| ---------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------- |
| **Indentation** (2 vs 4 spaces)    | Language-specific: 2 for web (JS/TS/Vue/HTML/CSS), 4 for Python/PHP/SQL | Industry convention per ecosystem                     |
| **Quote style** (single vs double) | Single for JS/TS, double for Python                                     | Most common in respective communities                 |
| **Semicolons** (yes vs no)         | Enabled by default                                                      | Explicit statement termination reduces ASI hazards    |
| **Trailing commas**                | `all` (ES5 compatible)                                                  | Cleaner diffs, consistent with Prettier defaults      |
| **SQL dialect**                    | ANSI as default, PostgreSQL commented                                   | Maximum portability; vendor-specific sections labeled |
| **Line length**                    | 100 characters                                                          | Balance between readability and modern displays       |
| **Vitest globals**                 | `false` (explicit imports)                                              | Aligns with strictest MUST standards                  |
| **PHPStan level**                  | 8 (strict) with bleeding edge                                           | Balance of strictness and practicality                |
| **Test coverage threshold**        | 80% lines/functions/statements, 75% branches                            | Industry standard minimum                             |

All configurations include security scanning (secrets detection, dependency auditing), enforce UTF-8/LF line endings, and provide CI/CD integration points. Each file is idempotent and includes comments referencing the source standards where applicable.
