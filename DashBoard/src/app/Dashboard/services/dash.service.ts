import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interfaces';

@Injectable({
  providedIn: 'root',
})
export class DashService {
  private baseUrl: string = environment.apiUrl;
  private headersList = new HttpHeaders({
    Accept: '*/*',
    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  // CRUD DE PRODUCTS
  // TODO:CMABIAR URL DE POST A products/store
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    const bodyContent = JSON.stringify(product);
    return this.http.post<Product>(`${this.baseUrl}/products`, bodyContent, {
      headers: this.headersList,
    });
  }

  updateProduct(product: Product): Observable<Product> {
    const bodyContent = JSON.stringify(product);
    return this.http.put<Product>(
      `${this.baseUrl}/products/${product.Id}`,
      bodyContent,
      { headers: this.headersList }
    );
  }
  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/products/${productId}`);
  }
}
