import { DOCUMENT } from '@angular/common';
import { effect, inject, Service, signal } from '@angular/core';

export type ThemeChoice = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'buzzer-theme';

function stored(): ThemeChoice {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : 'system';
  } catch {
    return 'system';
  }
}

/**
 * The visitor's colour theme. "system" follows the operating system; "light" and "dark" force
 * one by setting `data-theme` on the page, which the global styles read. The choice is remembered.
 */
@Service()
export class Theme {
  private readonly root = inject(DOCUMENT).documentElement;

  readonly choice = signal<ThemeChoice>(stored());

  constructor() {
    effect(() => {
      const choice = this.choice();
      if (choice === 'system') this.root.removeAttribute('data-theme');
      else this.root.setAttribute('data-theme', choice);
      try {
        if (choice === 'system') localStorage.removeItem(STORAGE_KEY);
        else localStorage.setItem(STORAGE_KEY, choice);
      } catch {
        // Storage is blocked: the choice still applies for this visit.
      }
    });
  }

  set(choice: ThemeChoice): void {
    this.choice.set(choice);
  }
}
