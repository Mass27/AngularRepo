import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Manga } from '../interfaces/manga.interface';
import { InfoManga } from '../interfaces/manga-info.interfaces';

import { DatumGenreByManga, DatumGenreManga } from '../interfaces/mangaGenresBy.interfaces';
import { GeneralGenreManga } from '../interfaces/generalGenresManga.interfaces';



@Injectable({
  providedIn: 'root',
})
export class MangaService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllManga(): Observable<Manga> {
    return this.http.get<Manga>(`${this.baseUrl}/manga`);
  }

  getPaginationManga(page: number): Observable<Manga> {
    return this.http.get<Manga>(`${this.baseUrl}/manga?page=${page}`);
  }

  getMangaById(id: number): Observable<InfoManga> {
    return this.http.get<InfoManga>(`${this.baseUrl}/manga/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.error('Anime not found:', error.message);
        } else {
          console.error('Error retrieving anime:', error.message);
        }
        return throwError('An error occurred while retrieving the anime.');
      })
    );
  }

getSugManga(query: string): Observable<Manga> {
    return this.http.get<Manga>(`${this.baseUrl}/manga?q=${query}`);
  }


getAllGenres():Observable<GeneralGenreManga>{
return this.http.get<GeneralGenreManga>(`${this.baseUrl}/genres/manga`)
}

getGenreByManga(id:number,page:number):Observable<DatumGenreManga>{
  return this.http.get<DatumGenreManga>(`${this.baseUrl}/manga?genres=${id}&page=${page}`)

}



}

