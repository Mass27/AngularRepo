import { Component, OnInit } from '@angular/core';
import { usuarioService } from '../../services/usuarios.service';
import { DatumUsuarios } from '../../interfaces/usuario.interfaces';


@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html'
})
export class ListUsuariosComponent implements OnInit {


users:DatumUsuarios[]=[];


constructor(private  usuarioService:usuarioService){}


  ngOnInit(): void {
this.usuarioService.getAllUser().subscribe(  user => this.users =user.data )
  }
}
