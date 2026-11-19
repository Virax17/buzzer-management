import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { OVERVIEW_BOTTOM_MOCK } from '../overview-bottom.data';
import { OrganigramPreview } from './organigram-preview';

async function render() {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(OrganigramPreview);
  fixture.componentRef.setInput('data', OVERVIEW_BOTTOM_MOCK.organigram);
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe('OrganigramPreview', () => {
  it('renders the lead and every department with its headcount', async () => {
    const text = (await render()).textContent ?? '';
    expect(text).toContain('Amer Muminovic');
    expect(text).toContain('Development');
    expect(text).toContain('40');
  });

  it('sets the column count from the departments for the connector lines', async () => {
    const list = (await render()).querySelector<HTMLElement>('.departments');
    expect(list?.style.getPropertyValue('--cols')).toBe('5');
    expect(list?.querySelectorAll('li').length).toBe(5);
  });
});
