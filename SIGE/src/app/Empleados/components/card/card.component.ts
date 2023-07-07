import { Component, Input } from '@angular/core';
import { EmpleadoList } from '../../interfaces/empleados.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent {


@Input()  empleados?:EmpleadoList;


}
