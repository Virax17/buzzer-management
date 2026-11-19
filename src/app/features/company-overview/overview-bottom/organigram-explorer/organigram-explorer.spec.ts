import { TestBed } from '@angular/core/testing';
import { OVERVIEW_BOTTOM_MOCK } from '../overview-bottom.data';
import { OVERVIEW_DETAILS_MOCK } from '../overview-details.data';
import { OrganigramExplorer } from './organigram-explorer';

describe('OrganigramExplorer', () => {
  async function render() {
    const fixture = TestBed.createComponent(OrganigramExplorer);
    fixture.componentRef.setInput('data', OVERVIEW_BOTTOM_MOCK.organigram);
    fixture.componentRef.setInput('teams', OVERVIEW_DETAILS_MOCK.teams);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const open = async (name: string) => {
      [...root.querySelectorAll<HTMLButtonElement>('.action')]
        .find((b) => b.textContent?.includes(name))
        ?.click();
      await fixture.whenStable();
    };
    return { fixture, root, open };
  }

  it('starts with the CEO and every department', async () => {
    const { root } = await render();
    expect(root.querySelector('.node')?.textContent).toContain('Amer Muminovic');
    expect(root.querySelectorAll('.child').length).toBe(5);
    expect(root.querySelector('.total')?.textContent).toContain('130 people across 5 departments');
  });

  it('zooms into a department to show its teams, then back to the company', async () => {
    const { fixture, root, open } = await render();
    await open('Product');
    expect(root.querySelector('.node')?.textContent).toContain('Product');
    expect(root.querySelectorAll('.child').length).toBe(4);
    expect(root.querySelector('.total')?.textContent).toContain('32 people across 4 teams');
    expect(root.querySelector('.crumbs [aria-current="page"]')?.textContent).toBe('Product');
    root.querySelector<HTMLButtonElement>('.crumb')?.click();
    await fixture.whenStable();
    expect(root.querySelectorAll('.child').length).toBe(5);
  });

  it('does not make the team cards clickable', async () => {
    const { root, open } = await render();
    await open('Sales');
    expect(root.querySelectorAll('.child button').length).toBe(0);
  });
});
