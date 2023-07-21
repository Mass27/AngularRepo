import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard //implements CanActivate {
{
  constructor(private authService: AuthService, private router: Router) { }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  //   // Verificar si el usuario NO está autenticado utilizando el AuthService
  //   if (!this.authService.isAuthenticated()) {
  //     // Si el usuario NO está autenticado, permitir el acceso a la página de inicio de sesión
  //     return true;
  //   }

  //   // Si el usuario YA está autenticado, redirigir al componente principal
  //   return this.router.createUrlTree(['/main']);
  // }
}
