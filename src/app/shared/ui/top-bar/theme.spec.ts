import { TestBed } from '@angular/core/testing';
import { Theme } from './theme';

describe('Theme', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.clear();
  });

  it('follows the system by default, with no data-theme on the page', () => {
    const theme = TestBed.inject(Theme);
    TestBed.tick();
    expect(theme.choice()).toBe('system');
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
  });

  it('forces light or dark on the page and remembers the choice', () => {
    const theme = TestBed.inject(Theme);
    theme.set('light');
    TestBed.tick();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('buzzer-theme')).toBe('light');
    theme.set('dark');
    TestBed.tick();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('goes back to the system theme and forgets the choice', () => {
    const theme = TestBed.inject(Theme);
    theme.set('dark');
    TestBed.tick();
    theme.set('system');
    TestBed.tick();
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
    expect(localStorage.getItem('buzzer-theme')).toBeNull();
  });

  it('starts from the remembered choice', () => {
    localStorage.setItem('buzzer-theme', 'light');
    expect(TestBed.inject(Theme).choice()).toBe('light');
  });
});
