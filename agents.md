# agents.md

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

## Release & CI/CD (latest knowledge from commit history)
- PR validation now includes tests (`chore: Enable tests on PRs`, 2026-05-27).
- A dedicated release workflow exists (`ci: Add release workflow`, 2026-05-27).
- CI handles package cleanup (`ci: Delete old packages`, `ci: Use variable delete_old_packages.yml`).
- Docker image publication/deployment is automated (`chore: Publish Docker image`, `ci: Deploy latest image`).

## Runtime & Dependency Baseline (recent updates)
- Node upgraded to v26 and later bumped to `26.2.0`.
- Nginx upgraded to `1.31.1` and hardened by disabling the server header.
- Frontend/tooling currently includes React `19.2.6`, Vite `8.0.14`, Vitest `4.1.6`, and Oxlint `1.65.0`.
- Dockerfile was fixed to ensure Yarn is installed.

## Notes for Future Agent Updates
- Keep this file aligned with recent commit history, especially CI/release/runtime changes.
- Prefer concise, factual updates and reference commit themes rather than listing every dependency bump.
