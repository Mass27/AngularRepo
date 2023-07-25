import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EmpleadoList } from '../interfaces/empleados.interface';
import { Cargos, DatumCargos } from '../interfaces/cargos.interfaces';
import { DatumDirec, Direccion } from '../interfaces/direccion.interface';
import { Contratos } from '../interfaces/contratos.intefaces';
import { EmpleadoByID } from '../interfaces/EmpleadoById.interfaces';
import { Usuarios } from 'src/app/usuarios/interfaces/usuario.interfaces';
import { Gerencias } from '../interfaces/gerencias.interfaces';

@Injectable({ providedIn: 'root' })
export class EmpleadosService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getAllEmpleados(): Observable<EmpleadoList[]> {
    return this.httpClient.get<EmpleadoList[]>(`${this.baseUrl}/empleados/listar` );
  }


  addCargo(cargo:DatumCargos):Observable<DatumCargos>{
    return this.httpClient.post<DatumCargos>(`${this.baseUrl}/cargos/guardar`,
    cargo)
  }
Address(direccion:DatumDirec):Observable<DatumDirec>{
return this.httpClient.post<DatumDirec>(`${this.baseUrl}/direccion/guardar`,direccion)

}


addImg(imagen:string){
  const formData = new FormData();
  formData.append('img', imagen);

  return this.httpClient.post(`${this.baseUrl}/empleados/cargarimagen`, formData);
}


addEmpleados(empleado: EmpleadoList): Observable<EmpleadoByID> {
  return this.httpClient.post<EmpleadoByID>(
    `${this.baseUrl}/empleados/guardar`,
    empleado
  );
}

getEmpleadoById(id: number): Observable<EmpleadoByID> {
  return this.httpClient.get<EmpleadoByID>(`${this.baseUrl}/empleados/listarById?idempleado=${id}`);
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

getGerencias(): Observable<Gerencias>{

  return this.httpClient.get<Gerencias>(`${this.baseUrl}/gerencias/Listar`)
}


  getContratos(): Observable<Contratos> {
    return this.httpClient.get<Contratos>(`${this.baseUrl}/contratos/listar`);
  }
  getAllUser():Observable<Usuarios>{
    return this.httpClient.get<Usuarios>(`${this.baseUrl}/usuarios/listar`)
    }


    uploadImage(idEmpleado: number, imageFile: File) {
      const formData = new FormData();
      formData.append('idempleado', idEmpleado.toString());
      formData.append('img', imageFile);

      const headers = new HttpHeaders({ 'Accept': '*/*' });
      // Puedes omitir el encabezado "Accept" si no es necesario.

      return this.httpClient.post(`${this.baseUrl}/empleados/cargarimagen`, formData, { headers, responseType: 'text' });
    }

}
