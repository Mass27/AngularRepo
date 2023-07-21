import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { Authten } from '../interfaces/auth-auten.interfaces';
import { Router } from '@angular/router';





@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiUrl;



  constructor(private http: HttpClient,private router:Router) {}


}
