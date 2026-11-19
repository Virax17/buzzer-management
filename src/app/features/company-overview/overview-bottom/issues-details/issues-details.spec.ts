import { TestBed } from '@angular/core/testing';
import { OVERVIEW_DETAILS_MOCK } from '../overview-details.data';
import { IssuesDetails } from './issues-details';

describe('IssuesDetails', () => {
  async function render() {
    const fixture = TestBed.createComponent(IssuesDetails);
    fixture.componentRef.setInput('items', OVERVIEW_DETAILS_MOCK.issues);
    fixture.componentRef.setInput('days', OVERVIEW_DETAILS_MOCK.days);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const count = () => root.querySelector('.count')?.textContent?.trim();
    const chip = (label: string) =>
      [...root.querySelectorAll<HTMLButtonElement>('.tray .chip')].find(
        (c) => c.textContent?.trim() === label,
      );
    return { fixture, root, count, chip };
  }

  it('shows the first page of a long list and loads more on request', async () => {
    const { fixture, root, count } = await render();
    expect(count()).toBe('Showing 8 of 24');
    root.querySelector<HTMLButtonElement>('.more')?.click();
    await fixture.whenStable();
    expect(count()).toBe('Showing 16 of 24');
  });

  it('filters when a chip is clicked and clears again', async () => {
    const { fixture, root, count, chip } = await render();
    chip('Marketing')?.click();
    await fixture.whenStable();
    expect(count()).toBe('Showing 4 of 4');
    expect(chip('Marketing')?.getAttribute('aria-pressed')).toBe('true');
    root.querySelector<HTMLButtonElement>('.clear')?.click();
    await fixture.whenStable();
    expect(count()).toBe('Showing 8 of 24');
  });

  it('filters when a chip is dropped into the box', async () => {
    const { fixture, root, count } = await render();
    const drop = new Event('drop', { bubbles: true, cancelable: true });
    Object.defineProperty(drop, 'dataTransfer', { value: { getData: () => 'kind:risk' } });
    root.querySelector('.zone')?.dispatchEvent(drop);
    await fixture.whenStable();
    expect(count()).toBe('Showing 5 of 5');
    expect(root.querySelector('.zone')?.textContent).toContain('Risks');
  });

  it('ignores a drop that is not one of the filter chips', async () => {
    const { fixture, root, count } = await render();
    const drop = new Event('drop', { bubbles: true, cancelable: true });
    Object.defineProperty(drop, 'dataTransfer', { value: { getData: () => 'something else' } });
    root.querySelector('.zone')?.dispatchEvent(drop);
    await fixture.whenStable();
    expect(count()).toBe('Showing 8 of 24');
  });

  it('searches title, detail and owner', async () => {
    const { fixture, root, count } = await render();
    const search = root.querySelector('input[type="search"]') as HTMLInputElement;
    search.value = 'mirza';
    search.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(count()).toBe('Showing 3 of 3');
  });

  it('shows only what was logged by the chosen day, and says so when nothing matches', async () => {
    const { fixture, root, count, chip } = await render();
    const range = root.querySelector('input[type="range"]') as HTMLInputElement;
    range.value = '0';
    range.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(count()).toBe('Showing 1 of 1');
    chip('Sales')?.click();
    await fixture.whenStable();
    expect(root.textContent).toContain('Nothing matches these filters on this day.');
  });
});
