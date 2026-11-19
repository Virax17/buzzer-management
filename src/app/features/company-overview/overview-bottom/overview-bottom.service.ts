import { Service } from '@angular/core';
import { type Observable, of } from 'rxjs';
import { OVERVIEW_BOTTOM_MOCK, type OverviewBottomData } from './overview-bottom.data';
import { OVERVIEW_DETAILS_MOCK, type OverviewDetailsData } from './overview-details.data';

/** Source of the Overview bottom-half data. Returns mock data now; swap `of(...)` for HttpClient later. */
@Service()
export class OverviewBottomService {
  /** The four cards on the Overview page. */
  getOverviewBottom(): Observable<OverviewBottomData> {
    return of(OVERVIEW_BOTTOM_MOCK);
  }

  /** The larger data set behind the expanded views (history, teams, every issue). */
  getDetails(): Observable<OverviewDetailsData> {
    return of(OVERVIEW_DETAILS_MOCK);
  }
}
