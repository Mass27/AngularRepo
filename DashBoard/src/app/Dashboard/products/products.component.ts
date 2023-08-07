import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { ProductomodalsComponent } from '../Modals/productomodals/productomodals.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  constructor(   private dialog:MatDialog,){}




  nuevoProducto(){
     this.dialog.open(ProductomodalsComponent,{
     disableClose:true
     }).afterClosed().subscribe(resultado=>{
      // if(resultado==="true")this.obtenerProducto();
     })
  }

  aplicarFiltroTabla(event:Event){

  }

}
