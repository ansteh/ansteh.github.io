import { Routes } from '@angular/router';

import { StockComponent } from './stock/stock.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/stock/aapl',
    pathMatch: 'full'
  },
  {
    path: 'stock/:ticker',
    component: StockComponent
  },
  //{ path: '**', component: PageNotFoundComponent },
];
