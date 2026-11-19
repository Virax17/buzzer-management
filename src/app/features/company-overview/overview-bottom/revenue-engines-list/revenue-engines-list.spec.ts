import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { OVERVIEW_BOTTOM_MOCK, type RevenueEnginesData } from '../overview-bottom.data';
import { RevenueEnginesList } from './revenue-engines-list';

async function render(data: RevenueEnginesData) {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(RevenueEnginesList);
  fixture.componentRef.setInput('data', data);
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe('RevenueEnginesList', () => {
  it('calculates each progress from revenue and target', async () => {
    const root = await render(OVERVIEW_BOTTOM_MOCK.revenueEngines);
    const values = [...root.querySelectorAll('[role="progressbar"]')].map((b) =>
      b.getAttribute('aria-valuenow'),
    );
    expect(values).toEqual(['50', '60', '45', '30']);
    expect(root.textContent).toContain('AED 300K of AED 600K');
  });

  it('shows 0% instead of dividing by a zero target', async () => {
    const root = await render({
      currency: 'AED',
      engines: [{ id: 'x', name: 'New', icon: 'streaming', revenue: 5, target: 0 }],
    });
    expect(root.querySelector('[role="progressbar"]')?.getAttribute('aria-valuenow')).toBe('0');
    expect(root.textContent).toContain('0%');
  });

  it('renders an empty list without errors', async () => {
    const root = await render({ currency: 'AED', engines: [] });
    expect(root.querySelectorAll('li').length).toBe(0);
  });
});
