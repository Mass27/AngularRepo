import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { EmpleadoList } from '../../interfaces/empleados.interface';
import { DatumDirec, Direccion } from '../../interfaces/direccion.interface';
import { DatumCargos } from '../../interfaces/cargos.interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit{
   cargos:DatumCargos[]=[];
  direcciones: DatumDirec[] = [];
  empleados: EmpleadoList[] = [];
  isAdmin: boolean = false;
constructor(  private empleadoService:EmpleadosService ,
  private http: HttpClient){}


ngOnInit(): void {

  const usuarioLogin = sessionStorage.getItem('usuarioLogin');
    this.isAdmin = usuarioLogin === 'Bienvenido Administrador';

    this.fetchDataWithToken();

  this.empleadoService.getAllEmpleados().subscribe(empleado => {
    console.log(empleado);
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

fetchDataWithToken(): void {
  const token = sessionStorage.getItem('token'); // Get the token from session storage
  if (token) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<any>('http://localhost:3001/api/empleados/listar', { headers })
      .subscribe(
        (data) => {
          console.log(data);
          // Process the data here and assign it to your component properties if needed
          // For example, you could set this.empleados with the received data
          this.empleados = data; // Assuming the response is an array of empleados
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  } else {
    console.error('No token found in session storage');
  }
}



}
