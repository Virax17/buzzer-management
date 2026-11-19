const DAY_FORMAT = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' });

/** "2026-11-05" becomes "Nov 5". An unknown day gives an empty string. */
export function formatDay(iso: string | undefined): string {
  return iso ? DAY_FORMAT.format(new Date(`${iso}T00:00:00`)) : '';
}
