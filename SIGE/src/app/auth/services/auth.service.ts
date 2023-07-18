import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';





@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiUrl;
  private isAuthenticated: boolean = false;


  constructor(private http: HttpClient) {}


  login(username: string, password: string): void {
    this.http
      .get<any>(`http://localhost:3001/api/login/listarById?idlogin=1`)
      .subscribe(
        (response) => {
          if (response.data && response.data.length > 0) {
            // Usuario válido, establecer isAuthenticated en true.
            this.isAuthenticated = true;
          } else {
            // Usuario no válido, establecer isAuthenticated en false.
            this.isAuthenticated = false;
          }
        },
        (error) => {
          console.error('Error al verificar el usuario:', error);
          this.isAuthenticated = false;
        }
      );
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
