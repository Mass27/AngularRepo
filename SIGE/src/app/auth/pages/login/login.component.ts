import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Authten } from '../../interfaces/auth-auten.interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    if (this.isUserLoggedIn()) {
      this.router.navigate(['/empleados']);
    }
  }
  onSubmit() {
    if (!this.username || !this.password) {
      console.log('Por favor, ingresa un nombre de usuario y una contraseña.');
      return;
    }
    const headersList = new HttpHeaders({
      'Accept': '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
      'Content-Type': 'application/json'
    });

    const bodyContent = JSON.stringify({
      "usuariologin": this.username,
      "contrasenalogin": this.password
    });

    this.http.post<Authten>('http://localhost:3001/api/autenticacion/iniciosesion', bodyContent, { headers: headersList })
  .subscribe(
    response => {
      // Procesar la respuesta de la API aquí
      console.log(response);
      if (response.data && response.data.token) {
        sessionStorage.setItem('token', response.data.token);

        if (response.data.login && response.data.login.usuariologin) {
          sessionStorage.setItem('usuarioLogin', response.data.login.usuariologin);
        }

        // Redirigir al usuario a la página principal después de iniciar sesión exitosamente
        this.router.navigate(['/main']);
      } else {
        console.log('Credenciales inválidas. Por favor, verifica tu usuario y contraseña.');
      }
    },
    error => {
      // Manejar errores en caso de que la solicitud falle
      console.error(error);
      console.log('Ha ocurrido un error al procesar la solicitud.');
    }
);

  }

  private isUserLoggedIn(): boolean {
    // Verificar si existe el token en el sessionStorage
    const token = sessionStorage.getItem('token');
    return !!token; // Devuelve true si el token existe, o false si no existe.
  }
}
