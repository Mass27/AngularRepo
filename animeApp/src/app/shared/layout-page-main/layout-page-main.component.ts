import { Component } from '@angular/core';

@Component({
  selector: 'layout-page-main',
  templateUrl: './layout-page-main.component.html',
  styleUrls: ['./layout-page-main.component.css']
})
export class LayoutPageMainComponent {
  isMenuOpen: boolean = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
