import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingRoutingModule } from './auth-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [
LayoutPageComponent,
LoginComponent

  ],
  imports: [
    CommonModule,
    AuthRoutingRoutingModule
  ]
})
export class AuthModule { }
