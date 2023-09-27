import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { Anime, Datum } from '../../interfaces/anime.interfaces';
import { Genre, DatumGenre } from '../../interfaces/genres.interface';
import { DatumGenresAnime, GenresAnime } from '../../interfaces/genresByanime.interfaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  animeList:DatumGenresAnime[] = [];
  currentPage = 1;
  genres: DatumGenre[] = [];
  selectedGenreId: number | null = null;

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {
    this.loadGenres();
    this.loadAnimeList();
  }

  loadAnimeList(): void {
    this.animeService.getPaginatedData(this.currentPage).subscribe((data: Anime) => {
      if (this.selectedGenreId) {
        // Filtrar por género si hay un género seleccionado
        this.animeService.getAnimeGenres(this.selectedGenreId,this.currentPage).subscribe((filteredData: GenresAnime) => {
          this.animeList = filteredData.data;
          this.scrollToTop();
        });
      } else {
        // Mostrar todos los animes si no hay un género seleccionado
        this.animeList = data.data;

      }
      this.scrollToTop();
    });
  }

  loadGenres(): void {
    this.animeService.getAllGenres().subscribe((data: Genre) => {
      this.genres = data.data;
    });
  }

  filterByGenre(genreId: number | null): void {
    this.selectedGenreId = genreId;
    this.currentPage = 1; // Reiniciar la página al cambiar el género
    this.loadAnimeList(); // Asegúrate de que se llame aquí
  }

  nextPage() {
    this.currentPage++;
    this.loadAnimeList();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadAnimeList();
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
