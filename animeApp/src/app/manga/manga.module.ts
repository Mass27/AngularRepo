import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MangaRoutingRoutingModule } from './manga-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListComponent } from './pages/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CardComponent } from './components/card/card.component';
import { InfoMangaComponent } from './pages/info-manga/info-manga.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    ListComponent,
    CardComponent,
    InfoMangaComponent,
    SearchBoxComponent

  ],
  imports: [
    CommonModule,
    MangaRoutingRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule


  ]
})
export class MangaModule { }
