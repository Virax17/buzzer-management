import { Component, ElementRef, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Theme, type ThemeChoice } from './theme';
import { THEME_OPTIONS, TOP_BAR_DATA } from './top-bar.data';

/** Top bar shared by both pages: logo, section tabs, date range, notifications, settings, user. */
@Component({
  selector: 'app-top-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'settingsOpen.set(false)',
  },
})
export class TopBar {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly theme = inject(Theme);
  protected readonly data = TOP_BAR_DATA;
  protected readonly themeOptions = THEME_OPTIONS;
  protected readonly settingsOpen = signal(false);
  protected readonly initials = this.data.userName
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2);

  protected choose(choice: ThemeChoice): void {
    this.theme.set(choice);
  }

  protected onDocumentClick(event: Event): void {
    if (
      this.settingsOpen() &&
      event.target instanceof Node &&
      !this.host.nativeElement.contains(event.target)
    ) {
      this.settingsOpen.set(false);
    }
  }
}
