import { Component, input } from '@angular/core';

export type IconName =
  | 'sales'
  | 'marketing'
  | 'product'
  | 'development'
  | 'operations'
  | 'business'
  | 'revenue'
  | 'creator-badge'
  | 'buzzer-ads'
  | 'streaming'
  | 'tryouts'
  | 'issue'
  | 'risk'
  | 'missed'
  | 'update'
  | 'chevron'
  | 'pulse';

/** Decorative stroke icon (inline SVG, inherits the text colour). Size it with `font-size`. */
@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
})
export class Icon {
  readonly name = input.required<IconName>();
}
