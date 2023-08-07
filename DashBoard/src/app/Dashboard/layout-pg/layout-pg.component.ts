import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-pg',
  templateUrl: './layout-pg.component.html',
  styleUrls: ['./layout-pg.component.css']
})
export class LayoutPgComponent {


  public sidebarItems = [
    { label: 'Dashboard', icon: 'label', url: './dash' },
    { label: 'Productos', icon: 'label', url: './products' },
    { label: 'Banners', icon: 'label', url: './banner' },
    { label: 'Customers', icon: 'label', url: './customers' },
    { label: 'Orders', icon: 'label', url: './orders' },

  ];

constructor(){
}






cerrarSesion(){}



}
