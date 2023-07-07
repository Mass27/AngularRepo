import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListComponent } from './pages/list/list.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SharedModule } from '../Shared/shared.module';
import { EmpleadoPageComponent } from './pages/empleado-page/empleado-page.component';
import { AgregarCargosComponent } from './pages/agregar-cargos/agregar-cargos.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ListComponent,
    AgregarComponent,
    CardComponent,
    SearchBoxComponent,
    EmpleadoPageComponent,
    AgregarCargosComponent
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class EmpleadosModule { }
