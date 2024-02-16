import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const isLoggedIn = this.isLoggedIn(); // Aquí deberías implementar la lógica para verificar si el usuario está autenticado

      if (isLoggedIn) {
        return true; // Si el usuario está autenticado, permite el acceso
      } else {
        this.router.navigate(['/auth/login']); // Si el usuario no está autenticado, redirige a la página de inicio de sesión
        return false;
      }
  }

  private isLoggedIn(): boolean {
    // Aquí deberías implementar la lógica para verificar si el usuario está autenticado
    // Por ejemplo, podrías usar localStorage, sessionStorage, o un servicio de autenticación para verificar el estado de autenticación del usuario

      return localStorage.getItem('username')!== null;

  }
}
