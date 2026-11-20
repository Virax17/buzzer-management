# Overview, bottom half

The bottom half of the Overview page in Buzzer Intelligence: four cards, and a full-size view
behind each one. Static sample data, no backend.

| Card                 | What it shows                                                         | Full view                                                      |
| -------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------- |
| Organigram (preview) | CEO and each department with its headcount, joined by connector lines | **Org explorer**: click a department to zoom into its teams    |
| Q4 Progress          | Overall percentage, goals on track, and each goal with its progress   | **Goal history**: every goal on any past day                   |
| Revenue Engines      | Each engine with its revenue, target and progress                     | **Engine history**: sortable table with totals and trend lines |
| Issues & Happenings  | Latest items with the All / Issues / Risks / Missed / Updates tabs    | **Issues explorer**: search, drag-to-filter, history           |

## Features

### Cards that grow into full views

"View Full", "View Details" and "View All" open a section. The card does not jump to a new page:
it **grows in place** into a full-size panel, and shrinks back into its card when you leave.

- **Back to overview** button, the **Esc** key and the browser's **Back** button all return.
- The open section is in the URL (`?view=organigram`, `q4`, `engines`, `issues`), so a refresh or a
  shared link opens the same view. An unknown value is ignored.
- Focus moves to the Back button when a view opens.

### The animation

The grow and shrink use the browser's **View Transitions API**. Each card and its full view share a
`view-transition-name` (for example `sec-issues`), so the browser treats them as the same element and
animates the move and resize between the two states. This happens in `overview-bottom.ts`
(`open()`), and the timing is set in `overview-bottom.scss` (0.5 s, ease-out curve).

Inside a full view, smaller animations help you follow what changed:

- The panel fades and slides up as it opens.
- The org chart connectors draw in, and department and team cards rise in one after another.
- Progress bars slide to a new value when you move the history slider.

It degrades gracefully:

- **Browsers without View Transitions** (older Firefox or Safari) skip the morph. The panel still
  fades in, and everything works.
- **Reduced motion**: if the visitor prefers reduced motion, all of these animations are switched
  off, and the view simply changes.

### Time scrubber (history)

The Q4, Revenue Engines and Issues views have a slider with a Play button. Drag it to see the numbers
as they were on any day from Nov 1 to Nov 19, or press Play to watch the month unfold day by day.
Sparklines trace the history up to the chosen day.

### Drag to filter (Issues)

Drag a chip (a type like Risks, or a department like Sales) into the drop box and the list filters.
Clicking a chip does the same, so keyboard and touch users are not left out. Filters combine with the
search box and with the chosen day. "Show more" loads the next page of results.

### Org explorer

Click a department and the chart zooms into its teams (Frontend, Backend, Mobile for Development),
with the connectors drawing in again. A breadcrumb returns to the company level. Team headcounts add
up to the department headcount.

## How it is built

- **Data from a service.** `OverviewBottomService` returns everything as an Observable:
  `getOverviewBottom()` for the four cards and `getDetails()` for the full views. Both return mock
  data from `overview-bottom.data.ts` and `overview-details.data.ts`. Swapping `of(...)` for
  `HttpClient` is the only change needed for a real API.
- **Calculated, not typed.** The Q4 percentage (average of the goals), goals on track (from each
  goal's `status`), engine progress (revenue / target), totals and counts are all computed from the
  data.
- **No chart library.** Sparklines, bars and connectors are inline SVG and CSS. Every chart has a text
  alternative.
- **Angular**: standalone components, signals (`signal`, `computed`, `linkedSignal`, `input`, `model`,
  `output`), zoneless, `@if` / `@for` / `@switch`, `inject()`.

## Accessibility

- Tabs follow the ARIA tab pattern, with arrow, Home and End keys.
- Tables have captions and header cells, and sortable columns announce their direction.
- Status is always written in words (Issue, Risk, Missed, Update, On track, At risk), never colour
  alone.
- Progress bars are `progressbar` elements with names and values.
- Text and icon colours meet contrast limits in light and dark themes.
- On phones, the Issues and Q4 tables become stacked cards, and there is no sideways page scroll.

## Layout of this folder

```
overview-bottom/
  overview-bottom.*          shell: the cards, the URL state and the open/close animation
  overview-bottom.data.ts    typed sample data for the four cards
  overview-details.data.ts   history, teams and the long issues list
  overview-bottom.service.ts data as Observables (mock now, API later)
  organigram-preview/  q4-progress/  revenue-engines-list/  issues-happenings/     the four cards
  organigram-explorer/ q4-details/   engines-details/        issues-details/        the full views
  expanded-panel/  time-scrubber/  sparkline/  icon/                                shared pieces
```

## Tests

Every component has a spec (53 tests in total across the project). They cover calculated values,
tab and keyboard behaviour, drag and drop filtering, sorting, the history slider, opening and closing
from the URL, empty states, and a data-integrity check that the history ends on today's values.

## Tokens added to `src/styles/_tokens.scss`

`--color-engine-1` to `--color-engine-4` (revenue engine tiles) and `--color-brand`,
`--color-brand-contrast` (logo and active tab), each with light and dark values.
