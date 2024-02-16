import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { InfoAnime } from '../../interfaces/animeInfo.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatumEpisodesAnime } from '../../interfaces/anime-episodes.intefaces';
import { Location } from '@angular/common';

@Component({
  templateUrl: './anime-info.component.html',
  styleUrls: ['./anime-info.component.css'],
})
export class AnimeInfoComponent implements OnInit {
  animeInfo?: InfoAnime;
  episodes: DatumEpisodesAnime[] = [];
  visibleEpisodes: DatumEpisodesAnime[] = [];
  episodesPerPage = 5;
  showMoreButton = false;
  errorLoadingAnime = false; // Controla si se muestra un mensaje de error

  constructor(
    private animeService: AnimeService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private location:Location
  ) {
const currenLocation = this.location.path();
console.log(currenLocation);

  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.animeService.getAnimeById(id)))
      .subscribe(
        (anime) => {
          if (!anime) {
            this.errorLoadingAnime = true; // Mostrar mensaje de error
            return;
          }

          this.animeInfo = {
            ...anime,
            safeTrailerUrl: this.getSafeTrailerUrl(anime.data.trailer.youtube_id),
          };
          this.loadEpisodes(anime.data.mal_id);
        },
        (error) => {
          console.error('Error al encontrar el anime', error);
          this.errorLoadingAnime = true; // Mostrar mensaje de error
        }
      );
  }
  goBack() {
     this.location.back();//me redirige al ultimo lugar 
  }

  getSafeTrailerUrl(trailerId: string): SafeResourceUrl | null {
    if (trailerId) {
      const url = `https://www.youtube.com/embed/${trailerId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      return null;
    }
  }
  // Función para cargar los episodios del anime
  private loadEpisodes(animeId: number) {
    this.animeService.getEpisodesAnime(animeId).subscribe((episode) => {
      this.episodes = episode.data;
      this.updateVisibleEpisodes();
    });
  }

  showMoreEpisodes() {
    const currentEpisodes = this.visibleEpisodes.length;
    const moreEpisodes = this.episodes.slice(currentEpisodes, currentEpisodes + this.episodesPerPage);
    this.visibleEpisodes = [...this.visibleEpisodes, ...moreEpisodes];
    this.updateVisibleEpisodes();
  }


  // Función para actualizar el estado del botón "Mostrar más"
  private updateVisibleEpisodes() {
    this.showMoreButton = this.episodes.length > this.visibleEpisodes.length;
  }
}
