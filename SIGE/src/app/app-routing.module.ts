import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutMainComponent } from './Shared/layout-main/layout-main.component';

const routes: Routes = [


{
path:'empleados',
loadChildren:()=> import('./Empleados/empleados.module').then(em => em.EmpleadosModule)

},
{
path:'usuarios',
loadChildren:()=> import('./usuarios/usuarios.module').then(usu => usu.UsuariosModule)

},{
path:'main',
component:LayoutMainComponent

},
{
  path:'',
  redirectTo:'main',
  pathMatch:'full'
}






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
