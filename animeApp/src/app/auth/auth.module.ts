import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingRoutingModule } from './auth-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from './components/register-form/register-form.component';


@NgModule({
  declarations: [
LayoutPageComponent,
LoginComponent,
RegisterComponent,
RegisterFormComponent

  ],
  imports: [
    CommonModule,
    AuthRoutingRoutingModule,
    ReactiveFormsModule,
    FormsModule,


  ]
})
export class AuthModule { }
