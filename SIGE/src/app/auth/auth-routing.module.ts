import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutLoginComponent } from './pages/layout-login/layout-login.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [


  {
    path:'',
    component:LayoutLoginComponent,
    children:[
      { path: 'login', component: LoginComponent},
      { path: '**', redirectTo: 'login' },
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
