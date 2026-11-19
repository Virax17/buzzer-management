import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ExpandedPanel } from './expanded-panel';

@Component({
  imports: [ExpandedPanel],
  template: `
    <app-expanded-panel heading="Q4 Progress" subtitle="All goals" (closed)="closes = closes + 1">
      <p class="content">Inside</p>
    </app-expanded-panel>
  `,
})
class Host {
  closes = 0;
}

describe('ExpandedPanel', () => {
  async function render() {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    return { fixture, root: fixture.nativeElement as HTMLElement };
  }

  it('shows the heading, subtitle and the projected content', async () => {
    const { root } = await render();
    expect(root.querySelector('h2')?.textContent).toContain('Q4 Progress');
    expect(root.textContent).toContain('All goals');
    expect(root.querySelector('.content')?.textContent).toBe('Inside');
  });

  it('closes from the Back button and from Escape', async () => {
    const { fixture, root } = await render();
    root.querySelector<HTMLButtonElement>('.back')?.click();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(fixture.componentInstance.closes).toBe(2);
  });

  it('moves focus to the Back button when it opens', async () => {
    const { root } = await render();
    expect(document.activeElement).toBe(root.querySelector('.back'));
  });
});
