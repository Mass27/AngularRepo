import { Component, OnInit } from '@angular/core';
import { ResultCharacter } from 'src/app/interfaces/characters.interface';
import { rickService } from '../../services/rick.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit{

public characters?:ResultCharacter;


constructor(  private rickService:rickService,
               private activatedRoute:ActivatedRoute,
                private router:Router   ){}



ngOnInit(): void {
  this.activatedRoute.params
  .pipe(
    switchMap(({ id }) => this.rickService.getCharacterById(id))
  )
  .subscribe(
    character => {
      if (!character) {
        // Si no se encuentra el personaje, redirige a la página de listado
        this.router.navigate(['/list']);
      } else {
        // Asigna el personaje obtenido a la propiedad character
        this.characters = character;
      }
    },
    (error) => {
      // Manejo de errores en caso de que falle la solicitud
      console.error('Error al obtener el personaje:', error);
    }
  );
}


goBack(){
  this.router.navigateByUrl('/list')
}




}
