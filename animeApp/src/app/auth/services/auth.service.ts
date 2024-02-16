import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users = [
    { username: 'usuario1', password: 'password1' },
    { username: 'usuario2', password: 'password2' }
  ];

  constructor(private http: HttpClient) { }


login(username: string, password: string):boolean {
  const user = this.users.find(u => u.username === username && u.password === password);
  if(user){
    localStorage.setItem('username', user.username);
    return true;
  }else{
    return false;
  }
}

logOut():void{
  localStorage.removeItem('username');
}
isLoogedIn():boolean{
return localStorage.getItem('username') !== null;

}


}
