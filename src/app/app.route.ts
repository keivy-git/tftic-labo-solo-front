import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    // children: [
    //   // {
    //   //   path: ' ',
    //   //   loadChildren: () =>
    //   //     import('./features/features.route').then((m) => m.routes),
    //   // },
    //   {
    //     // path: '',
    //     // component: HomeComponent,
    //   },
    // ],
  },
];
