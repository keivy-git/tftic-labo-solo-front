import { Routes } from '@angular/router';

export const AppRoute: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: '',
        loadChildren: () =>
          import('./features/features.route').then((m) => m.FeaturesRoutes),
      },
    ],
  },
];
