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

## Project Overview

- `sortjson.com` is a Vite + React application for formatting and sorting JSON.
- Package manager: Yarn (`yarn@4.14.1`).

## Local Development

- Install dependencies: `yarn install`
- Start dev server: `yarn dev`
- Format code: `yarn format`

## Validation Commands

- Lint: `yarn lint`
- Build: `yarn build`
- Tests: `yarn test --run`

## Commit Message Patterns (recent history)

- Most updates use conventional prefixes such as `chore:`, `ci:`, `fix:`, and `chore(release):`.
- Dependency automation commits commonly use `chore(deps):` and `chore(deps-dev):` with explicit version bumps and PR numbers.
- CI skip flags appear in commit subjects when appropriate (`[ci skip]` or `[skip ci]`).
- Recent commit themes include enabling PR tests, adding a release workflow, Docker image publishing/deployment, package cleanup workflows, and runtime/toolchain upgrades.

## Project Structure

- Root-level app and build config files:
  - `/tmp/workspace/ffflorian/sortjson.com/index.html`
  - `/tmp/workspace/ffflorian/sortjson.com/vite.config.ts`
  - `/tmp/workspace/ffflorian/sortjson.com/vitest.config.ts`
  - `/tmp/workspace/ffflorian/sortjson.com/tsconfig.json`
- Application source code is in `/tmp/workspace/ffflorian/sortjson.com/src`:
  - Main UI: `App.tsx`, `main.tsx`, `style.css`
  - Logic: `sortJson.ts`
  - Tests: `__tests__/` and `setupTests.ts`
- CI workflows are in `/tmp/workspace/ffflorian/sortjson.com/.github/workflows`.

## Tools Used in This Repository

- Framework/build: React + Vite + TypeScript.
- Testing: Vitest with JSDOM and Testing Library (`@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`).
- Linting/formatting: Oxlint and Prettier.
- Git hooks: Lefthook (pre-commit runs Prettier for `*.json,*.md,*.yml` and Oxlint fixes for `src/**/*.ts`).
- Release automation: Semantic Release (with changelog and git plugins).
- CI/security tooling includes GitHub Actions workflows and CodeQL action updates.
