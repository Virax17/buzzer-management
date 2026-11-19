# Task: Company Overview Dashboard, layouts (Buzzer Intelligence)

Deadline: **Tuesday 24 Nov.** Each of you builds one part, in your own private repo, starting
from this project. We copy the finished parts into Buzzer Intelligence, so stay inside your
folders and follow the rules below.

## 1. What it is

Buzzer Intelligence is our internal app. These two screens give management one view of the
company: revenue against targets, how each department is doing, the org chart, goals, and the
revenue engines (the products that bring money in).

The layouts are in `public/layouts/`:

- `overview.png`: the Overview page
- `revenue-engines.png`: the Revenue Engines Overview page

There is no Figma: match the images as closely as you can, using the design tokens in
`src/styles/_tokens.scss`. Use static sample data (numbers and names like in the images); no
backend.

## 2. Who builds what

| Person        | Part                                                                                                                                                                                                                                                                                                                           | Your folder                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| Prayas Silwal | Overview, top half: Revenue vs Expenses this month (bar + line chart and the Earned / Expenses / Result box), R&E Months, Departments Health, Salaries & Utilisation (ring + figures)                                                                                                                                          | `src/app/features/company-overview/overview-top/`                                     |
| Vinay Patil   | Overview, bottom half: Organigram preview, Q4 Progress (goals list), Revenue Engines (list with progress), Issues & Happenings (table with the All / Issues / Risks / Missed / Updates tabs)                                                                                                                                   | `src/app/features/company-overview/overview-bottom/`                                  |
| Vishwam Shah  | The top bar (logo, Overview / Organigram / Departments / Revenue Engines tabs, date range, icons, avatar) and the whole Revenue Engines Overview page: KPI row, Revenue Progress per Day (chart + On Track card), Call Center and Outbound funnels, Revenue per Channel (donut), Revenue per Engine (table), Recent Happenings | `src/app/shared/ui/top-bar/` and `src/app/features/company-overview/revenue-engines/` |

`src/app/features/company-overview/overview.ts` already puts the two Overview halves on one
page: do not change it.

## 3. Rules (so the code drops into our app)

- Angular 22, standalone components (do not write `standalone: true`), zoneless, OnPush default.
- Signals: `signal`, `computed`, `input()`, `output()`; `inject()` only; `@if` / `@for` with
  `track`; no `CommonModule`, no `ngClass`.
- File names without `.component` (`revenue-chart.ts`, `revenue-chart.html`, ...); class names
  without `Component`. Small child components inside your own folder are welcome.
- Sample data in a `*.data.ts` file inside your folder, typed with interfaces, not written into
  the templates.
- SCSS with our CSS custom properties only (colours, spacing, radius, font sizes as `var(--...)`);
  new tokens go into `_tokens.scss` with light AND dark values and are listed in your PR. No
  hard-coded colours, no `!important`. Component styles stay under 4 kB.
- Charts: no chart library. Inline SVG or CSS. Every chart also has its numbers readable without
  the picture (a visually hidden table or labels).
- TypeScript strict, no `any`, no `!` non-null assertions.
- Accessibility: semantic HTML, `<caption>` on tables, buttons with `type`, visible focus, status
  in words (Healthy / On track / Missed), not colour only.
- Works on a laptop and on a phone (cards stack on small screens, no sideways page scroll).
- At least one spec per component (it renders its sample data).
- ESLint + Prettier clean, conventional commit messages, no new npm dependencies.

## 4. Plan

| Day        | Done by the end of the day                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------- |
| Thu 19 Nov | Repo set up from this starter, reviewers added, your sample data file, the structure of your part |
| Mon 23 Nov | Your part matches the layout on a laptop                                                          |
| Tue 24 Nov | Phone layout, accessibility, specs, lint / tests / build green, PR ready                          |

## 5. Done means

- `npm run lint`, `npm run test:ci` and `npm run build` pass with zero warnings.
- Your part matches the layout image, on a laptop and a phone.
- Only your folder(s) changed (plus new tokens listed in the PR).
