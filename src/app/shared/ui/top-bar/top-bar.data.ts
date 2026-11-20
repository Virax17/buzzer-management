import { type ThemeChoice } from './theme';

/** Static sample data for the top bar (no backend in this task). */

export interface NavItem {
  readonly label: string;
  readonly path: string;
}

export interface TopBarData {
  readonly appName: string;
  readonly nav: readonly NavItem[];
  readonly dateRange: string;
  readonly unreadNotifications: number;
  readonly userName: string;
}

// Organigram and Departments have no page yet: their routes fall back to Overview.
export const TOP_BAR_DATA: TopBarData = {
  appName: 'Buzzer Intelligence',
  nav: [
    { label: 'Overview', path: '/overview' },
    { label: 'Organigram', path: '/organigram' },
    { label: 'Departments', path: '/departments' },
    { label: 'Revenue Engines', path: '/revenue-engines' },
  ],
  dateRange: 'Nov 1 – Nov 30, 2026',
  unreadNotifications: 1,
  userName: 'Vinay Patil',
};

export interface ThemeOption {
  readonly id: ThemeChoice;
  readonly label: string;
}

export const THEME_OPTIONS: readonly ThemeOption[] = [
  { id: 'light', label: 'Light mode' },
  { id: 'dark', label: 'Dark mode' },
  { id: 'system', label: 'Match system' },
];
