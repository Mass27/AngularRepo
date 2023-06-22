import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { Error404Component } from './shared/error404/error404.component';

import { ListPageComponent } from './pages/list-page/list-page.component';
import { LocationComponent } from './pages/location/location.component';
import { CharacterComponent } from './pages/character/character.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ListPageComponent,
      },
      {
        path: '404',
        component: Error404Component,
      },
      {
        path: 'location',
        component: LocationComponent,
      },
      {
       path:'search',
       component:SearchComponent

      },

      {
        path: 'character/:id',
        component: CharacterComponent,
      },

      {
        path: '**',
        redirectTo: '404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
