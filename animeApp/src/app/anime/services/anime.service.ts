import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Anime } from '../interfaces/anime.interfaces';
import { environment } from '../../../environments/environment';
import { Genre } from '../interfaces/genres.interface';
import { InfoAnime } from '../interfaces/animeInfo.interface';

@Injectable({ providedIn: 'root' })
export class AnimeService {
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getPaginatedData(page: number): Observable<Anime> {
    return this.httpClient.get<Anime>(`${this.baseUrl}/anime?page=${page}`);
  }

  getAnimeById(id: string): Observable<InfoAnime> {
    return this.httpClient.get<InfoAnime>(`${this.baseUrl}/anime/${id}`).pipe(
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





  getSugges(query: string): Observable<Anime> {
    return this.httpClient.get<Anime>(`${this.baseUrl}/anime?q=${query}`);
  }

  getAnimeGenres(): Observable<Genre> {
    return this.httpClient.get<Genre>(`${this.baseUrl}/genres/anime`);
  }
}
