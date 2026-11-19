import { type Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  {
    path: 'overview',
    loadComponent: () => import('./features/company-overview/overview').then((m) => m.Overview),
  },
  {
    path: 'revenue-engines',
    loadComponent: () =>
      import('./features/company-overview/revenue-engines/revenue-engines').then(
        (m) => m.RevenueEngines,
      ),
  },
  { path: '**', redirectTo: 'overview' },
];
