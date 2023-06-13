import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [],
})
export class NewPageComponent implements OnInit {
  // Formulario reactivo para diferentes campos traidos desde la interface
  public heroeForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    first_appearance: new FormControl(''),
    alter_ego: new FormControl(''),
    alt_img: new FormControl(''),
    characters: new FormControl(''),
  });

  public publishers = [
    { id: 'Dc Comics', desc: 'Dc-Comics' },
    { id: 'Marvel Cmics', desc: 'Marvel-Comics' },
    { id: 'Varios', desc: 'Otros ' },
  ];

  constructor(
    private heroesServices: HeroesService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar:MatSnackBar
  ) {}


   // Hacemos un get para traer un heroe y colocarlo en nuestro form
   get currentHero(): Hero {
    const heroe = this.heroeForm.value as Hero;
    return heroe;
  }
  ngOnInit(): void {

if ( !this.router.url.includes('edit') ) return;

this.ActivatedRoute.params.pipe(
switchMap(  ({id}) => this.heroesServices.getHeroById(id)  ),
).subscribe(
heroe =>{
  if(!heroe)return this.router.navigateByUrl('/');


  this.heroeForm.reset(heroe);
  return;
});

  }



  onSubmit(): void {
    // si el formulario e sinvlaido que no mande nada
    if (this.heroeForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesServices.updatehero(this.currentHero).subscribe((heroe) => {
        //ToDO: mostrar snackbar
      });
      return;
    }

    this.heroesServices.addhero(this.currentHero).subscribe((heroe) => {
      //TODO:mostrar snackbar y navegar a /heroes/edit/heroe.id
    });
  }



showsnackbar(message:string):void{

this.snackbar.open(message,'Done',{

duration:2500

}   )

}

}
