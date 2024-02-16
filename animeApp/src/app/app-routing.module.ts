import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404pageComponent } from './shared/error404page/error404page.component';
import { LayoutPageMainComponent } from './shared/layout-page-main/layout-page-main.component';
import { LoginGuard } from './auth/guards/login.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((au) => au.AuthModule),
    // ,canActivate:[LoginGuard]
  },
  {
    path: 'anime',
    loadChildren: () =>
      import('./anime/anime.module').then((a) => a.AnimeModule),
    canActivate: [LoginGuard],
  },

  {
    path: 'manga',
    loadChildren: () =>
      import('./manga/manga.module').then((m) => m.MangaModule),
    canActivate: [LoginGuard],
  },
  {
    path: '404',
    component: Error404pageComponent,
  },
  {
    path: 'layout',
    component: LayoutPageMainComponent,
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
