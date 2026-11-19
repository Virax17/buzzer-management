import { Service } from '@angular/core';
import { type Observable, of } from 'rxjs';
import { OVERVIEW_BOTTOM_MOCK, type OverviewBottomData } from './overview-bottom.data';

/** Source of the Overview bottom-half data. Returns mock data now; swap `of(...)` for HttpClient later. */
@Service()
export class OverviewBottomService {
  getOverviewBottom(): Observable<OverviewBottomData> {
    return of(OVERVIEW_BOTTOM_MOCK);
  }
}
