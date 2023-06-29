import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MangaRoutingRoutingModule } from './manga-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListComponent } from './pages/list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CardComponent } from './components/card/card.component';
import { InfoMangaComponent } from './pages/info-manga/info-manga.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    ListComponent,
    CardComponent,
    InfoMangaComponent

  ],
  imports: [
    CommonModule,
    MangaRoutingRoutingModule,
    ReactiveFormsModule,
    SharedModule


  ]
})
export class MangaModule { }
