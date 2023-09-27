import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { InfoAnime } from '../../interfaces/animeInfo.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatumEpisodesAnime } from '../../interfaces/anime-episodes.intefaces';

@Component({
  templateUrl: './anime-info.component.html',
  styleUrls: ['./anime-info.component.css'],
})
export class AnimeInfoComponent implements OnInit {
  animeInfo?: InfoAnime & { safeTrailerUrl: SafeResourceUrl };
  episodes: DatumEpisodesAnime[] = [];
  visibleEpisodes: DatumEpisodesAnime[] = [];
  episodesPerPage = 5;
  showMoreButton = false;

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
              safeTrailerUrl: this.getSafeTrailerUrl(anime.data.trailer.youtube_id),
            };
            this.loadEpisodes(anime.data.mal_id); // Reemplazamos la carga de episodios por una función separada
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
    const url = `https://www.youtube.com/watch?v=${trailerId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
  // Función para cargar los episodios del anime
  private loadEpisodes(animeId: number) {
    this.animeService.getEpisodesAnime(animeId).subscribe((episode) => {
      this.episodes = episode.data;
      this.updateVisibleEpisodes();
    });
  }

  showMoreEpisodes(){
    const currentEpisodio= this.visibleEpisodes.length;
    const moreEpisodes= this.episodes.slice(currentEpisodio, currentEpisodio + this.episodesPerPage);
  }




  // Función para actualizar el estado del botón "Mostrar más"
  private updateVisibleEpisodes() {
    if (this.episodes.length > this.visibleEpisodes.length) {
      this.showMoreButton = true;
    } else {
      this.showMoreButton = false;
    }
  }
}
