import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';





@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiUrl;



  constructor(private http: HttpClient,private router:Router) {}

  isAuthenticated(): boolean {
    // Check if the user is authenticated based on the presence of the token in session storage
    const token = sessionStorage.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    // Get the token from session storage
    const token = sessionStorage.getItem('token');
    return token;
  }



}
