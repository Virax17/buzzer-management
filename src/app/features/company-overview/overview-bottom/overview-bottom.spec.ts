import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { OverviewBottom } from './overview-bottom';

describe('OverviewBottom', () => {
  async function render(url = '/') {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const router = TestBed.inject(Router);
    await router.navigateByUrl(url);
    const fixture = TestBed.createComponent(OverviewBottom);
    await fixture.whenStable();
    return { fixture, router, root: fixture.nativeElement as HTMLElement };
  }

  it('renders the four cards', async () => {
    const { root } = await render();
    const text = root.textContent ?? '';
    expect(text).toContain('Organigram');
    expect(text).toContain('Q4 Progress');
    expect(text).toContain('Revenue Engines');
    expect(text).toContain('Issues & Happenings');
    expect(root.querySelector('app-expanded-panel')).toBeNull();
  });

  it('opens a section from its View button and puts it in the URL', async () => {
    const { fixture, router, root } = await render();
    root.querySelector<HTMLButtonElement>('app-q4-progress .link')?.click();
    await fixture.whenStable();
    expect(router.url).toBe('/?view=q4');
    expect(root.querySelector('app-q4-details')).not.toBeNull();
    expect(root.querySelector('app-q4-progress')).toBeNull();
  });

  it('opens straight into a section when the URL asks for it', async () => {
    const { root } = await render('/?view=issues');
    expect(root.querySelector('app-issues-details')).not.toBeNull();
    expect(root.querySelector('h2')?.textContent).toContain('Issues & Happenings');
  });

  it('ignores an unknown view in the URL', async () => {
    const { root } = await render('/?view=nonsense');
    expect(root.querySelector('app-expanded-panel')).toBeNull();
    expect(root.querySelector('app-q4-progress')).not.toBeNull();
  });

  it('goes back to the overview from the Back button', async () => {
    const { fixture, router, root } = await render('/?view=engines');
    root.querySelector<HTMLButtonElement>('.back')?.click();
    await fixture.whenStable();
    expect(router.url).toBe('/');
    expect(root.querySelector('app-revenue-engines-list')).not.toBeNull();
  });
});
