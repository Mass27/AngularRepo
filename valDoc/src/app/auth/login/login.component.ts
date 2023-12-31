import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

users:string = '';
constructor(private authService:AuthService){}

ngOnInit(): void {

this.authService.getUsers().subscribe((user :any)=>{

this.users = user;

});
}


}
