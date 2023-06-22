import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
@NgModule({
  declarations: [],

  exports:[

MatButtonModule,
MatInputModule,
MatSidenavModule,
MatToolbarModule,
MatIconModule,
MatFormFieldModule,
MatCardModule
  ],



})
export class MaterialModule { }
