import { Component } from '@angular/core';

import { RegisterFormComponent } from '../../components/register-form/register-form.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {


  registerFormComponent = RegisterFormComponent;



}
