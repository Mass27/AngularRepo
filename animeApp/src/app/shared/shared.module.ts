import { NgModule } from '@angular/core';
import { LayoutPageMainComponent } from './layout-page-main/layout-page-main.component';
import { Error404pageComponent } from './error404page/error404page.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
LayoutPageMainComponent,
Error404pageComponent,
 ],
  imports:[
RouterModule

  ],
  exports: [
LayoutPageMainComponent,
Error404pageComponent,

  ]
})
export class SharedModule { }
