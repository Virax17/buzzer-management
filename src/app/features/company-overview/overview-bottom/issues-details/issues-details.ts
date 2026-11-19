import { Component, computed, input, linkedSignal, signal } from '@angular/core';
import { Icon } from '../icon/icon';
import { type HappeningItem, type IssueKind } from '../overview-bottom.data';
import { Sparkline } from '../sparkline/sparkline';
import { TimeScrubber } from '../time-scrubber/time-scrubber';

const PAGE_SIZE = 8;

const KIND_CHIPS: readonly { readonly id: IssueKind; readonly label: string }[] = [
  { id: 'issue', label: 'Issues' },
  { id: 'risk', label: 'Risks' },
  { id: 'missed', label: 'Missed' },
  { id: 'update', label: 'Updates' },
];

const KIND_LABEL: Readonly<Record<IssueKind, string>> = {
  issue: 'Issue',
  risk: 'Risk',
  missed: 'Missed',
  update: 'Update',
};

/**
 * Every issue with history and filters. Filter chips can be dragged into the drop box
 * (or clicked, for keyboard and touch); the scrubber shows the list as of any past day.
 */
@Component({
  selector: 'app-issues-details',
  imports: [Icon, Sparkline, TimeScrubber],
  templateUrl: './issues-details.html',
  styleUrl: './issues-details.scss',
})
export class IssuesDetails {
  readonly items = input.required<readonly HappeningItem[]>();
  readonly days = input.required<readonly string[]>();

  protected readonly day = linkedSignal(() => this.days().length - 1);
  protected readonly query = signal('');
  protected readonly selected = signal<readonly string[]>([]);
  protected readonly limit = signal(PAGE_SIZE);
  protected readonly dragOver = signal(false);

  /** Chips are "kind:issue" or "dept:Sales" tokens, so a drag only has to carry a string. */
  protected readonly chips = computed(() => {
    const selected = this.selected();
    const departments = [...new Set(this.items().map((i) => i.department))].sort();
    return [
      ...KIND_CHIPS.map((k) => ({ token: `kind:${k.id}`, label: k.label })),
      ...departments.map((d) => ({ token: `dept:${d}`, label: d })),
    ].map((chip) => ({ ...chip, active: selected.includes(chip.token) }));
  });

  protected readonly activeChips = computed(() => this.chips().filter((c) => c.active));

  protected readonly visible = computed(() => {
    const until = this.days()[this.day()] ?? '';
    const selected = this.selected();
    const kinds = selected.filter((t) => t.startsWith('kind:')).map((t) => t.slice(5));
    const depts = selected.filter((t) => t.startsWith('dept:')).map((t) => t.slice(5));
    const query = this.query().trim().toLowerCase();
    return this.items()
      .filter((item) => item.date <= until)
      .filter((item) => kinds.length === 0 || kinds.includes(item.kind))
      .filter((item) => depts.length === 0 || depts.includes(item.department))
      .filter(
        (item) =>
          query === '' ||
          `${item.title} ${item.detail} ${item.owner}`.toLowerCase().includes(query),
      )
      .map((item) => ({ ...item, kindLabel: KIND_LABEL[item.kind] }));
  });

  protected readonly shown = computed(() => this.visible().slice(0, this.limit()));

  /** Items logged per day, for the trend line under the scrubber. */
  protected readonly perDay = computed(() =>
    this.days().map((d) => this.items().filter((i) => i.date === d).length),
  );

  protected toggle(token: string): void {
    this.selected.update((list) =>
      list.includes(token) ? list.filter((t) => t !== token) : [...list, token],
    );
    this.limit.set(PAGE_SIZE);
  }

  protected onSearch(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    this.query.set(event.target.value);
    this.limit.set(PAGE_SIZE);
  }

  protected onDragStart(event: DragEvent, token: string): void {
    event.dataTransfer?.setData('text/plain', token);
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'copy';
  }

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragOver.set(true);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver.set(false);
    const token = event.dataTransfer?.getData('text/plain') ?? '';
    if (this.chips().some((c) => c.token === token) && !this.selected().includes(token)) {
      this.toggle(token);
    }
  }

  protected clearAll(): void {
    this.selected.set([]);
    this.query.set('');
    this.limit.set(PAGE_SIZE);
  }

  protected showMore(): void {
    this.limit.update((n) => n + PAGE_SIZE);
  }
}
