import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { TeleturismoComponent } from './pages/teleturismo/teleturismo.component';
import { MunicipalidadComponent } from './pages/municipalidad/municipalidad.component';
import { PmdmComponent } from './pages/pmdm/pmdm.component';
import { GbdComponent } from './pages/gbd/gbd.component';
import { TransparenciaComponent } from './pages/transparencia/transparencia.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';


const routes: Routes = [


{
path:'',
component:InicioComponent
},
{
path:'inicio',
component:InicioComponent
},
{
path:'teleturismo',
component:TeleturismoComponent
},
{
path:'municipalidad',
component:MunicipalidadComponent
},
{
path:'PMDM',
component:PmdmComponent
},
{
path:'gbd',
component:GbdComponent
},
{
path:'transparencia',
component:TransparenciaComponent
},
{
path:'news',
component:NoticiasComponent
},
{

  path:'contactanos',
  component:ContactanosComponent
}
,
{
    path: '**',
    redirectTo: 'inicio',
  }





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
