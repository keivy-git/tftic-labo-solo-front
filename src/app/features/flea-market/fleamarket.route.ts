import { Routes } from '@angular/router';
import { FleaMarketComponent } from './flea-market.component';
import { AddFleamarketComponent } from './components/add-fleamarket/add-fleamarket.component';

export const FleamarketRoute: Routes = [
  {
    path: 'fleamarkets',
    component: FleaMarketComponent,
  },
  {
    path: 'add-fleamarkets',
    component: AddFleamarketComponent,
  },
];
