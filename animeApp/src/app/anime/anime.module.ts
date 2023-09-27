import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimeRoutingModule } from './anime-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListComponent } from './pages/list/list.component';
import { CardComponent } from './components/card/card.component';
import { TruncatePipe } from './pipe/truncate.pipe';
import { AnimeInfoComponent } from './pages/anime-info/anime-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LayoutPageComponent,
    ListComponent,
    CardComponent,
    TruncatePipe,
    AnimeInfoComponent,
    SearchboxComponent,
  ],
  imports: [
    CommonModule,
    AnimeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AnimeModule {}
