import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { EmpleadoList } from '../../interfaces/empleados.interface';
import { DatumDirec, Direccion } from '../../interfaces/direccion.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit{

  direcciones: DatumDirec[] = [];
  empleados: EmpleadoList[] = [];

constructor(  private empleadoService:EmpleadosService ){}


ngOnInit(): void {


  this.empleadoService.getAllEmpleados().subscribe(empleado => {
    console.log(empleado); // Verifica que la respuesta sea un array de empleados
    this.empleados = empleado;
  });

  this.empleadoService.getDireccion().subscribe(direcciones => {
    this.direcciones = direcciones.data;
  });

}
obtenerDireccion(idDireccion: number): DatumDirec | undefined {
  return this.direcciones.find(d => d.id === idDireccion);
}
}
