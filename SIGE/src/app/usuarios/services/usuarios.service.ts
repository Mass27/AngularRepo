import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DatumUsuarios, Usuarios } from '../interfaces/usuario.interfaces';
import {  IDUsuarios } from '../interfaces/usuId.interface';




@Injectable({ providedIn: 'root' })
export class usuarioService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

getAllUser():Observable<Usuarios>{
return this.http.get<Usuarios>(`${this.baseUrl}/usuarios/listar`)
}

addUser(user:DatumUsuarios):Observable<DatumUsuarios>{
  return this.http.post<DatumUsuarios>(`${this.baseUrl}/usuarios/guardar`,user)
  }

  getUserId(userId: number): Observable<IDUsuarios> {
    return this.http.get<IDUsuarios>(`${this.baseUrl}/usuarios/listarById?id=${userId}`);
  }
updateUser(user:DatumUsuarios):Observable<DatumUsuarios>{
return this.http.put<DatumUsuarios>(`${this.baseUrl}/usuarios/editar?id=${user.id}`,user)
}






}
