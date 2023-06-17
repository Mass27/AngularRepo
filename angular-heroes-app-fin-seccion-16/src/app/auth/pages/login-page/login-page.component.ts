import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor(private AuthService:AuthService,
    private route:Router){}

  Onlogin():void{
this.AuthService.login('manuelserbellon@gmail.com','1234').subscribe(
  user=>{
  this.route.navigate(['/'])

  }
)

  }
 

}
