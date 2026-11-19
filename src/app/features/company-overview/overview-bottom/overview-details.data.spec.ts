import { OVERVIEW_BOTTOM_MOCK } from './overview-bottom.data';
import { OVERVIEW_DETAILS_MOCK } from './overview-details.data';

describe('OVERVIEW_DETAILS_MOCK', () => {
  it('ends every goal history on the goal progress shown on the card', () => {
    for (const goal of OVERVIEW_BOTTOM_MOCK.q4.goals) {
      const series = OVERVIEW_DETAILS_MOCK.goalHistory[goal.id] ?? [];
      expect(series.length).toBe(OVERVIEW_DETAILS_MOCK.days.length);
      expect(series.at(-1)).toBe(goal.progress);
    }
  });

  it('ends every engine history on the revenue shown on the card, never going down', () => {
    for (const engine of OVERVIEW_BOTTOM_MOCK.revenueEngines.engines) {
      const series = OVERVIEW_DETAILS_MOCK.engineHistory[engine.id] ?? [];
      expect(series.at(-1)).toBe(engine.revenue);
      expect(series.every((value, i) => i === 0 || value >= (series[i - 1] ?? 0))).toBe(true);
    }
  });

  it('has teams whose headcounts add up to each department headcount', () => {
    for (const dept of OVERVIEW_BOTTOM_MOCK.organigram.departments) {
      const teams = OVERVIEW_DETAILS_MOCK.teams[dept.id] ?? [];
      expect(teams.reduce((sum, t) => sum + t.headcount, 0)).toBe(dept.headcount);
    }
  });

  it('lists every issue newest first, each on one of the days of history', () => {
    const { issues, days } = OVERVIEW_DETAILS_MOCK;
    expect(issues.length).toBe(24);
    expect(issues.every((i) => days.includes(i.date))).toBe(true);
    expect(issues.every((item, i) => i === 0 || item.date <= (issues[i - 1]?.date ?? ''))).toBe(
      true,
    );
  });
});
