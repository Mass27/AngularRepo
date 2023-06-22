import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CardComponent } from './components/card/card.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';




@NgModule({
  declarations: [
    AppComponent,
SidebarComponent,
CardComponent,
SearchBoxComponent,
LayoutPageComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
