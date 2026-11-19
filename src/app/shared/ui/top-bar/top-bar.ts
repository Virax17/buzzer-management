import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TOP_BAR_DATA } from './top-bar.data';

/** Top bar shared by both pages: logo, section tabs, date range, notifications, settings, user. */
@Component({
  selector: 'app-top-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss',
})
export class TopBar {
  protected readonly data = TOP_BAR_DATA;
  protected readonly initials = this.data.userName
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2);
}
