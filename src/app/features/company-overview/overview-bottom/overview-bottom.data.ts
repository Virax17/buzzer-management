/** Shapes and static sample data for the Overview bottom half. Totals and percentages are derived, never stored. */

export interface OrgPerson {
  readonly name: string;
  readonly title: string;
  readonly avatarUrl: string | null;
}

export interface OrgDepartment {
  readonly id: string;
  readonly name: string;
  readonly headcount: number;
}

export interface OrganigramPreviewData {
  readonly lead: OrgPerson;
  readonly departments: readonly OrgDepartment[];
}

export interface Q4Goal {
  readonly id: string;
  readonly label: string;
  /** Progress towards the goal, 0 to 100. */
  readonly progress: number;
  readonly onTrack: boolean;
}

export interface Q4ProgressData {
  readonly goals: readonly Q4Goal[];
}

export type RevenueEngineIcon = 'creator-badge' | 'buzzer-ads' | 'streaming' | 'tryouts';

export interface RevenueEngine {
  readonly id: string;
  readonly name: string;
  readonly icon: RevenueEngineIcon;
  /** Revenue so far, in AED. */
  readonly revenue: number;
  /** Revenue target, in AED. */
  readonly target: number;
}

export interface RevenueEnginesData {
  readonly currency: string;
  readonly engines: readonly RevenueEngine[];
}

export type IssueKind = 'issue' | 'risk' | 'missed' | 'update';

export interface HappeningItem {
  readonly id: string;
  readonly kind: IssueKind;
  readonly title: string;
  readonly detail: string;
  readonly department: string;
  readonly owner: string;
  readonly time: string;
}

export interface HappeningsData {
  readonly items: readonly HappeningItem[];
}

export interface OverviewBottomData {
  readonly organigram: OrganigramPreviewData;
  readonly q4: Q4ProgressData;
  readonly revenueEngines: RevenueEnginesData;
  readonly happenings: HappeningsData;
}

export const OVERVIEW_BOTTOM_MOCK: OverviewBottomData = {
  organigram: {
    lead: { name: 'Amer Muminovic', title: 'CEO', avatarUrl: null },
    departments: [
      { id: 'sales', name: 'Sales', headcount: 24 },
      { id: 'marketing', name: 'Marketing', headcount: 18 },
      { id: 'product', name: 'Product', headcount: 32 },
      { id: 'development', name: 'Development', headcount: 40 },
      { id: 'operations', name: 'Operations', headcount: 16 },
    ],
  },
  q4: {
    goals: [
      { id: 'revenue', label: 'AED 800K revenue', progress: 37.5, onTrack: true },
      { id: 'product-module', label: 'Launch new product module', progress: 100, onTrack: true },
      { id: 'active-users', label: 'Grow active users to 1.5M', progress: 78, onTrack: true },
      {
        id: 'partnerships',
        label: 'Secure 2 strategic partnerships',
        progress: 52,
        onTrack: false,
      },
      { id: 'health', label: 'Maintain company health ≥ 85%', progress: 82, onTrack: false },
    ],
  },
  revenueEngines: {
    currency: 'AED',
    engines: [
      {
        id: 'creator-badge',
        name: 'Creator Badge',
        icon: 'creator-badge',
        revenue: 300_000,
        target: 600_000,
      },
      {
        id: 'buzzer-ads',
        name: 'Buzzer Ads',
        icon: 'buzzer-ads',
        revenue: 1_200_000,
        target: 2_000_000,
      },
      { id: 'streaming', name: 'Streaming', icon: 'streaming', revenue: 180_000, target: 400_000 },
      { id: 'tryouts', name: 'Tryouts', icon: 'tryouts', revenue: 60_000, target: 200_000 },
    ],
  },
  happenings: {
    items: [
      {
        id: 'h1',
        kind: 'issue',
        title: 'Daily target missed',
        detail: '(AED 40K of AED 50K, 80%)',
        department: 'Sales',
        owner: 'Amir Muratovic',
        time: 'Today, 10:24',
      },
      {
        id: 'h2',
        kind: 'risk',
        title: 'Marketing at risk',
        detail: 'Q4 campaign is 2 days behind schedule',
        department: 'Marketing',
        owner: 'Amina Selim',
        time: 'Today, 09:17',
      },
      {
        id: 'h3',
        kind: 'missed',
        title: 'Report not submitted',
        detail: 'Weekly delivery report (Product)',
        department: 'Product',
        owner: 'Denis Gojak',
        time: 'Today, 18:42',
      },
      {
        id: 'h4',
        kind: 'update',
        title: 'Partnership closed',
        detail: 'New partnership with Al Habtoor Group (est. AED 600K)',
        department: 'Business Dev',
        owner: 'Faruk Cicic',
        time: 'Yesterday, 16:20',
      },
      {
        id: 'h5',
        kind: 'update',
        title: 'Streaming revenue up',
        detail: '+25% vs. last week (AED 180K total)',
        department: 'Revenue Engines',
        owner: 'Asja Kantardzic',
        time: 'Yesterday, 14:05',
      },
    ],
  },
};
