import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  animations: [
    trigger('formState', [
      state('login', style({
        transform: 'rotateY(0deg)'
      })),
      state('register', style({
        transform: 'rotateY(360deg)'
      })),
      transition('login => register', [
        animate('0.5s ease-out')
      ]),
      transition('register => login', [
        animate('0.5s ease-out')
      ])
    ])
  ],
})
export class RegisterFormComponent {
  title = 'Iniciar Sesion';
  selectedAction = 'login';
  selectedCharacter: string = 'asuka';

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    action: new FormControl('login'),
  });

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    action: new FormControl('register'),
  });
  constructor(private authService: AuthService, private router: Router) {}
  onSubmit() {
    if (this.selectedAction === 'login') {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      if (username && password) {
        const loggedIn = this.authService.login(username, password);
        if (loggedIn) {
          this.router.navigate(['/anime']); // Redirigir al usuario a la página de inicio
        } else {
          // Manejar caso de inicio de sesión fallido
        }
      } else {
        // Lógica de registro con los campos username, password y email del registerForm
      }
    }
  }

  setTitle() {
    this.title =
      this.selectedAction === 'login' ? 'Iniciar Sesion' : 'Registrarse';
  }

  onRadioChange(event: any) {
    this.selectedAction = event.target.value;
    if (this.selectedAction === 'login') {
      this.selectCharacter('asuka'); // Si es iniciar sesión, seleccionamos Asuka
    } else {
      this.selectCharacter('rei'); // Si es registrarse, seleccionamos Rei
    }
    this.setTitle(); // Llama a setTitle() cuando cambia la acción seleccionada
  }

  selectCharacter(character: string) {
    this.selectedCharacter = character;
  }
}
