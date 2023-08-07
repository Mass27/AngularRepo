import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashRoutingModule } from './dash-routing.module';
import { MaterialModule } from '../material/material.module';
import { LayoutPgComponent } from './layout-pg/layout-pg.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { BannersComponent } from './banners/banners.component';
import { OrdersComponent } from './orders/orders.component';
import { DashComponent } from './dash/dash.component';
import { ProductomodalsComponent } from './Modals/productomodals/productomodals.component';


@NgModule({
  declarations: [
    LayoutPgComponent,
    ProductsComponent,
    CustomersComponent,
    BannersComponent,
    OrdersComponent,
    DashComponent,
    ProductomodalsComponent
  ],
  imports: [
    CommonModule,
    DashRoutingModule,
    MaterialModule,

  ]
})
export class DashModule { }
