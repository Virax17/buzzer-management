import {
  afterNextRender,
  Component,
  type ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import { Icon } from '../icon/icon';

/** Full-size frame for an expanded section: a Back button, the title and the section content. */
@Component({
  selector: 'app-expanded-panel',
  imports: [Icon],
  templateUrl: './expanded-panel.html',
  styleUrl: './expanded-panel.scss',
  host: { '(document:keydown.escape)': 'closed.emit()' },
})
export class ExpandedPanel {
  readonly heading = input.required<string>();
  readonly subtitle = input('');
  readonly closed = output<void>();

  private readonly backButton = viewChild.required<ElementRef<HTMLButtonElement>>('backButton');

  constructor() {
    afterNextRender(() => this.backButton().nativeElement.focus());
  }
}
