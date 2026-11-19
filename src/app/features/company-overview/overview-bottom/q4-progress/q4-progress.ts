import { DecimalPipe } from '@angular/common';
import { Component, output, computed, input } from '@angular/core';
import { type Q4ProgressData } from '../overview-bottom.data';

/** Q4 company goals: the overall progress is the average of the goals, calculated from the data. */
@Component({
  selector: 'app-q4-progress',
  imports: [DecimalPipe],
  templateUrl: './q4-progress.html',
  styleUrl: './q4-progress.scss',
})
export class Q4Progress {
  readonly expand = output<void>();
  readonly data = input.required<Q4ProgressData>();

  protected readonly overall = computed(() => {
    const goals = this.data().goals;
    return goals.length === 0 ? 0 : goals.reduce((sum, g) => sum + g.progress, 0) / goals.length;
  });
  protected readonly onTrackCount = computed(
    () => this.data().goals.filter((g) => g.status === 'on-track').length,
  );
}
