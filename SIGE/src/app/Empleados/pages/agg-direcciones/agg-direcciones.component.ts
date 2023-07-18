import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DatumDirec } from '../../interfaces/direccion.interface';

@Component({
  selector: 'app-agg-direcciones',
  templateUrl: './agg-direcciones.component.html',
})
export class AggDireccionesComponent implements OnInit {
  respuestaServidor: string = '';

  public formDirec = new FormGroup({
    id: new FormControl<number>(0),
    sector: new FormControl(''),
    colonia: new FormControl(''),
    calle: new FormControl(''),
    avenida: new FormControl(''),
    numcasa: new FormControl<number>(0),
  });

  constructor(private empleadosService: EmpleadosService) {}
  ngOnInit(): void {}

  enviarFormulario() {
    const direc = this.formDirec.value as DatumDirec;

    this.empleadosService.Address(direc).subscribe((response) => {
      this.respuestaServidor = 'El cargo se ha guardado exitosamente.';
      console.log(response);
    });
  }
}
