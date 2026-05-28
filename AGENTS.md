# AGENTS Guide

This file explains how coding agents should work in this repository.

## General

### Approach

- Think before acting. Read existing files before writing code.
- Be concise in output but thorough in reasoning.
- Prefer editing over rewriting whole files.
- Do not re-read files you have already read.
- Test your code before declaring done.
- No sycophantic openers or closing fluff.
- Keep solutions simple and direct.
- User instructions always override this file.

### Output

- Return code first. Explanation after, only if non-obvious.
- No inline prose. Use comments sparingly - only where logic is unclear.
- No boilerplate unless explicitly requested.

### Code Rules

- Simplest working solution. No over-engineering.
- No abstractions for single-use operations.
- No speculative features or "you might also want..."
- Read the file before modifying it. Never edit blind.
- No docstrings or type annotations on code not being changed.
- No error handling for scenarios that cannot happen.
- Three similar lines is better than a premature abstraction.

### Review Rules

- State the bug. Show the fix. Stop.
- No suggestions beyond the scope of the review.
- No compliments on the code before or after the review.

### Debugging Rules

- Never speculate about a bug without reading the relevant code first.
- State what you found, where, and the fix. One pass.
- If cause is unclear: say so. Do not guess.

### Simple Formatting

- No em dashes, smart quotes, or decorative Unicode symbols.
- Plain hyphens and straight quotes only.
- Natural language characters (accented letters, CJK, etc.) are fine when the content requires them.
- Code output must be copy-paste safe.

## Tech Stack

- **React 19** with **TypeScript 6** (strict mode)
- **Vite 8** as build tool and dev server
- **JSON5** for tolerant JSON parsing before deterministic formatting
- **Vitest 4** + **Testing Library** + **JSDOM** for tests
- **Oxlint** + **Prettier** for linting and formatting
- **lefthook** for pre-commit hooks
- **Semantic Release** for automated versioning and changelogs
- **Nginx + Docker** for production static hosting

## Commands

```bash
yarn install        # install dependencies
yarn dev            # start dev server (default: http://localhost:5173)
yarn build          # production build
yarn lint           # run oxlint across the repository
yarn test           # run vitest in watch mode
yarn test --run     # run tests once (CI style)
yarn format         # format repository with Prettier
yarn release        # semantic-release (CI/release context)
```

Always use `yarn`, not `npm`, for all package management and script execution.

## Key Architecture Decisions

- **Sorting behavior**: parse input with `JSON5.parse`, recursively sort object keys via `localeCompare`, and stringify with two-space indentation plus trailing newline.
- **Array semantics**: arrays preserve original element order; only object keys are sorted.
- **UI update model**: input processing is debounced by 200ms to reduce churn while typing.
- **Error handling**: parse/sort failures are surfaced in the output pane as a visible error state.
- **Theme persistence**: theme defaults from system preference, then persists user choice in `localStorage` under `theme`.
- **Copy UX**: clipboard write is guarded by current validity and shows a temporary "Copied" badge on success.
- **Deployment runtime**: static Vite output is served by nginx on port `8080` with SPA fallback (`try_files $uri $uri/ /index.html`).

## Conventions

- **Package manager**: use `yarn` only.
- **Commits**: Conventional Commits are used (`fix:`, `chore:`, `ci:`, `chore(release):`, etc.).
- **Versioning**: automated via Semantic Release on pushes to `main`.
- **Branching**: use descriptive branch names and keep CI-focused changes scoped.
- **Code style**: keep existing formatting and avoid broad rewrites unrelated to the task.
- **TypeScript**: strict mode is enabled; avoid introducing `any` unless unavoidable.

## CI/CD

- **lint_test_publish.yml**:
  - On push/PR to `main`, runs dependency install, lint, tests, and build.
  - Validates nginx config in a containerized nginx job.
  - Lints Dockerfile with hadolint.
  - On push to `main`, runs release/image publish and conditionally deploys.
- **codeql.yml**: scheduled and push/PR security analysis.
- **git_mirror.yml**: mirrors `main` to GitLab and Codeberg.
- **delete_old_packages.yml**: scheduled cleanup of old container package versions.
- **yarn_update.yml**: scheduled workflow for yarn update automation.

## Pre-commit Hooks (lefthook)

Runs sequentially on staged files:

1. Prettier - formats `*.json`, `*.md`, `*.yml`
2. oxlint - runs autofix for `src/**/*.ts`

If hooks fail, run `yarn format` and `yarn lint`, then restage files.
