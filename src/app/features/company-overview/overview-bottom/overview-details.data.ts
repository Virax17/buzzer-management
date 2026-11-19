import { type IconName } from './icon/icon';
import { type HappeningItem, type IssueKind, OVERVIEW_BOTTOM_MOCK } from './overview-bottom.data';

/** Larger sample data for the expanded views: history per day, teams and a long issues list. */

export interface OrgTeam {
  readonly id: string;
  readonly name: string;
  readonly lead: string;
  readonly headcount: number;
}

export interface OverviewDetailsData {
  /** One ISO date per day of history, oldest first. */
  readonly days: readonly string[];
  /** Goal progress (0 to 100) per day, by goal id. Last value is today. */
  readonly goalHistory: Readonly<Record<string, readonly number[]>>;
  /** Cumulative revenue (AED) per day, by engine id. Last value is today. */
  readonly engineHistory: Readonly<Record<string, readonly number[]>>;
  /** Teams by department id. Their headcounts add up to the department headcount. */
  readonly teams: Readonly<Record<string, readonly OrgTeam[]>>;
  /** Every issue, risk, missed item and update, newest first. */
  readonly issues: readonly HappeningItem[];
}

const DAY_COUNT = 19;

const DAYS: readonly string[] = Array.from(
  { length: DAY_COUNT },
  (_, i) => `2026-11-${String(i + 1).padStart(2, '0')}`,
);

/** A rising series that ends exactly on `end`, with uneven daily gains (the same every time). */
function cumulative(end: number, seed: number, decimals: number): readonly number[] {
  const weights = DAYS.map((_, i) => 1 + 0.6 * Math.sin((i + 1) * seed));
  const total = weights.reduce((sum, w) => sum + w, 0);
  const factor = 10 ** decimals;
  let run = 0;
  return weights.map((w) => {
    run += w;
    return Math.round((run / total) * end * factor) / factor;
  });
}

type IssueRow = readonly [
  day: number,
  time: string,
  kind: IssueKind,
  title: string,
  detail: string,
  department: string,
  owner: string,
];

const DEPARTMENT_ICONS: Readonly<Record<string, IconName>> = {
  Sales: 'sales',
  Marketing: 'marketing',
  Product: 'product',
  Development: 'development',
  Operations: 'operations',
  'Business Dev': 'business',
  'Revenue Engines': 'revenue',
};

const EARLIER_ROWS: readonly IssueRow[] = [
  [
    1,
    '09:05',
    'update',
    'Q4 kickoff done',
    'All departments aligned on Q4 goals',
    'Operations',
    'Denis Gojak',
  ],
  [
    2,
    '11:40',
    'risk',
    'Ad budget overspend',
    'Buzzer Ads at 92% of the weekly budget',
    'Marketing',
    'Amina Selim',
  ],
  [
    2,
    '15:20',
    'issue',
    'Checkout error spike',
    '3% failed payments for 2 hours',
    'Development',
    'Mirza Hodzic',
  ],
  [
    3,
    '10:10',
    'update',
    'Creator Badge beta live',
    'First 40 creators onboarded',
    'Revenue Engines',
    'Asja Kantardzic',
  ],
  [
    4,
    '14:30',
    'missed',
    'Daily report not submitted',
    'Sales daily report (Nov 4)',
    'Sales',
    'Amir Muratovic',
  ],
  [
    5,
    '09:45',
    'update',
    'New hires started',
    '2 engineers joined Development',
    'Development',
    'Lejla Basic',
  ],
  [
    6,
    '16:00',
    'risk',
    'Streaming below target',
    'Revenue 20% behind plan',
    'Revenue Engines',
    'Asja Kantardzic',
  ],
  [
    7,
    '12:15',
    'issue',
    'Tryouts signup failing',
    'Form error on mobile Safari',
    'Product',
    'Denis Gojak',
  ],
  [
    8,
    '10:50',
    'update',
    'Product module on schedule',
    'Launch checklist 70% done',
    'Product',
    'Denis Gojak',
  ],
  [
    9,
    '13:25',
    'missed',
    'Weekly report late',
    'Marketing weekly report overdue',
    'Marketing',
    'Amina Selim',
  ],
  [
    10,
    '09:30',
    'update',
    'Partnership call held',
    'Second meeting with Al Habtoor Group',
    'Business Dev',
    'Faruk Cicic',
  ],
  [
    11,
    '17:10',
    'risk',
    'Support backlog growing',
    '120 open tickets, up 30% in a week',
    'Operations',
    'Kemal Dizdar',
  ],
  [
    12,
    '11:05',
    'issue',
    'Dashboard slow to load',
    'Overview takes 6 seconds',
    'Development',
    'Mirza Hodzic',
  ],
  [
    13,
    '15:45',
    'update',
    'Ad campaign launched',
    'Autumn campaign live on 3 channels',
    'Marketing',
    'Amina Selim',
  ],
  [
    14,
    '10:20',
    'missed',
    'Daily target missed',
    'AED 32K of AED 50K (64%)',
    'Sales',
    'Amir Muratovic',
  ],
  [
    15,
    '14:00',
    'risk',
    'Contract renewal at risk',
    'Key partner silent for 10 days',
    'Business Dev',
    'Faruk Cicic',
  ],
  [
    16,
    '09:55',
    'update',
    'Tryouts fix shipped',
    'Mobile signup works again',
    'Product',
    'Denis Gojak',
  ],
  [
    17,
    '12:40',
    'issue',
    'Data sync delay',
    'Revenue numbers 4 hours behind',
    'Development',
    'Mirza Hodzic',
  ],
  [
    18,
    '16:35',
    'update',
    'Hiring plan approved',
    '6 open roles for Q1',
    'Operations',
    'Kemal Dizdar',
  ],
];

function toItem(row: IssueRow, index: number): HappeningItem {
  const [day, time, kind, title, detail, department, owner] = row;
  const month = 'Nov';
  return {
    id: `e${index + 1}`,
    kind,
    title,
    detail,
    department,
    departmentIcon: DEPARTMENT_ICONS[department] ?? 'revenue',
    owner,
    time: `${month} ${day}, ${time}`,
    date: DAYS[day - 1] ?? '',
  };
}

export const OVERVIEW_DETAILS_MOCK: OverviewDetailsData = {
  days: DAYS,
  goalHistory: {
    revenue: cumulative(37.5, 1.3, 1),
    'product-module': cumulative(100, 0.9, 1),
    'active-users': cumulative(78, 1.7, 1),
    partnerships: cumulative(52, 2.1, 1),
    health: cumulative(82, 1.1, 1),
  },
  engineHistory: {
    'creator-badge': cumulative(300_000, 1.4, 0),
    'buzzer-ads': cumulative(1_200_000, 0.8, 0),
    streaming: cumulative(180_000, 1.9, 0),
    tryouts: cumulative(60_000, 2.3, 0),
  },
  teams: {
    sales: [
      { id: 'inbound', name: 'Inbound', lead: 'Amir Muratovic', headcount: 10 },
      { id: 'outbound', name: 'Outbound', lead: 'Sara Kovac', headcount: 8 },
      { id: 'partnerships', name: 'Partnerships', lead: 'Faruk Cicic', headcount: 6 },
    ],
    marketing: [
      { id: 'brand', name: 'Brand', lead: 'Amina Selim', headcount: 6 },
      { id: 'growth', name: 'Growth', lead: 'Tarik Begic', headcount: 7 },
      { id: 'content', name: 'Content', lead: 'Maja Colic', headcount: 5 },
    ],
    product: [
      { id: 'design', name: 'Design', lead: 'Ilma Hadzic', headcount: 9 },
      { id: 'pm', name: 'Product Management', lead: 'Denis Gojak', headcount: 8 },
      { id: 'research', name: 'Research', lead: 'Nina Terzic', headcount: 5 },
      { id: 'qa', name: 'Quality', lead: 'Emir Softic', headcount: 10 },
    ],
    development: [
      { id: 'frontend', name: 'Frontend', lead: 'Lejla Basic', headcount: 14 },
      { id: 'backend', name: 'Backend', lead: 'Mirza Hodzic', headcount: 16 },
      { id: 'mobile', name: 'Mobile', lead: 'Adnan Rizvic', headcount: 10 },
    ],
    operations: [
      { id: 'finance', name: 'Finance', lead: 'Kemal Dizdar', headcount: 5 },
      { id: 'people', name: 'People', lead: 'Selma Ahmic', headcount: 4 },
      { id: 'support', name: 'Support', lead: 'Haris Mulic', headcount: 7 },
    ],
  },
  issues: [...OVERVIEW_BOTTOM_MOCK.happenings.items, ...EARLIER_ROWS.map(toItem)].sort((a, b) =>
    b.date.localeCompare(a.date),
  ),
};
