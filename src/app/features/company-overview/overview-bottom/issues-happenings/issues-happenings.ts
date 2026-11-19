import { Component, output, computed, ElementRef, inject, input, signal } from '@angular/core';
import { Icon } from '../icon/icon';
import { type HappeningItem, type IssueKind } from '../overview-bottom.data';

type TabId = 'all' | IssueKind;

interface TabDef {
  readonly id: TabId;
  readonly label: string;
}

const TABS: readonly TabDef[] = [
  { id: 'all', label: 'All' },
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

/** Issues & Happenings table with All / Issues / Risks / Missed / Updates tabs. */
@Component({
  selector: 'app-issues-happenings',
  imports: [Icon],
  templateUrl: './issues-happenings.html',
  styleUrl: './issues-happenings.scss',
})
export class IssuesHappenings {
  readonly expand = output<void>();
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly items = input.required<readonly HappeningItem[]>();

  protected readonly active = signal<TabId>('all');

  protected readonly tabs = computed(() =>
    TABS.map((tab) => ({
      ...tab,
      count:
        tab.id === 'all'
          ? this.items().length
          : this.items().filter((i) => i.kind === tab.id).length,
    })),
  );

  protected readonly rows = computed(() => {
    const active = this.active();
    const visible = active === 'all' ? this.items() : this.items().filter((i) => i.kind === active);
    return visible.map((item) => ({ ...item, kindLabel: KIND_LABEL[item.kind] }));
  });

  protected select(id: TabId): void {
    this.active.set(id);
  }

  protected onKeydown(event: KeyboardEvent, index: number): void {
    const last = TABS.length - 1;
    const targets: Readonly<Record<string, number>> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const next = targets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    this.select(TABS[next].id);
    this.host.nativeElement.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus();
  }
}
