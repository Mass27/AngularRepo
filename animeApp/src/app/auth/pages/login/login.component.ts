import { Component, OnInit } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{

  registerFormComponent = RegisterFormComponent;


  ngOnInit(): void {

  }

}
