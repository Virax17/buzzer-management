import { TestBed } from '@angular/core/testing';
import { OVERVIEW_BOTTOM_MOCK } from '../overview-bottom.data';
import { OVERVIEW_DETAILS_MOCK } from '../overview-details.data';
import { Q4Details } from './q4-details';

describe('Q4Details', () => {
  async function render() {
    const fixture = TestBed.createComponent(Q4Details);
    fixture.componentRef.setInput('data', OVERVIEW_BOTTOM_MOCK.q4);
    fixture.componentRef.setInput('history', OVERVIEW_DETAILS_MOCK.goalHistory);
    fixture.componentRef.setInput('days', OVERVIEW_DETAILS_MOCK.days);
    await fixture.whenStable();
    return { fixture, root: fixture.nativeElement as HTMLElement };
  }

  it('starts on today with the calculated average and each goal status in words', async () => {
    const { root } = await render();
    expect(root.querySelector('.overall')?.textContent).toContain('69.9%');
    const badges = [...root.querySelectorAll('.badge')].map((b) => b.textContent?.trim());
    expect(badges.filter((b) => b === 'On track').length).toBe(2);
    expect(badges.filter((b) => b === 'At risk').length).toBe(3);
  });

  it('shows earlier progress when the scrubber moves back, without status', async () => {
    const { fixture, root } = await render();
    const range = root.querySelector('input') as HTMLInputElement;
    range.value = '0';
    range.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    const average = Number(
      /([\d.]+)%/.exec(root.querySelector('.overall')?.textContent ?? '')?.[1],
    );
    expect(average).toBeLessThan(69.9);
    expect(root.querySelectorAll('.badge').length).toBe(0);
    expect(root.querySelectorAll('tbody tr').length).toBe(5);
  });
});
