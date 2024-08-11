import { Routes } from '@angular/router';

export const FeaturesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./auth/auth.route').then((m) => m.AuthRoute),
      },
      {
        path: '',
        loadChildren: () => import('./flea-market/fleamarket.route').then((m) => m.FleamarketRoute),
      },
      {
        path: '',
        loadChildren: () => import('./contact/contact.route').then((m) => m.ContactRoute),
      }
    ],
  },
];
