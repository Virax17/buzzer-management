import { Component, output, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { type OrganigramPreviewData } from '../overview-bottom.data';

/** Preview of the org chart: the top person and each department with its headcount. */
@Component({
  selector: 'app-organigram-preview',
  imports: [Icon],
  templateUrl: './organigram-preview.html',
  styleUrl: './organigram-preview.scss',
})
export class OrganigramPreview {
  readonly expand = output<void>();
  readonly data = input.required<OrganigramPreviewData>();

  protected initials(name: string): string {
    return name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .slice(0, 2);
  }
}
