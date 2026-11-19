import { Component } from '@angular/core';
import { OverviewBottom } from './overview-bottom/overview-bottom';
import { OverviewTop } from './overview-top/overview-top';

/** The Overview page: the top half (Prayas) above the bottom half (Vinay). */
@Component({
  selector: 'app-overview',
  imports: [OverviewTop, OverviewBottom],
  template: `
    <main class="overview">
      <h1>Overview</h1>
      <app-overview-top />
      <app-overview-bottom />
    </main>
  `,
  styles: `
    .overview {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      padding: var(--space-4);
    }
  `,
})
export class Overview {}
