import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EmpleadoList } from '../interfaces/empleados.interface';
import { Cargos } from '../interfaces/cargos.interfaces';
import { Direccion } from '../interfaces/direccion.interface';
import { Contratos } from '../interfaces/contratos.intefaces';
import { EmpleadoByID } from '../interfaces/EmpleadoById.interfaces';

@Injectable({ providedIn: 'root' })
export class EmpleadosService {
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getAllEmpleados(): Observable<EmpleadoList[]> {
    return this.httpClient.get<EmpleadoList[]>(
      `${this.baseUrl}/empleados/listar`
    );
  }

  addEmpleados(empleado: EmpleadoList): Observable<EmpleadoList> {
    return this.httpClient.post<EmpleadoList>(
      `${this.baseUrl}/empleados/guardar`,
      empleado
    );
  }

  getEmpleadoById(id: string): Observable<EmpleadoByID> {
    return this.httpClient.get<EmpleadoByID>(
      `${this.baseUrl}/empleados/listarById?idempleado=${id}`
    );
  }

  updateEmpleado(empleado: EmpleadoList): Observable<EmpleadoList> {

    return this.httpClient.put<EmpleadoList>(
      `${this.baseUrl}/empleados/editar?id=${empleado.idempleado}`,
      empleado
    );
  }

  getCargos(): Observable<Cargos> {
    return this.httpClient.get<Cargos>(`${this.baseUrl}/cargos/listar`);
  }

  getDireccion(): Observable<Direccion> {
    return this.httpClient.get<Direccion>(`${this.baseUrl}/direccion/listar`);
  }

  getContratos(): Observable<Contratos> {
    return this.httpClient.get<Contratos>(`${this.baseUrl}/contratos/listar`);
  }
}
