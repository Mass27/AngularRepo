import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {



  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Location', icon: 'add', url: './location' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ]

}
