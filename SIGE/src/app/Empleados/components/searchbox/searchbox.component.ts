import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoByID } from 'src/app/Empleados/interfaces/EmpleadoById.interfaces';
import { EmpleadosService } from 'src/app/Empleados/services/empleados.service';
import { EmpleadoList } from '../../interfaces/empleados.interface';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html'
})
export class SearchboxComponent implements OnInit {
  empleados: EmpleadoList[] = [];
  empleadoSeleccionado: EmpleadoList | null = null;
  nombreBusqueda: string = '';
  sugerencias: EmpleadoList[] = [];

  constructor(private empleadoService: EmpleadosService, private router: Router) {}

  ngOnInit(): void {
    this.empleadoService.getAllEmpleados().subscribe(empleado => {
      console.log(empleado); // Verifica que la respuesta sea un array de empleados
      this.empleados = empleado;
    });
  }

  buscarEmpleadosPorNombre() {
    if (this.nombreBusqueda.trim() === '') {
      this.sugerencias = [];
      return;
    }

    this.sugerencias = this.empleados.filter((empleado) =>
      empleado.nombrecompleto.toLowerCase().includes(this.nombreBusqueda.toLowerCase())
    );
  }

  seleccionarSugerencia(empleado: EmpleadoList) {
    this.empleadoSeleccionado = empleado;
    this.nombreBusqueda = '';

    // Redirigir al usuario a la página de edición del empleado seleccionado
    this.router.navigate(['empleados/edit', empleado.idempleado]);
  }
}
