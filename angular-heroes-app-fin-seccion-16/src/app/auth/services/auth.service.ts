import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseurl = environments.baseUrl;

  private user?: User;

  constructor(private http: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;

    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(` ${this.baseurl}/users/1`).pipe(
      // el usuario que viene por el get sera el mismo usuario que colocamos con la interfaces.
      tap((user) => (this.user = user)),
      tap((user) => localStorage.setItem('Token', 'asdasdsadasd'))
    );
  }

checkAuth():Observable<boolean>{
  if(!localStorage.getItem('Token')) return of(false);
const token = localStorage.getItem('Token');
return this.http.get<User>(`${this.baseurl}/users/1`).pipe(
tap(user => this.user = user),
// porque el !! para declarar que vuelva un valor boolean 
map( user => !!user),
catchError(error => of(false))

)
}

  Onlogout(){
    this.user = undefined;
    localStorage.clear();
      }





}
