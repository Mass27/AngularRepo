import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatumCargos } from '../../interfaces/cargos.interfaces';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-agregar-cargos',
  templateUrl: './agregar-cargos.component.html'
})
export class AgregarCargosComponent implements OnInit {


  respuestaServidor:string = '';

public formCargo = new FormGroup({
idcargo:  new FormControl<number>(0),
descripcionCargo: new FormControl(''),

})

constructor(private empleadosService:EmpleadosService){}
  ngOnInit(): void {

  }



  enviarFormulario() {

    const cargo = this.formCargo.value as DatumCargos;


      this.empleadosService.addCargo(cargo).subscribe(
        response => {
          this.respuestaServidor = 'El cargo se ha guardado exitosamente.';
          console.log(response);

        });

  }








}
