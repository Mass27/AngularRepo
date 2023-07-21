import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListComponent } from './pages/list/list.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { SharedModule } from '../Shared/shared.module';
import { EmpleadoPageComponent } from './pages/empleado-page/empleado-page.component';
import { AgregarCargosComponent } from './pages/agregar-cargos/agregar-cargos.component';
import { AggDireccionesComponent } from './pages/agg-direcciones/agg-direcciones.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchboxComponent } from './components/searchbox/searchbox.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ListComponent,
    AgregarComponent,
    CardComponent,
    EmpleadoPageComponent,
    AgregarCargosComponent,
    AggDireccionesComponent,
    SearchboxComponent
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
  ]
})
export class EmpleadosModule { }
