import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TopBar } from './top-bar';

async function render() {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(TopBar);
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe('TopBar', () => {
  it('renders the app name and the four section tabs', async () => {
    const root = await render();
    expect(root.textContent).toContain('Buzzer Intelligence');
    const links = [...root.querySelectorAll('nav a')].map((a) => a.textContent?.trim());
    expect(links).toEqual(['Overview', 'Organigram', 'Departments', 'Revenue Engines']);
  });

  it('points the tabs at their routes', async () => {
    const root = await render();
    const hrefs = [...root.querySelectorAll('nav a')].map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['/overview', '/organigram', '/departments', '/revenue-engines']);
  });

  it('shows the date range, the notification dot and the user, all with accessible names', async () => {
    const root = await render();
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
});
