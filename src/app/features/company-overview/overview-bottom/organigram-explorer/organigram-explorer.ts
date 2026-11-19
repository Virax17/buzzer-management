import { Component, computed, input, signal } from '@angular/core';
import { Icon, type IconName } from '../icon/icon';
import { type OrganigramPreviewData } from '../overview-bottom.data';
import { type OrgTeam } from '../overview-details.data';

interface Child {
  readonly id: string;
  readonly name: string;
  readonly note: string;
  readonly headcount: number;
  readonly icon: IconName | null;
}

/** Org chart you can walk: click a department to zoom into its teams, with animated connectors. */
@Component({
  selector: 'app-organigram-explorer',
  imports: [Icon],
  templateUrl: './organigram-explorer.html',
  styleUrl: './organigram-explorer.scss',
})
export class OrganigramExplorer {
  readonly data = input.required<OrganigramPreviewData>();
  readonly teams = input.required<Readonly<Record<string, readonly OrgTeam[]>>>();

  /** Id of the department being looked at, or null for the whole company. */
  protected readonly focus = signal<string | null>(null);

  protected readonly focusedDepartment = computed(() =>
    this.data().departments.find((d) => d.id === this.focus()),
  );

  protected readonly node = computed(() => {
    const dept = this.focusedDepartment();
    const lead = this.data().lead;
    return dept
      ? { name: dept.name, note: `${dept.headcount} people`, icon: dept.icon }
      : { name: lead.name, note: lead.title, icon: null };
  });

  protected readonly children = computed<readonly Child[]>(() => {
    const dept = this.focusedDepartment();
    if (!dept) {
      return this.data().departments.map((d) => ({
        id: d.id,
        name: d.name,
        note: 'Open team',
        headcount: d.headcount,
        icon: d.icon,
      }));
    }
    return (this.teams()[dept.id] ?? []).map((t) => ({
      id: t.id,
      name: t.name,
      note: `Lead: ${t.lead}`,
      headcount: t.headcount,
      icon: null,
    }));
  });

  protected readonly total = computed(() =>
    this.children().reduce((sum, child) => sum + child.headcount, 0),
  );

  protected open(id: string): void {
    if (this.focus() === null) this.focus.set(id);
  }

  protected up(): void {
    this.focus.set(null);
  }
}
