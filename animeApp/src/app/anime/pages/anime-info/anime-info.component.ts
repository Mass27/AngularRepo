import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { InfoAnime } from '../../interfaces/animeInfo.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  templateUrl: './anime-info.component.html',
  styleUrls: ['./anime-info.component.css'],
})
export class AnimeInfoComponent implements OnInit {
  animeInfo?: InfoAnime & { safeTrailerUrl: SafeResourceUrl };

  constructor(
    private animeService: AnimeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.animeService.getAnimeById(id)))
      .subscribe(
        (anime) => {
          if (!anime) {
            this.router.navigate(['/anime/list']);
          } else {
            this.animeInfo = {
              ...anime,
              safeTrailerUrl: this.getSafeTrailerUrl(anime.data.trailer.youtube_id)
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
    this.router.navigateByUrl('anime/list');
  }


  getSafeTrailerUrl(trailerId: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${trailerId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


}
