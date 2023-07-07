import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListUsuariosComponent } from './pages/list-usuarios/list-usuarios.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { SharedModule } from '../Shared/shared.module';
import { LayoutUsuariosComponent } from './pages/layout-usuarios/layout-usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListUsuariosComponent,
    AgregarComponent,
    LayoutUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class UsuariosModule { }
