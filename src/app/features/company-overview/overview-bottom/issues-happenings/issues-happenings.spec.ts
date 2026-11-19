import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { type HappeningItem, OVERVIEW_BOTTOM_MOCK } from '../overview-bottom.data';
import { IssuesHappenings } from './issues-happenings';

async function setup(items: readonly HappeningItem[]) {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(IssuesHappenings);
  fixture.componentRef.setInput('items', items);
  await fixture.whenStable();
  const root = fixture.nativeElement as HTMLElement;
  const tabs = () => root.querySelectorAll<HTMLButtonElement>('[role="tab"]');
  const rows = () => root.querySelectorAll('tbody tr');
  return { fixture, root, tabs, rows };
}

const ITEMS = OVERVIEW_BOTTOM_MOCK.happenings.items;

describe('IssuesHappenings', () => {
  it('renders all rows and a count on every tab', async () => {
    const { tabs, rows } = await setup(ITEMS);
    expect(rows().length).toBe(5);
    expect([...tabs()].map((t) => t.textContent?.trim())).toEqual([
      'All (5)',
      'Issues (1)',
      'Risks (1)',
      'Missed (1)',
      'Updates (2)',
    ]);
  });

  it('filters the rows when a tab is clicked', async () => {
    const { fixture, tabs, rows } = await setup(ITEMS);
    tabs()[4].click();
    await fixture.whenStable();
    expect(rows().length).toBe(2);
    expect(tabs()[4].getAttribute('aria-selected')).toBe('true');
    expect(tabs()[0].getAttribute('aria-selected')).toBe('false');
  });

  it('moves between tabs with the arrow, Home and End keys and wraps around', async () => {
    const { fixture, tabs } = await setup(ITEMS);
    const press = async (index: number, key: string) => {
      tabs()[index].dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
      await fixture.whenStable();
    };
    await press(0, 'ArrowRight');
    expect(tabs()[1].getAttribute('aria-selected')).toBe('true');
    await press(1, 'ArrowLeft');
    await press(0, 'ArrowLeft');
    expect(tabs()[4].getAttribute('aria-selected')).toBe('true');
    await press(4, 'Home');
    expect(tabs()[0].getAttribute('aria-selected')).toBe('true');
    await press(0, 'End');
    expect(tabs()[4].getAttribute('aria-selected')).toBe('true');
  });

  it('keeps only the selected tab in the tab order', async () => {
    const { tabs } = await setup(ITEMS);
    expect([...tabs()].map((t) => t.getAttribute('tabindex'))).toEqual([
      '0',
      '-1',
      '-1',
      '-1',
      '-1',
    ]);
  });

  it('shows an empty message when there is nothing to list', async () => {
    const { root, rows } = await setup([]);
    expect(rows().length).toBe(1);
    expect(root.textContent).toContain('Nothing to show for this filter.');
  });

  it('labels each status in words, not only by colour', async () => {
    const { root } = await setup(ITEMS);
    const pills = [...root.querySelectorAll('.pill')].map((p) => p.textContent?.trim());
    expect(pills).toEqual(['Issue', 'Risk', 'Missed', 'Update', 'Update']);
  });
});
