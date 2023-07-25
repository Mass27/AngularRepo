import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { DatumDirec} from '../../interfaces/direccion.interface';
import { DatumCargos } from '../../interfaces/cargos.interfaces';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { EmpleadoList } from '../../interfaces/empleados.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  cargos: DatumCargos[] = [];
  direcciones: DatumDirec[] = [];
  empleados: EmpleadoList[] = [];
  // isAdmin: boolean = false;

  constructor(private empleadoService: EmpleadosService, private http: HttpClient) {}

  ngOnInit(): void {
    // const usuarioLogin = sessionStorage.getItem('usuarioLogin');
    // this.isAdmin = usuarioLogin === 'Bienvenido Administrador';

    // Obtener los datos usando forkJoin
    this.fetchData();
  }

  fetchData(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      // Obtener todos los datos en paralelo usando forkJoin
      forkJoin([
        this.empleadoService.getAllEmpleados(),
        this.empleadoService.getDireccion(),
        this.empleadoService.getCargos()
      ]).subscribe(
        ([empleados, direcciones, cargos]) => {
          console.log(empleados);
          this.empleados = empleados;
          this.direcciones = direcciones.data;
          this.cargos = cargos.data;
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
    } else {
      console.error('No se encontró el token en el almacenamiento de sesión');
    }
  }

  obtenerDireccion(idDireccion: number): DatumDirec | undefined {
    return this.direcciones.find(d => d.id === idDireccion);
  }

  obtenerCargo(idCargo: number): DatumCargos | undefined {
    return this.cargos.find(c => c.idcargo === idCargo);
  }
}
