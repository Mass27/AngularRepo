import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { Error404Component } from './shared/error404/error404.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { CardComponent } from './components/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationComponent } from './pages/location/location.component';
import { CharacterComponent } from './pages/character/character.component';
import { SearchComponent } from './pages/search/search.component';
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { ModalComponent } from './components/modal/modal.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    AppComponent,
    LayoutPageComponent,
    Error404Component,
    ListPageComponent,
    CardComponent,
    LocationComponent,
    CharacterComponent,
    SearchComponent,
    SearchboxComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
