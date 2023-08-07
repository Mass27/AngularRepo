import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPgComponent } from './layout-pg/layout-pg.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { BannersComponent } from './banners/banners.component';
import { OrdersComponent } from './orders/orders.component';
import { DashComponent } from './dash/dash.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPgComponent,
    children: [
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path: 'banner',
        component: BannersComponent,
      },
      {
path:'orders',
component:OrdersComponent

      },{
path:'dash',
component:DashComponent
      },
      { path: '**', redirectTo: 'products' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashRoutingModule {}
