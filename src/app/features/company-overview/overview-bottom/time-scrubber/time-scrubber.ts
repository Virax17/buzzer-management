import { Component, computed, effect, input, model, signal } from '@angular/core';
import { formatDay } from '../day';

const STEP_MS = 700;

/** Slider (with Play) that moves through the days of history. `index` is the chosen day. */
@Component({
  selector: 'app-time-scrubber',
  templateUrl: './time-scrubber.html',
  styleUrl: './time-scrubber.scss',
})
export class TimeScrubber {
  readonly days = input.required<readonly string[]>();
  readonly index = model.required<number>();

  protected readonly playing = signal(false);
  protected readonly label = computed(() => formatDay(this.days()[this.index()]));
  protected readonly last = computed(() => this.days().length - 1);

  constructor() {
    effect((onCleanup) => {
      if (!this.playing()) return;
      const timer = setInterval(() => {
        const next = this.index() + 1;
        if (next > this.last()) this.playing.set(false);
        else this.index.set(next);
      }, STEP_MS);
      onCleanup(() => clearInterval(timer));
    });
  }

  protected toggle(): void {
    if (!this.playing() && this.index() >= this.last()) this.index.set(0);
    this.playing.update((p) => !p);
  }

  protected onInput(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    this.playing.set(false);
    this.index.set(Number(event.target.value));
  }
}
