import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Anime } from '../interfaces/anime.interfaces';
import { environment } from '../../../environments/environment';
import { Genre } from '../interfaces/genres.interface';
import { InfoAnime } from '../interfaces/animeInfo.interface';
import {  EpisodesAnime } from '../interfaces/anime-episodes.intefaces';
import { GenresAnime } from '../interfaces/genresByanime.interfaces';
import { Datum, EpisodePop } from '../interfaces/popularAnimeEps.interfaces';

@Injectable({ providedIn: 'root' })
export class AnimeService {
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getPaginatedData(page: number): Observable<Anime> {
    return this.httpClient.get<Anime>(`${this.baseUrl}/anime?page=${page}`);
  }

  getAnimeById(id: number): Observable<InfoAnime> {

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
getAllGenres():Observable<Genre>{
  return this.httpClient.get<Genre>(`${this.baseUrl}/genres/anime`)
}

  getAnimeGenres(id:number,page:number): Observable<GenresAnime> {
    return this.httpClient.get<GenresAnime>(`${this.baseUrl}/anime?genres=${id}&page=${page}`);
  }

getEpisodesAnime(id:number):Observable<EpisodesAnime>{
  return this.httpClient.get<EpisodesAnime>(`${this.baseUrl}/anime/${id}/videos/episodes`)
}

getEpisodesAnimePopular():Observable<EpisodePop>{
  return this.httpClient.get<EpisodePop>(`${this.baseUrl}/watch/episodes/popular`)
}

}
