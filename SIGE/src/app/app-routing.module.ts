import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutMainComponent } from './Shared/layout-main/layout-main.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'empleados',
    loadChildren: () =>
      import('./Empleados/empleados.module').then((em) => em.EmpleadosModule),
      canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./usuarios/usuarios.module').then((usu) => usu.UsuariosModule),
      // canActivate: [AuthGuard]
  },
  {
    path: 'main',
    component: LayoutMainComponent,
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
