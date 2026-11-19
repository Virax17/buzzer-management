import { DecimalPipe } from '@angular/common';
import { Component, output, computed, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { type RevenueEnginesData } from '../overview-bottom.data';

const COMPACT = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });

/** Revenue engines with progress towards target, calculated from revenue and target. */
@Component({
  selector: 'app-revenue-engines-list',
  imports: [DecimalPipe, Icon],
  templateUrl: './revenue-engines-list.html',
  styleUrl: './revenue-engines-list.scss',
})
export class RevenueEnginesList {
  readonly expand = output<void>();
  readonly data = input.required<RevenueEnginesData>();

  protected readonly rows = computed(() => {
    const { currency, engines } = this.data();
    return engines.map((engine, index) => ({
      ...engine,
      progress: engine.target === 0 ? 0 : (engine.revenue / engine.target) * 100,
      amounts: `${currency} ${COMPACT.format(engine.revenue)} of ${currency} ${COMPACT.format(engine.target)}`,
      tone: (index % 4) + 1,
    }));
  });
}
