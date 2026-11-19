import { TestBed } from '@angular/core/testing';
import { Icon } from './icon';

describe('Icon', () => {
  it('renders an svg with a shape for the given name', async () => {
    const fixture = TestBed.createComponent(Icon);
    fixture.componentRef.setInput('name', 'sales');
    await fixture.whenStable();
    const svg = (fixture.nativeElement as HTMLElement).querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
    expect(svg?.querySelectorAll('path').length).toBeGreaterThan(0);
  });
});
