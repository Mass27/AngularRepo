import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, pipe } from 'rxjs';

import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http
      .get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  getSuggestions(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
  }

  addhero(heroe: Hero): Observable<Hero> {
    // al agregar un heroe necesitams una variable donde guardarla para poder postearla
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, heroe);
  }

  updatehero(heroe: Hero): Observable<Hero> {
    if (!heroe.id) throw Error('heroe id is required');
    // es buena practica si solo quiere actulizar una parte del registro hacerlo con (put)
    return this.http.patch<Hero>(`${this.baseUrl}/heroe/${heroe.id}`, heroe);
  }

  deleteHeroById(id: string): Observable<boolean> {
  
    return this.http.delete(`${this.baseUrl}/heroe/${id}`).pipe(
      catchError((err) => of(false)),
      map((resp) => true)
    );
  }
}
