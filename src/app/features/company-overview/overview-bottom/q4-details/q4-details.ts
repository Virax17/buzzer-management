import { DecimalPipe } from '@angular/common';
import { Component, computed, input, linkedSignal } from '@angular/core';
import { type Q4ProgressData } from '../overview-bottom.data';
import { Sparkline } from '../sparkline/sparkline';
import { TimeScrubber } from '../time-scrubber/time-scrubber';

/** All Q4 goals with their history: drag the scrubber to see progress on any past day. */
@Component({
  selector: 'app-q4-details',
  imports: [DecimalPipe, Sparkline, TimeScrubber],
  templateUrl: './q4-details.html',
  styleUrl: './q4-details.scss',
})
export class Q4Details {
  readonly data = input.required<Q4ProgressData>();
  readonly history = input.required<Readonly<Record<string, readonly number[]>>>();
  readonly days = input.required<readonly string[]>();

  protected readonly day = linkedSignal(() => this.days().length - 1);
  protected readonly isToday = computed(() => this.day() === this.days().length - 1);

  protected readonly rows = computed(() => {
    const day = this.day();
    return this.data().goals.map((goal) => {
      const series = this.history()[goal.id] ?? [];
      const value = series[day] ?? 0;
      const previous = series[day - 1];
      return {
        ...goal,
        value,
        change: previous === undefined ? 0 : value - previous,
        trend: series.slice(0, day + 1),
        statusLabel: goal.status === 'on-track' ? 'On track' : 'At risk',
      };
    });
  });

  protected readonly overall = computed(() => {
    const rows = this.rows();
    return rows.length === 0 ? 0 : rows.reduce((sum, r) => sum + r.value, 0) / rows.length;
  });
}
