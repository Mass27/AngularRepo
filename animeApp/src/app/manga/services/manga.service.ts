import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatoManga, Manga } from '../interfaces/manga.interface';

@Injectable({
  providedIn: 'root'
})
export class MangaService {


  private baseUrl = environment.apiUrl;


  constructor( private http:HttpClient) { }


getAllManga():Observable<Manga>{
  return this.http.get<Manga>(`${this.baseUrl}/manga`)
}

getPaginationManga( page:number):Observable<Manga>{
  return this.http.get<Manga>(`${this.baseUrl}/manga?page=${page}`)
}


getMangaById(id:number):Observable<DatoManga>{
return this.http.get<DatoManga>(`${this.baseUrl}/manga/${id}`)
}


}
