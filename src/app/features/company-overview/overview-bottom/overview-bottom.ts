import { ApplicationRef, Component, inject, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { EnginesDetails } from './engines-details/engines-details';
import { ExpandedPanel } from './expanded-panel/expanded-panel';
import { IssuesDetails } from './issues-details/issues-details';
import { IssuesHappenings } from './issues-happenings/issues-happenings';
import { OrganigramExplorer } from './organigram-explorer/organigram-explorer';
import { OrganigramPreview } from './organigram-preview/organigram-preview';
import { OverviewBottomService } from './overview-bottom.service';
import { Q4Details } from './q4-details/q4-details';
import { Q4Progress } from './q4-progress/q4-progress';
import { RevenueEnginesList } from './revenue-engines-list/revenue-engines-list';

export type SectionId = 'organigram' | 'q4' | 'engines' | 'issues';

const SECTIONS: readonly SectionId[] = ['organigram', 'q4', 'engines', 'issues'];

/** Document with the (not yet universal) View Transitions API. */
type TransitionDocument = Document & {
  startViewTransition?: (update: () => Promise<void>) => unknown;
};

/**
 * Overview bottom half: Organigram preview, Q4 Progress, Revenue Engines, Issues & Happenings.
 * "View" on a card grows it into a full panel (`?view=<section>` in the URL, so refresh and the
 * browser's Back button work); Back shrinks it again.
 */
@Component({
  selector: 'app-overview-bottom',
  imports: [
    OrganigramPreview,
    Q4Progress,
    RevenueEnginesList,
    IssuesHappenings,
    ExpandedPanel,
    OrganigramExplorer,
    Q4Details,
    EnginesDetails,
    IssuesDetails,
  ],
  templateUrl: './overview-bottom.html',
  styleUrl: './overview-bottom.scss',
  // Not encapsulated: the view-transition pseudo-elements live on the document, not on a component.
  encapsulation: ViewEncapsulation.None,
})
export class OverviewBottom {
  private readonly service = inject(OverviewBottomService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly appRef = inject(ApplicationRef);

  protected readonly data = toSignal(this.service.getOverviewBottom());
  protected readonly details = toSignal(this.service.getDetails());

  protected readonly view = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => SECTIONS.find((section) => section === params.get('view')) ?? null),
    ),
    { initialValue: null },
  );

  /** Open a section (or `null` to go back to the overview), with a morph animation if supported. */
  protected open(view: SectionId | null): void {
    const update = async (): Promise<void> => {
      await this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { view },
        queryParamsHandling: 'merge',
      });
      this.appRef.tick();
    };
    const doc: TransitionDocument = document;
    const reduced =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (doc.startViewTransition && !reduced) doc.startViewTransition(update);
    else void update();
  }
}
