import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { OverviewTop } from './overview-top';

describe('OverviewTop', () => {
  it('renders', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(OverviewTop);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Overview, top half');
  });
});
