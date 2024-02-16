import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'layout-page-main',
  templateUrl: './layout-page-main.component.html',
  styleUrls: ['./layout-page-main.component.css']
})
export class LayoutPageMainComponent {
  isMenuOpen: boolean = false;

  constructor(private router: Router) {}
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }


  logOut():void{
    localStorage.removeItem('username');
    this.router.navigate(['/auth/login']); // Si el usuario no está autenticado, redirige a la página de inicio de sesión

  }
}
