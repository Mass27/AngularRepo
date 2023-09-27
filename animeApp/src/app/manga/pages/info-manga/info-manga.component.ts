import { Component, OnInit } from '@angular/core';
import { DatoManga } from '../../interfaces/manga.interface';
import { MangaService } from '../../services/manga.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { InfoManga } from '../../interfaces/manga-info.interfaces';

@Component({
  selector: 'app-info-manga',
  styleUrls: ['./info-manga.component.css'],
  templateUrl: './info-manga.component.html'
})
export class InfoMangaComponent implements OnInit {

manga!:InfoManga;

constructor( private mangaService:MangaService,
             private ActivatedRoute:ActivatedRoute,
              private router:Router  ){}


ngOnInit(): void {


  this.ActivatedRoute.params
  .pipe(switchMap(({ id }) => this.mangaService.getMangaById(id)))
  .subscribe(
    (manga) => {
      if (!manga) {
        this.router.navigate(['/anime/list']);
      } else {
        this.manga = {
          ...manga,

        };
       // Obtener los episodios del anime
      }
    },
    (error) => {
      console.error('Error al encontrar el anime', error);
    }
  );
}



goBack() {
  this.router.navigateByUrl('manga/list');
}



}
