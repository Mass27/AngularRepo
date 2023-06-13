import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuVisible = false;

  public sidebarItems = [
    { label: 'inicio', url: '/inicio' },
    { label: 'Teleturismo', url: '/teleturismo' },
    { label: 'Municipalidad', url: '/municipalidad' },
    { label: 'PMDM', url: '/PMDM' },
    { label: 'Gobierno Digital', url: '/gbd' },
    { label: 'Transparencia', url: '/transparencia' },
    { label: 'Noticias', url: '/news' },
    { label: 'Contactanos', url: '/contactanos' },
  ]



constructor(){}
toggleMenu() {
  this.menuVisible = !this.menuVisible;
}

img(){

  return 'assets/logos/LogoMSPSBlack.png';
}
}
