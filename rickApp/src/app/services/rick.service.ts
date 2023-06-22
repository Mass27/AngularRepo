import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of} from 'rxjs';
import { AllCharacters,ResultCharacter} from '../interfaces/characters.interface';

import { Character, Location, Result } from '../interfaces/location.interface';


@Injectable({providedIn: 'root'})
export class rickService {


  private baseUrl= environment.apiEndpoint;

  constructor(private http: HttpClient) { }


getCharacterAll():Observable<AllCharacters>{
return this.http.get<AllCharacters>(`${this.baseUrl}/character`)

}


getCharacterById( id: string ): Observable<ResultCharacter | undefined> {
  return this.http.get<ResultCharacter>(`${ this.baseUrl }/character/${ id }`)
    .pipe(
      catchError( error => of(undefined) )
    );
}


getAllLocations():Observable<Location>{

  return this.http.get<Location>(` ${this.baseUrl}/location`)
}



getCharacterByUrl(url: string): Observable<Character> {
  return this.http.get<Character>(url);
}


getSugges(query: string): Observable<AllCharacters> {
  return this.http.get<AllCharacters>(`${this.baseUrl}/character/?name=${query}`).pipe(
    map(response => response)
  );
}


}
