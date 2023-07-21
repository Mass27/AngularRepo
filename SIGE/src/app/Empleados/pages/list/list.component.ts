import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { EmpleadoList } from '../../interfaces/empleados.interface';
import { DatumDirec, Direccion } from '../../interfaces/direccion.interface';
import { DatumCargos } from '../../interfaces/cargos.interfaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit{
   cargos:DatumCargos[]=[];
  direcciones: DatumDirec[] = [];
  empleados: EmpleadoList[] = [];
  isAdmin: boolean = false;
constructor(  private empleadoService:EmpleadosService ){}


ngOnInit(): void {

  const usuarioLogin = sessionStorage.getItem('usuarioLogin');
    this.isAdmin = usuarioLogin === 'Administrador';

  this.empleadoService.getAllEmpleados().subscribe(empleado => {
    console.log(empleado); // Verifica que la respuesta sea un array de empleados
    this.empleados = empleado;
  });

  this.empleadoService.getDireccion().subscribe(direcciones => {
    this.direcciones = direcciones.data;
  });
  this.empleadoService.getCargos().subscribe(cg => {
    this.cargos = cg.data;
  });

}


obtenerDireccion(idDireccion: number): DatumDirec | undefined {
  return this.direcciones.find(d => d.id === idDireccion);
}

obtenerCargo(idCargo:number):DatumCargos | undefined{
return this.cargos.find(c => c.idcargo === idCargo)

}

}
