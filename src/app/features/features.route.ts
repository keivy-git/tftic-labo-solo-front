import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./auth/auth.route').then((m) => m.routes),
      },
    ],
  },
];
