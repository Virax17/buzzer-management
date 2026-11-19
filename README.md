# Buzzer Intelligence: Company Overview Dashboard

A starter workspace for two screens of Buzzer Intelligence: the Overview page and the Revenue
Engines Overview page. It runs on static sample data; no backend, no keys. When the parts are
done, they are copied into the main app as they are.

**Read [TASK.md](TASK.md) first.** It has who builds what, the layouts and the rules.

## Repo

Each of you creates **your own private** GitHub repo and pushes this project to it. Add Rohit
(`R1N1X`) and Zeir Mašić (`Z4ir`) as collaborators. Do not make it public: the code is Buzzer's.

## Setup

```
nvm use          # Node 24 (.nvmrc)
npm ci
npm start        # http://localhost:4200/overview and /revenue-engines
```

## Checks (all must pass with zero warnings before a PR)

```
npm run lint     # ESLint + Stylelint + Prettier
npm run test:ci  # Vitest
npm run build
```

## How we work

- Never push to `main`. Work on a branch (`feat/<short-name>`) and open a PR to `main` in your
  repo. CI must be green.
- Commit messages follow Conventional Commits (`feat(overview): ...`, `fix: ...`). The commit hook
  checks them.
- Only your folder(s) from TASK.md hold your work, plus new tokens in `src/styles/_tokens.scss`
  (list them in your PR). Do not change the configs; ask first if one is in the way.
- No new npm dependencies.
- Questions in the team thread, with a screenshot or the exact error.
