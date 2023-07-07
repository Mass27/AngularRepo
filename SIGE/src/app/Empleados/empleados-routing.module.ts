import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListComponent } from './pages/list/list.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { EmpleadoPageComponent } from './pages/empleado-page/empleado-page.component';
import { AgregarCargosComponent } from './pages/agregar-cargos/agregar-cargos.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'agregar',
        component: AgregarComponent,
      },{
        path:'agregar-cargo',
        component:AgregarCargosComponent
      },
      { path: 'edit/:id',
      component: AgregarComponent },{
        path: 'list',
        component: ListComponent,
      },
      // { path: ':id',
      //  component: EmpleadoPageComponent },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadosRoutingModule {}
