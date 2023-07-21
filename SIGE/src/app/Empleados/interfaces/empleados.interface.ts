
export interface EmpleadoList {
  edad:           number;
  idempleado:     number;
  identidad:      string;
  nombrecompleto: string;
  correo:         string;
  genero:         string;
  estcivil:       string;
  telefono:       string;
  tiposangre:     string;
  fechanac:       string;
  departamento:   string;
  imagen:         string;
  idusuario:      number;
  iddireccion:    number;
  idcargo:        number;
  idcontrato:     number;
}


export enum genero{
Masculino='Masculino',
Femenino='Femenino'
}

export enum estadocivil{
Casado='Casado',
Divorciado='Divorciado',
Soltero='Soltero',
Viudo='Viudo'

}
