import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private baseUrl:string = 'http://localhost:3000';


  constructor(private httpClient:HttpClient) { }

  getUsers(){
return this.httpClient.get(`${this.baseUrl}/users`);
  }
}
