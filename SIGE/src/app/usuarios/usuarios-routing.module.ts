import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsuariosComponent } from './pages/list-usuarios/list-usuarios.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { LayoutUsuariosComponent } from './pages/layout-usuarios/layout-usuarios.component';

const routes: Routes = [


  {
    path:'',
    component:LayoutUsuariosComponent,
    children:[
      {
        path:'list',
        component:ListUsuariosComponent
      },{
        path:'agregar',
        component:AgregarComponent
      }
      ,{
        path:'edit/:id',
        component:AgregarComponent
      },
      {
        path:'**',
        redirectTo:'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
