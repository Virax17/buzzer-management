import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TopBar } from './top-bar';

async function render() {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(TopBar);
  await fixture.whenStable();
  const root = fixture.nativeElement as HTMLElement;
  const settings = () => root.querySelector<HTMLButtonElement>('button[aria-label="Settings"]');
  const option = (label: string) =>
    [...root.querySelectorAll<HTMLButtonElement>('.option')].find((b) =>
      b.textContent?.includes(label),
    );
  return { fixture, root, settings, option };
}

describe('TopBar', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.clear();
  });

  it('renders the app name and the four section tabs', async () => {
    const { root } = await render();
    expect(root.textContent).toContain('Buzzer Intelligence');
    const links = [...root.querySelectorAll('nav a')].map((a) => a.textContent?.trim());
    expect(links).toEqual(['Overview', 'Organigram', 'Departments', 'Revenue Engines']);
  });

  it('points the tabs at their routes', async () => {
    const { root } = await render();
    const hrefs = [...root.querySelectorAll('nav a')].map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['/overview', '/organigram', '/departments', '/revenue-engines']);
  });

  it('shows the date range, the notification dot and the user, all with accessible names', async () => {
    const { root } = await render();
    expect(root.textContent).toContain('Nov 1 – Nov 30, 2026');
    expect(root.querySelector('.dot')).not.toBeNull();
    const names = [...root.querySelectorAll('button')].map((b) => b.getAttribute('aria-label'));
    expect(names).toEqual([
      'Date range: Nov 1 – Nov 30, 2026',
      'Notifications, 1 unread',
      'Settings',
      'Account menu for Vinay Patil',
    ]);
  });

  it('opens an Appearance menu from Settings with Light, Dark and system options', async () => {
    const { fixture, root, settings } = await render();
    expect(root.querySelector('.menu')).toBeNull();
    settings()?.click();
    await fixture.whenStable();
    expect(settings()?.getAttribute('aria-expanded')).toBe('true');
    const labels = [...root.querySelectorAll('.option')].map((o) => o.textContent?.trim());
    expect(labels).toEqual(['Light mode', 'Dark mode', 'Match system']);
  });

  it('switches to light mode and marks it as the chosen option', async () => {
    const { fixture, settings, option } = await render();
    settings()?.click();
    await fixture.whenStable();
    option('Light mode')?.click();
    await fixture.whenStable();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(option('Light mode')?.getAttribute('aria-pressed')).toBe('true');
    expect(option('Dark mode')?.getAttribute('aria-pressed')).toBe('false');
  });

  it('goes back to the system theme from Match system', async () => {
    const { fixture, settings, option } = await render();
    settings()?.click();
    await fixture.whenStable();
    option('Dark mode')?.click();
    await fixture.whenStable();
    option('Match system')?.click();
    await fixture.whenStable();
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
  });

  it('closes the menu on Escape and on a click outside it', async () => {
    const { fixture, root, settings } = await render();
    settings()?.click();
    await fixture.whenStable();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();
    expect(root.querySelector('.menu')).toBeNull();

    settings()?.click();
    await fixture.whenStable();
    document.body.click();
    await fixture.whenStable();
    expect(root.querySelector('.menu')).toBeNull();
  });
});
