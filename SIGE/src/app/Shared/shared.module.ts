import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutMainComponent } from './layout-main/layout-main.component';
import { RouterModule } from '@angular/router';
import { SearchboxComponent } from '../Empleados/components/searchbox/searchbox.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LayoutMainComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],exports:[

    LayoutMainComponent
  ]
})
export class SharedModule { }
