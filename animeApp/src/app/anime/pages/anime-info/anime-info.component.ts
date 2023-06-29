import { Component, Input, OnInit } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Datum } from '../../interfaces/anime.interfaces';
import { DataAnime } from '../../interfaces/animeInfo.interface';


@Component({
  templateUrl: './anime-info.component.html',
  styleUrls: ['./anime-info.component.css'],
})
export class AnimeInfoComponent implements OnInit {
  anime?:DataAnime;


  constructor(
    private animeService: AnimeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.animeService.getAnimeById(id))
      )
      .subscribe(
        anime => {
          console.log(anime);
          if (!anime){
            this.router.navigate(['/anime/list']);
          }else{

            this.anime = anime;

            return;

          }

        },
        (error) => {
          console.error('Error al encontrar el anime', error);
        }
      );
  }

  goBack() {
    this.router.navigateByUrl('anime/list');
  }
}
