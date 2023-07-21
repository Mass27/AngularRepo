// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';



@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  constructor(private router: Router) {}


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = sessionStorage.getItem('token');

    if (!token) {
      // Si no hay un token válido, redirigir al usuario a la página de inicio de sesión
      this.clearSession();
      this.router.navigate(['auth/login']);
      return false;
    }

    // Si existe un token, el usuario puede acceder a la ruta
    return true;
  }
  private clearSession(): void {
    // Limpiar caché del navegador y eliminar el token del sessionStorage
    sessionStorage.removeItem('token');
    window.localStorage.clear(); // Limpiar caché del navegador (opcional)
  }
}
