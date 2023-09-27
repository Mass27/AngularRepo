import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductomodalsComponent } from '../Modals/productomodals/productomodals.component';
import { DashService } from '../services/dash.service';
import { Product } from '../interfaces/product.interfaces';
import { ConfirmDialogComponent } from '../Modals/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private dialog: MatDialog, private dashService: DashService) { }

  ngOnInit(): void {
    this.actualizarListaProductos();
  }

  private actualizarListaProductos(): void {
    this.dashService.getProducts().subscribe(products => this.products = products);
  }

  nuevoProducto(): void {
    const dialogRef = this.dialog.open(ProductomodalsComponent, {
      disableClose: true,
      data: { productToUpdate: null }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.actualizarListaProductos();
    });
  }

  editarProducto(product: Product): void {
    const dialogRef = this.dialog.open(ProductomodalsComponent, {
      disableClose: true,
      data: { productToUpdate: product }
    });

    dialogRef.afterClosed().subscribe((editedProduct: Product | undefined) => {
      if (editedProduct) {
        const index = this.products.findIndex(p => p.Id === editedProduct.Id);
        if (index !== -1) {
          this.products[index] = editedProduct;
        }
      }
    });
  }


eliminarProducto(product: Product): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '400px',
    data: {
      title: 'Eliminar Producto',
      message: `¿Estás seguro de que quieres eliminar ${product.Name}?`
    }
  });

  dialogRef.afterClosed().subscribe((result: boolean) => {
    if (result) {
      this.dashService.deleteProduct(product.Id).subscribe(
        () => {
          // Eliminación exitosa, actualiza la lista de productos
          this.products = this.products.filter(p => p.Id !== product.Id);
        },
        (error) => {
          console.error('Error al eliminar el producto:', error);
        }
      );
    }
  });
}

}

