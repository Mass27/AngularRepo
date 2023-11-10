import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListComponent } from './pages/list/list.component';
import { AnimeInfoComponent } from './pages/anime-info/anime-info.component';

const routes: Routes = [

{
  path:'',
  component:LayoutPageComponent,
  children:[
    {
      path: 'list/:page',
      component: ListComponent
    },{
      path:':id',
      component:AnimeInfoComponent
    },
    { path: '**', redirectTo: 'list/1' },
  ]
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimeRoutingModule { }
