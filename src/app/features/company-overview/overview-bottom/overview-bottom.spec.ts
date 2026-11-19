import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { OverviewBottom } from './overview-bottom';

describe('OverviewBottom', () => {
  it('renders', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(OverviewBottom);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Overview, bottom half');
  });
});
