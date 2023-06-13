import { Component } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css'],
})
export class CarruselComponent {

  public eventsItem = [
    {
      label: 'TALLER VIVENCIAL',
      p: 'Taller vivencial mindfulness, para la gestión emocional.',
      icon: 'https://res.cloudinary.com/dummbvxvo/image/upload/v1684963378/events/ozvqmmbk7h7nm3b23n2a.jpg',
      Image: true,
      URL: 'leer Mas..',
    },
    {
      label: 'FORO CUIDANDO NUESTRO AMBIENTE',
      p: ' Cuidando nuestro ambiente: saneamiento para la cuidad de San Pedro Sula',
      icon: 'https://res.cloudinary.com/dummbvxvo/image/upload/v1684962671/events/zmrcq4elvplhtsid6l5c.jpg',
      image: true,
    },
    {
      label: 'GRAN NOCHE DE ESPECTACULO',
      p: 'Recital de ballet y música<',
      icon: 'https://res.cloudinary.com/dummbvxvo/image/upload/v1684962325/events/fpwnpmykfk2geptf3mlr.jpg',
      image: true,
    },
    {
      label: 'CLASICOS EN ESPANOL',
      p: 'Clásicos en español y MUSICON',
      icon: 'https://res.cloudinary.com/dummbvxvo/image/upload/v1684961846/events/nrrd4qmyojvsfp9eir69.jpg',
      image: true,
    },
    {
      label: 'CONCIERTO UNION ROCK',
      p: 'Música en vivo Unión Rock',
      icon: 'https://res.cloudinary.com/dummbvxvo/image/upload/v1684961452/events/xkqxuhhp4cu60kklarbv.jpg',
      Image: true,
    },
    {
      label: 'COVER DE VILMA PALMA Y BUNBURI',
      p: 'Cover de Vilma Palma y Bunburi por Gravedad Cero',
      icon: 'https://res.cloudinary.com/dummbvxvo/image/upload/v1684960578/events/ognpn6iwivck71eplite.jpg',
      image: true,
    },
  ];

  public noticesItems = [
    {
      label:
        'Control de incendio forestal en aldea Buenos Aires, Parque Nacional El Cusuco',
      p: 'Con la intervención adecuada de la Municipalidad de San Pedro Sula, que dirige el alcalde Roberto Contreras, a través de las cuadrillas de la Gerencia de Ambiente, se logró controlar este día un incendio forestal en la aldea Buenos Aires, Parque Nacional El Cusuco.',
      icon: 'https://res.cloudinary.com/dummbvxvo/image/upload/v1685029273/news/rmfjrex0h86a7n4nglxd.jpg',
      Image: true,
      URL: 'leer Mas..',
    },
    {
      label: 'Mas de 3500 Atenciones',
      URL: 'leer Mas..',
      p: 'Con esmero y vocación que día a día muestra su personal municipal al momento de atender a los pacientes, el Macro Distrito Municipal de Salud Cofradía, desde su apertura el 3 de mayo del presente año hasta la fecha, ha brindado más de 3,500 atenciones médicas en las áreas de medicina general, pediatría, vacunación y ginecología.',
      icon: 'https://res.cloudinary.com/dummbvxvo/image/upload/v1684791655/news/acwefa7ssfz2c7s8mhyg.jpg',
      Image: true,
    },
    {
      label: 'Conmemoración Día de la Madre',
      URL: 'leer Mas..',
      icon: 'https://res.cloudinary.com/dummbvxvo/image/upload/v1683933171/news/zbcfw1192dexxaw081co.jpg',
      Image: true,
      p: 'En el marco del Día de la Madre, el Despacho de la Esposa del Alcalde, EcoSocial, que dirige ad honorem Zoila de Contreras, agasajó a 500 madres de diferentes sectores de San Pedro Sula. El alcalde Roberto Contreras acompañó en el evento, donde se impuso la banda a 7 madres.',
      url: '/municipalidad',
    },
    {
      label: 'Brigada médica en El Zapotal',
      URL: 'leer Mas..',
      icon: 'https://res.cloudinary.com/dummbvxvo/image/upload/v1682527030/news/pb9fkjzrkyuix2lx54e7.jpg',
      image: true,
      p: 'Nuestro alcalde Roberto Contreras y la 105 Brigada de Infantería beneficiaron a miles de vecinos de El Zapotal con brigada médica. El equipo de salud municipal brindó atención en medicina general, pediatría, odontología, ginecología, vacunación, entre otras.',
    },
    {
      label: 'Segunda Edición Huertos Escolares',
      URL: 'leer Mas..',
      icon: 'https://res.cloudinary.com/dummbvxvo/image/upload/v1682375765/news/zoyrz23bmca68vk2tnov.jpg',
      image: true,
      p: 'Muy pronto, nuestro alcalde Roberto Contreras, por medio de la Gerencia de Ambiente dará inicio a la segunda edición del programa Huertos Escolares en San Pedro Sula, con el objetivo de que los estudiantes interactúen con la naturaleza.',
    },
    {
      label: 'Supervisión de obras de mejoramiento ',
      URL: 'leer Mas..',
      icon: 'https://res.cloudinary.com/dummbvxvo/image/upload/v1682376004/news/p6kvcfsfpsnhrepcmczu.jpg',
      image: true,
      p: 'Nuestro alcalde Roberto Contreras supervisó este día los trabajos de mantenimiento en la Avenida Circunvalación, desde la rotonda de la 105 Brigada hasta el teatro José Francisco Saybe. Son 1,400 metros cuadrados de vía a mejorar, con fondos 100 % municipales.',
    },

    {
      label: 'Supervisión Macro Distrito Municipal de Salud Cofradía',
      URL: 'leer Mas..',
      icon: 'https://res.cloudinary.com/dummbvxvo/image/upload/v1682524926/news/un1gfaifdxeomennh8zz.jpg',
      Image: true,
      p: 'Nuestro alcalde Roberto Contreras, este día supervisó el proyecto del Macro Distrito Municipal de Salud Cofradía, que se encuentra en etapa final. Pronto, miles de vecinos del sector de Cofradía y zonas aledañas se beneficiarán con atención médica de calidad.',
    },
    {
      label:
        'Acuerdo con patronato de la Fesitranh para recuperar áreas verdes',
      URL: 'leer Mas..',
      icon: 'https://res.cloudinary.com/dummbvxvo/image/upload/v1680026743/news/s8tkdjcrj2zepva08viv.jpg',
      image: true,
      p: 'Nuestro alcalde Roberto Contreras crea mesa de diálogo con directivos del patronato de la colonia Fesitranh, para recuperar áreas verdes. También ordenó la suspensión de nuevos permisos de construcción en ese sector de la ciudad. #SanPedroSula #CiudadDeEmprendedores #SPS 🤝',
    },
  ];

  constructor() {}



  
}
