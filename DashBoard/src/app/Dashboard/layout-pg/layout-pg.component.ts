import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-pg',
  templateUrl: './layout-pg.component.html',
  styleUrls: ['./layout-pg.component.css'],
})
export class LayoutPgComponent {
  public sidebarItems = [
    { label: 'Dashboard', icon: 'home', url: './dash' },
    { label: 'Productos', icon: 'inventory', url: './products' },
    { label: 'Banners', icon: 'label', url: './banner' },
    { label: 'Customers', icon: 'person', url: './customers' },
    { label: 'Orders', icon: 'shop', url: './orders' },
  ];

  constructor() {}

  cerrarSesion() {}
}
