import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password);
    if (this.authService.isLoggedIn()) {
      // Usuario válido, redirigir a "empleados".
      this.router.navigate(['/empleados']);
    } else {
      // Mostrar mensaje de error en el login.
      console.error('Usuario no válido');
    }
  }
}
