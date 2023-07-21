import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-header.css']
})
export class LayoutMainComponent implements OnInit{
  isAdmin: boolean = false;

  constructor(  private router: Router){}
  isMenuOpen: boolean = false;
  listadoMenuOpen = false;
  agregarMenuOpen: boolean = false;
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  toggleListadoMenu(): void {
    this.listadoMenuOpen = !this.listadoMenuOpen;
  }
  toggleAgregarMenu() {
    this.agregarMenuOpen = !this.agregarMenuOpen;
  }
  logout() {
    // Eliminar el token del localStorage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuarioLogin');
    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/auth']);
  }

  ngOnInit(): void {
    const usuarioLogin = sessionStorage.getItem('usuarioLogin');
    this.isAdmin = usuarioLogin === 'Administrador';
  }
}
