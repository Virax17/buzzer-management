import { DecimalPipe } from '@angular/common';
import { Component, computed, input, linkedSignal, signal } from '@angular/core';
import { Icon } from '../icon/icon';
import { type RevenueEnginesData } from '../overview-bottom.data';
import { Sparkline } from '../sparkline/sparkline';
import { TimeScrubber } from '../time-scrubber/time-scrubber';

type SortKey = 'name' | 'revenue' | 'progress';

interface Sort {
  readonly key: SortKey;
  readonly dir: 'asc' | 'desc';
}

/** Every revenue engine with its revenue on the chosen day, sortable, with a trend line. */
@Component({
  selector: 'app-engines-details',
  imports: [DecimalPipe, Icon, Sparkline, TimeScrubber],
  templateUrl: './engines-details.html',
  styleUrl: './engines-details.scss',
})
export class EnginesDetails {
  readonly data = input.required<RevenueEnginesData>();
  readonly history = input.required<Readonly<Record<string, readonly number[]>>>();
  readonly days = input.required<readonly string[]>();

  protected readonly day = linkedSignal(() => this.days().length - 1);
  protected readonly sort = signal<Sort>({ key: 'revenue', dir: 'desc' });

  protected readonly rows = computed(() => {
    const day = this.day();
    const { key, dir } = this.sort();
    const rows = this.data().engines.map((engine) => {
      const series = this.history()[engine.id] ?? [];
      const revenue = series[day] ?? 0;
      return {
        ...engine,
        revenue,
        progress: engine.target === 0 ? 0 : (revenue / engine.target) * 100,
        trend: series.slice(0, day + 1),
      };
    });
    const sign = dir === 'asc' ? 1 : -1;
    return rows.sort((a, b) =>
      key === 'name' ? sign * a.name.localeCompare(b.name) : sign * (a[key] - b[key]),
    );
  });

  protected readonly total = computed(() => {
    const rows = this.rows();
    const revenue = rows.reduce((sum, r) => sum + r.revenue, 0);
    const target = rows.reduce((sum, r) => sum + r.target, 0);
    return { revenue, target, progress: target === 0 ? 0 : (revenue / target) * 100 };
  });

  protected setSort(key: SortKey): void {
    this.sort.update((s) => ({
      key,
      dir: s.key === key && s.dir === 'desc' ? 'asc' : 'desc',
    }));
  }

  protected ariaSort(key: SortKey): 'ascending' | 'descending' | 'none' {
    const s = this.sort();
    if (s.key !== key) return 'none';
    return s.dir === 'asc' ? 'ascending' : 'descending';
  }
}
