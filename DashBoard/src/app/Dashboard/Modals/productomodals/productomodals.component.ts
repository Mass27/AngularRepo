import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-productomodals',
  templateUrl: './productomodals.component.html',
  styleUrls: ['./productomodals.component.css']
})
export class ProductomodalsComponent {
constructor( private modalActual:MatDialogRef<ProductomodalsComponent>,){}
}
