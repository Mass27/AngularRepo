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
import { of, switchMap } from 'rxjs';
import {
  DataById,
  EmpleadoByID,
} from '../../interfaces/EmpleadoById.interfaces';
import {
  DatumUsuarios,
  Usuarios,
} from 'src/app/usuarios/interfaces/usuario.interfaces';
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
  Usuarios: DatumUsuarios[] = [];
  empleadoImagen: string | null = null;
  isEditMode: boolean = false;
  public errores: string[] = [];
  isAdmin: boolean = false;

  public formulario: FormGroup = new FormGroup({
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
    idcontrato: new FormControl<DatumCon | null>(null),
  });

  public imgForm: FormGroup = new FormGroup({
    imagen: new FormControl('', Validators.required),
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
    private router: Router,
    private http:HttpClient
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
    this.obtenerEmpleadoPorId();

    const usuarioLogin = sessionStorage.getItem('usuarioLogin');
    this.isAdmin = usuarioLogin === 'Bienvenido Administrador';
  }

  ngAfterViewInit() {}

  enviarFormulario():void {

    this.errores = []; // Limpiamos los errores para cada envío

    // if (this.formulario.invalid) {
    //   this.respuestaServidor = 'Por favor, completa todos los campos requeridos.';
    //   return;
    // }

      if (this.currentEmpleado.idempleado) {
        this.empleadosService.updateEmpleado(this.currentEmpleado).subscribe(
          (empleadoActualizado) => {
            this.respuestaServidor = 'El empleado se ha actualizado exitosamente.';
            console.log('Empleado actualizado:', empleadoActualizado);
            this.router.navigateByUrl('/empleados'); // Redirige al listado de empleados
          },
          (error: any) => {
            console.error('Error al actualizar el empleado:', error);
          });
        return;
      }
        this.empleadosService.addEmpleados(this.currentEmpleado).subscribe(
          (nuevoEmpleado) => {
            this.respuestaServidor = 'El empleado se ha guardado exitosamente.';
            console.log('Nuevo empleado creado:', nuevoEmpleado);
            this.formulario.reset();
          },
          (error: any) => {
             this.respuestaServidor = 'El empleado no se ha guardado exitosamente.';
            console.error('Error al guardar el empleado:', error);
          });
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

  obtenerEmpleadoPorId() {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          this.isEditMode = params.has('id');
          if (id) {
            return this.empleadosService.getEmpleadoById(+id);
            // Parseamos el ID a number
          } else {
            // Manejar el caso en que no se proporcione un ID válido
            return of(null);
          }
        })
      )
      .subscribe(
        (response: EmpleadoByID | null) => {
          if (response && response.data) {
            const data: DataById = response.data;
            const empleado: EmpleadoList = {
              edad: data.edad,
              idempleado: data.idempleado,
              identidad: data.identidad,
              nombrecompleto: data.nombrecompleto,
              correo: data.correo,
              genero: data.genero,
              estcivil: data.estcivil,
              telefono: data.telefono,
              tiposangre: data.tiposangre,
              fechanac: data.fechanac,
              departamento: data.departamento,
              idusuario: data.idusuario,
              iddireccion: data.iddireccion,
              idcargo: data.idcargo,
              idcontrato: data.idcontrato,
              imagen: data.imagen !== null ? data.imagen : '', // Asegurar que imagen sea string
            };
            this.formulario.patchValue(empleado);

            // Actualiza la propiedad para mostrar la imagen del empleado
            this.empleadoImagen = empleado.imagen;
          }
        },
        (error: any) => {
          console.error('Error al obtener el empleado por ID:', error);
        }
      );
  }


  async uploadImageByEmpleadoId(idEmpleado: number) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    const file = await new Promise<File | undefined>((resolve) => {
      fileInput.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        resolve(file);
      };
      fileInput.click();
    });

    if (file) {
      try {
        this.formulario.get('idempleado')?.setValue(idEmpleado);

        const response = await this.empleadosService.uploadImage(idEmpleado, file).toPromise();
        console.log(response);

        // Actualizar la imagen del empleado solo si se selecciona un archivo
        const reader = new FileReader();
        reader.onload = (e) => {
          this.empleadoImagen = e.target?.result as string;
        };
        reader.readAsDataURL(file);

      } catch (error) {
        console.error('Error al cargar la imagen:', error);
      }
    }
  }

}
