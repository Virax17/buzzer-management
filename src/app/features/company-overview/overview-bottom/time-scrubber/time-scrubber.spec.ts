import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TimeScrubber } from './time-scrubber';

@Component({
  imports: [TimeScrubber],
  template: '<app-time-scrubber [days]="days" [(index)]="index" />',
})
class Host {
  readonly days = ['2026-11-01', '2026-11-02', '2026-11-03'];
  readonly index = signal(2);
}

describe('TimeScrubber', () => {
  async function render() {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    return { fixture, root, input: root.querySelector('input') as HTMLInputElement };
  }

  it('shows the chosen day and spans every day of history', async () => {
    const { root, input } = await render();
    expect(root.querySelector('output')?.textContent).toBe('Nov 3');
    expect(input.max).toBe('2');
    expect(input.getAttribute('aria-valuetext')).toBe('Nov 3');
  });

  it('updates the chosen day when the slider moves', async () => {
    const { fixture, root, input } = await render();
    input.value = '0';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(fixture.componentInstance.index()).toBe(0);
    expect(root.querySelector('output')?.textContent).toBe('Nov 1');
  });

  it('starts over from the first day when Play is pressed on the last day', async () => {
    const { fixture, root } = await render();
    root.querySelector<HTMLButtonElement>('.play')?.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.index()).toBe(0);
    expect(root.querySelector('.play')?.getAttribute('aria-label')).toBe('Pause history');
  });
});
