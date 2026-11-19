import { TestBed } from '@angular/core/testing';
import { Sparkline } from './sparkline';

describe('Sparkline', () => {
  async function render(values: readonly number[], marker: number | null = null) {
    const fixture = TestBed.createComponent(Sparkline);
    fixture.componentRef.setInput('values', values);
    fixture.componentRef.setInput('label', 'Sales trend');
    fixture.componentRef.setInput('marker', marker);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('draws one point per value and names the chart for screen readers', async () => {
    const root = await render([1, 3, 2, 5]);
    const points = root.querySelector('polyline')?.getAttribute('points') ?? '';
    expect(points.split(' ').length).toBe(4);
    expect(root.querySelector('svg')?.getAttribute('aria-label')).toBe('Sales trend');
  });

  it('marks the chosen index with a dot, and only then', async () => {
    expect((await render([1, 2, 3])).querySelector('circle')).toBeNull();
    expect((await render([1, 2, 3], 2)).querySelector('circle')).not.toBeNull();
  });

  it('copes with a single value and with an empty list', async () => {
    expect((await render([4])).querySelector('polyline')).not.toBeNull();
    expect((await render([])).querySelector('polyline')?.getAttribute('points')).toBe('');
  });
});
