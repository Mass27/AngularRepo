import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  EmpleadoList,
  estadocivil,
  genero,
} from '../../interfaces/empleados.interface';
import { Cargos, DatumCargos } from '../../interfaces/cargos.interfaces';
import { DatumDirec, Direccion } from '../../interfaces/direccion.interface';
import { Contratos, DatumCon } from '../../interfaces/contratos.intefaces';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { EmpleadoByID } from '../../interfaces/EmpleadoById.interfaces';
import { DatumUsuarios, Usuarios } from 'src/app/usuarios/interfaces/usuario.interfaces';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
})
export class AgregarComponent implements OnInit, AfterViewInit {
  empleadoList?: EmpleadoByID;
  respuestaServidor: string = '';
  cargos: DatumCargos[] = [];
  direcLis: DatumDirec[] = [];
  contratos: DatumCon[] = [];
   Usuarios:DatumUsuarios[]=[];



  public formulario: FormGroup = new FormGroup({
    edad: new FormControl('', [Validators.required, Validators.min(18)]),
    idempleado: new FormControl('', Validators.required),
    identidad: new FormControl('', Validators.required),
    nombrecompleto: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),
    genero: new FormControl<genero>(genero.Masculino),
    estcivil: new FormControl<estadocivil>(estadocivil.Soltero),
    telefono: new FormControl('', Validators.required),
    tiposangre: new FormControl('', Validators.required),
    fechanac: new FormControl('', Validators.required),
    departamento: new FormControl('', Validators.required),
    idusuario: new FormControl('', Validators.required),
    iddireccion: new FormControl('', Validators.required),
    idcargo: new FormControl('', Validators.required),
    idcontrato: new FormControl<DatumCon| null>(null),
  });

  public generos = [
    { id: 'Maculino', desc: 'Masculino' },
    { id: 'Femeino', desc: 'Femenino' },
  ];

  public estados = [
    { id: 'Casado', desc: 'Casado' },
    { id: 'Divorciado', desc: 'Divorciado' },
    { id: 'Soltero', desc: 'Soltero' },
    { id: 'Viudo', desc: 'Viudo' },
  ];

  constructor(
    private empleadosService: EmpleadosService,
    private activatedRoute: ActivatedRoute,
    private router: Router, private http: HttpClient
  ) {}

  get currentEmpleado(): EmpleadoList {
    const empleado = this.formulario.value as EmpleadoList;
    return empleado;
  }

  ngOnInit(): void {
    this.obtenerDatosCargos();
    this.obtenerDatosDireccion();
    this.obtenerContratos();
    this.obtenerUsuarios();

    if (!this.router.url.includes('edit')) return;

      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => this.empleadosService.getEmpleadoById(id))
        )
        .subscribe(
          empleado => {
            console.log(empleado)
            if (!empleado) {
              this.router.navigateByUrl('/list');
            } else {
              this.formulario.reset(empleado);
            }
          },
          (error) => {
            console.error('Error al obtener empleado por ID:', error);
          }
        );

  }




ngAfterViewInit(){


}

  private obtenerDatosCargos(): void {
    this.empleadosService.getCargos().subscribe(
      (cargos: Cargos) => {
        this.cargos = cargos.data;
      },
      (error: any) => {
        console.error('Error al obtener los datos de cargos:', error);
      }
    );
  }

  private obtenerUsuarios(): void {
    this.empleadosService.getAllUser().subscribe(
      (usu: Usuarios) => {
        this.Usuarios = usu.data;
      },
      (error: any) => {
        console.error('Error al obtener los datos de cargos:', error);
      }
    );
  }

  private obtenerDatosDireccion(): void {
    this.empleadosService.getDireccion().subscribe(
      (direccion: Direccion) => {
        this.direcLis = direccion.data;
      },
      (error: any) => {
        console.error('Error al obtener los datos de dirección:', error);
      }
    );
  }

  private obtenerContratos(): void {
    this.empleadosService.getContratos().subscribe(
      (contrato: Contratos) => {
        this.contratos = contrato.data;
      },
      (error: any) => {
        console.error('Error al obtener los datos de Contratos:', error);
      }
    );
  }


  enviarFormulario() {
    const empleadoenvio = this.formulario.value as EmpleadoList;
    this.empleadosService.addEmpleados(empleadoenvio).subscribe((response) => {
      this.respuestaServidor = 'El empleado se ha guardado exitosamente.';
      console.log(response);
    });
  }


}
