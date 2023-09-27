// Importa las dependencias necesarias
import { Component } from '@angular/core';
import { Anime, Datum } from '../../interfaces/anime.interfaces';
import { AnimeService } from '../../services/anime.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css'],
})
export class SearchboxComponent {
  searchInput = new FormControl('');
  anime: Datum[] = [];
  selectAnime?: Datum;

  constructor(private animeService: AnimeService, private router: Router) {}

  // Función para limpiar la búsqueda
  clearSearch(): void {
    this.searchInput.reset();
    this.anime = [];
    this.selectAnime = undefined;
  }

  searchAnime(): void {
    const value: string = this.searchInput.value || '';

    this.searchInput.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((value: string | null) => !!value), // Filtrar valores nulos
        map((value: string | null) => value || ''), // Convertir null a cadena vacía
        switchMap((value: string) => this.animeService.getSugges(value))
      )
      .subscribe((response) => {
        if (response && response.data.length > 0) {
          this.anime = response.data;
          this.selectAnime = undefined; // Limpia la selección actual
        } else {
          this.anime = [];
          this.selectAnime = undefined;
        }
      });
  }

  selectAnimeItem(anime: Datum): void {
    this.selectAnime = anime; // Establecer la selección al hacer clic en un elemento
  }

  goToAnimePage(animeId: number): void {
    this.router.navigate(['/anime', animeId]);

    this.clearSearch(); // Utiliza la función para limpiar la búsqueda
  }
}
