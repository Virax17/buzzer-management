import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { OVERVIEW_BOTTOM_MOCK, type Q4ProgressData } from '../overview-bottom.data';
import { Q4Progress } from './q4-progress';

async function render(data: Q4ProgressData) {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(Q4Progress);
  fixture.componentRef.setInput('data', data);
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe('Q4Progress', () => {
  it('calculates the overall progress as the average of the goals', async () => {
    const root = await render(OVERVIEW_BOTTOM_MOCK.q4);
    expect(root.textContent).toContain('70%');
    expect(root.querySelector('[role="progressbar"]')?.getAttribute('aria-valuenow')).toBe('69.9');
  });

  it('counts the on-track goals from their status flag', async () => {
    const root = await render(OVERVIEW_BOTTOM_MOCK.q4);
    expect(root.textContent).toContain('2 of 5 key goals on track');
    expect(root.querySelectorAll('.mark.done').length).toBe(2);
  });

  it('states each goal status in words', async () => {
    const root = await render(OVERVIEW_BOTTOM_MOCK.q4);
    const words = [...root.querySelectorAll('.goal .visually-hidden')].map((e) => e.textContent);
    expect(words.filter((w) => w === 'On track').length).toBe(2);
    expect(words.filter((w) => w === 'At risk').length).toBe(3);
  });

  it('shows 0% and 0 of 0 when there are no goals', async () => {
    const root = await render({ goals: [] });
    expect(root.textContent).toContain('0%');
    expect(root.textContent).toContain('0 of 0 key goals on track');
  });
});
