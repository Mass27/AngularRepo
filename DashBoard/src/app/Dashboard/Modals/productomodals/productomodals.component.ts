import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product.interfaces';
import { DashService } from '../../services/dash.service';

@Component({
  selector: 'app-productomodals',
  templateUrl: './productomodals.component.html',
  styleUrls: ['./productomodals.component.css']
})
export class ProductomodalsComponent {
  productForm: FormGroup;
  productToUpdate: Product | null;

  constructor(
    private modalActual: MatDialogRef<ProductomodalsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productToUpdate: Product | null },
    private fb: FormBuilder,
    private dashService: DashService
  ) {
    this.productToUpdate = data.productToUpdate;

    this.productForm = this.fb.group({
      id: [this.productToUpdate?.id || null],
      name: [this.productToUpdate?.name || '', Validators.required],
      description: [this.productToUpdate?.description || '', Validators.required],
      price: [this.productToUpdate?.price || '', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      image: [this.productToUpdate?.image || '', Validators.required],
      category_id: [this.productToUpdate?.category_id || 0, Validators.required]
    });
  }

  guardarCambios(): void {
    if (this.productForm.valid) {
      const productoActualizado: Product = this.productForm.value;

      if (this.productToUpdate) {
        this.dashService.updateProduct(productoActualizado).subscribe(
          (product) => {
            this.modalActual.close(product);
          },
          (error) => {
            console.error('Error al actualizar el producto:', error);
          }
        );
      } else {
        this.dashService.addProduct(productoActualizado).subscribe(
          (product) => {
            this.modalActual.close(product);
          },
          (error) => {
            console.error('Error al agregar el producto:', error);
          }
        );
      }
    }
  }

  cerrarModal(): void {
    this.modalActual.close();
  }
}
