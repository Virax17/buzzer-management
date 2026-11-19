import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TopBar } from './top-bar';

describe('TopBar', () => {
  it('renders', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(TopBar);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Buzzer Intelligence');
  });
});
