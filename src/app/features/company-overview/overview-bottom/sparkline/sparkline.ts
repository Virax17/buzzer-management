import { Component, computed, input } from '@angular/core';

const WIDTH = 120;
const HEIGHT = 28;
const PAD = 3;

interface Point {
  readonly x: number;
  readonly y: number;
}

/** Tiny line chart in inline SVG. `label` is read out in place of the picture. */
@Component({
  selector: 'app-sparkline',
  templateUrl: './sparkline.html',
  styleUrl: './sparkline.scss',
})
export class Sparkline {
  readonly values = input.required<readonly number[]>();
  readonly label = input.required<string>();
  /** Index of the value to mark with a dot, if any. */
  readonly marker = input<number | null>(null);

  protected readonly width = WIDTH;
  protected readonly height = HEIGHT;

  private readonly coords = computed<readonly Point[]>(() => {
    const values = this.values();
    const min = Math.min(...values);
    const span = Math.max(...values) - min || 1;
    const steps = Math.max(values.length - 1, 1);
    return values.map((value, i) => ({
      x: PAD + (i / steps) * (WIDTH - PAD * 2),
      y: HEIGHT - PAD - ((value - min) / span) * (HEIGHT - PAD * 2),
    }));
  });

  protected readonly points = computed(() =>
    this.coords()
      .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
      .join(' '),
  );

  protected readonly dot = computed(() => {
    const index = this.marker();
    return index === null ? null : (this.coords()[index] ?? null);
  });
}
