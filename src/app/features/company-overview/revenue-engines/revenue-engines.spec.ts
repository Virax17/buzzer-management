import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RevenueEngines } from './revenue-engines';

describe('RevenueEngines', () => {
  it('renders', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(RevenueEngines);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Revenue Engines Overview',
    );
  });
});
