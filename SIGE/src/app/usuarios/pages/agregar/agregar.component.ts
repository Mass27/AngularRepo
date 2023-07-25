import { Component, OnInit } from '@angular/core';
import { usuarioService } from '../../services/usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatumUsuarios, estadoList } from '../../interfaces/usuario.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { DataIdUser, IDUsuarios } from '../../interfaces/usuId.interface';

@Component({
  selector: 'agregar-usuarios',
  templateUrl: './agregar.component.html',
})
export class AgregarComponent implements OnInit {

  respuestaServidor: string = '';
  isEditMode: boolean = false;
  public errores: string[] = [];
  isAdmin: boolean = false;


  public formulario: FormGroup = new FormGroup({
    usuario: new FormControl(''),
    contrasena: new FormControl('', Validators.required),
    correo: new FormControl(''),
    estado: new FormControl<estadoList>(estadoList.ACT),
  });

  constructor(private userService: usuarioService,private router:Router
             ,private activatedRoute:ActivatedRoute) {}


 get currentUser(): DatumUsuarios{
   const user = this.formulario.value as DatumUsuarios;
   return user;
            }
  ngOnInit(): void {
this.obtenerUserId();
const usuarioLogin = sessionStorage.getItem('usuarioLogin');
this.isAdmin = usuarioLogin === 'Bienvenido Administrador';
  }

  enviarFormulario() {
    this.errores = []; // Limpiamos los errores para cada envío

    if (this.formulario.invalid) {
      this.respuestaServidor = 'Por favor, completa todos los campos requeridos.';
      return;
    }

    if (this.isEditMode) {
      // Modo de edición: Actualizar el usuario existente
      this.userService.updateUser(this.currentUser).subscribe(
        (userUpdated) => {
          this.respuestaServidor = 'El Usuario se ha actualizado exitosamente.';
          console.log('Usuario actualizado:', userUpdated);
          this.router.navigateByUrl('/usuarios');
        },
        (error: any) => {
          this.respuestaServidor = 'Error al actualizar el Usuario.';
          console.error('Error al actualizar el Usuario:', error);
        }
      );
    } else {
      // Modo de creación: Agregar un nuevo usuario
      this.userService.addUser(this.currentUser).subscribe(
        (response) => {
          this.respuestaServidor = 'El Usuario se ha guardado exitosamente.';
          console.log(response);
          this.formulario.reset();
        },
        (error: any) => {
          this.respuestaServidor = 'Error al guardar el Usuario.';
          console.error('Error al guardar el Usuario:', error);
        }
      );
    }
  }


  obtenerUserId(){

    // if ( !this.router.url.includes('edit') ) return;
    this.activatedRoute.paramMap
    .pipe(
      switchMap((params) =>{
        const id = params.get('id');
        this.isEditMode = params.has('id');
if(id){
  return this.userService.getUserId(+id);
} else {
  // Manejar el caso en que no se proporcione un ID válido
  return of(null);
}
})).subscribe(
   (response:IDUsuarios | null) =>{
if(response && response.data){
  const data: DataIdUser = response.data;
  const empleado: DatumUsuarios={
    id:data.id,
    usuario:data.usuario,
    contrasena:data.contrasena,
    correo:data.correo,
    codigo:data.codigo,
    fallido:data.fallido,
    estado:data.estado
 };
 this.formulario.patchValue(empleado);
}

}, (error: any) => {
  console.error('Error al obtener el Usuario por ID:', error);
});

  }
}
