import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeleturismoComponent } from './pages/teleturismo/teleturismo.component';
import { MunicipalidadComponent } from './pages/municipalidad/municipalidad.component';
import { PmdmComponent } from './pages/pmdm/pmdm.component';
import { GbdComponent } from './pages/gbd/gbd.component';
import { TransparenciaComponent } from './pages/transparencia/transparencia.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { InicioComponent } from './pages/inicio/inicio.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from './pages/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    TeleturismoComponent,
    MunicipalidadComponent,
    PmdmComponent,
    GbdComponent,
    TransparenciaComponent,
    NoticiasComponent,
    ContactanosComponent,
    NavbarComponent,
    InicioComponent,
    CarruselComponent,
    FooterComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AppRoutingModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule,
    RouterLink


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
