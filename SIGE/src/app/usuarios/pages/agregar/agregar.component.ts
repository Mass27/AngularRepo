import { Component, OnInit } from '@angular/core';
import { usuarioService } from '../../services/usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatumUsuarios, estadoList } from '../../interfaces/usuario.interfaces';

@Component({
  selector: 'agregar-usuarios',
  templateUrl: './agregar.component.html'
})
export class AgregarComponent implements OnInit{

  respuestaServidor: string = '';

public formulario:FormGroup=new FormGroup({
usuario: new FormControl(''),
contrasena: new FormControl('', Validators.required),
correo: new FormControl(''),
estado: new FormControl<estadoList>(estadoList.ACT),
})

constructor( private userService:usuarioService ){}


  ngOnInit(): void {

  }


  enviarFormulario() {
    const usuario: DatumUsuarios = this.formulario.value;

this.userService.addUser(usuario).subscribe(
response =>{

  this.respuestaServidor = 'El empleado se ha guardado exitosamente.';
  console.log(response);

})



  }


}
