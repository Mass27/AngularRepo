import { Component, OnInit } from '@angular/core';
import { usuarioService } from '../../services/usuarios.service';
import { DatumUsuarios, Usuarios } from '../../interfaces/usuario.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit{

usuarios: DatumUsuarios[]=[];
nombreBusqueda: string = '';
sugerencias: DatumUsuarios[]=[];
empleadoSeleccionado: DatumUsuarios | null = null;
  constructor( private usuarioService:usuarioService,private router:Router){}
  ngOnInit(): void {

   this.usuarioService.getAllUser().subscribe( user =>{
    this.usuarios = user.data;
   })

 }

 buscarEmpleadosPorNombre() {
   if (this.nombreBusqueda.trim() === '') {
     this.sugerencias = [];
     return;
   }

   this.sugerencias = this.usuarios.filter((usuario) =>
     usuario.usuario.toLowerCase().includes(this.nombreBusqueda.toLowerCase())
   );
 }

 seleccionarSugerencia(empleado: DatumUsuarios) {
   this.empleadoSeleccionado = empleado;
   this.nombreBusqueda = '';

   // Redirigir al usuario a la página de edición del empleado seleccionado
   this.router.navigate(['usuarios/edit', empleado.id]);
 }
}
