import { TestBed } from '@angular/core/testing';
import { OVERVIEW_BOTTOM_MOCK } from '../overview-bottom.data';
import { OVERVIEW_DETAILS_MOCK } from '../overview-details.data';
import { EnginesDetails } from './engines-details';

describe('EnginesDetails', () => {
  async function render() {
    const fixture = TestBed.createComponent(EnginesDetails);
    fixture.componentRef.setInput('data', OVERVIEW_BOTTOM_MOCK.revenueEngines);
    fixture.componentRef.setInput('history', OVERVIEW_DETAILS_MOCK.engineHistory);
    fixture.componentRef.setInput('days', OVERVIEW_DETAILS_MOCK.days);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const names = () => [...root.querySelectorAll('tbody th')].map((t) => t.textContent?.trim());
    return { fixture, root, names };
  }

  it('lists the engines by revenue, highest first, with calculated totals', async () => {
    const { root, names } = await render();
    expect(names()).toEqual(['Buzzer Ads', 'Creator Badge', 'Streaming', 'Tryouts']);
    const total = root.querySelector('tfoot')?.textContent ?? '';
    expect(total).toContain('1,740,000');
    expect(total).toContain('3,200,000');
    expect(total).toContain('54.4%');
  });

  it('sorts by name and flips the direction on a second click', async () => {
    const { fixture, root, names } = await render();
    const byName = root.querySelector<HTMLButtonElement>('th button');
    byName?.click();
    await fixture.whenStable();
    expect(names()[0]).toBe('Tryouts');
    byName?.click();
    await fixture.whenStable();
    expect(names()[0]).toBe('Buzzer Ads');
    expect(root.querySelector('th[aria-sort="ascending"]')).not.toBeNull();
  });

  it('shows less revenue on an earlier day', async () => {
    const { fixture, root } = await render();
    const range = root.querySelector('input') as HTMLInputElement;
    range.value = '0';
    range.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    const total = Number((root.querySelector('tfoot td')?.textContent ?? '').replace(/,/g, ''));
    expect(total).toBeLessThan(1_740_000);
  });
});
