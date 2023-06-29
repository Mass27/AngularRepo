import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

{
  path:'my-page',
  loadChildren:() => import('./myPages/my-page.module').then( m => m.MyPageModule )
},
{
path:'auth',
loadChildren:() => import('./auth/auth-routing.module').then( a => a.AuthRoutingModule  )

}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
