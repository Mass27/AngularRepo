import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html'
})
export class LayoutMainComponent {
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
}
