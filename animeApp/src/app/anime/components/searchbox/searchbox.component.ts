import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { Datum } from '../../interfaces/anime.interfaces';
import { AnimeService } from '../../services/anime.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css'],
})
export class SearchboxComponent implements OnInit {
  searchInput = new FormControl('');
  anime: Datum[] = [];
  selectedAnime?: Datum;

  constructor(private animeService: AnimeService, private router: Router) {}

  ngOnInit() {
    this.setupSearchInputListener();
  }

  clearSearch(): void {
    this.searchInput.reset();
    this.anime = [];
    this.selectedAnime = undefined;
  }

  private setupSearchInputListener(): void {
    this.searchInput.valueChanges
  .pipe(
    debounceTime(300),
    distinctUntilChanged(),
    filter((value: string | null) => !!value), // Filtrar valores nulos
    switchMap((value: string | null) => {
      if (value) {
        return this.animeService.getSugges(value);
      } else {
        return of({ data: [] }); // Retornar un observable con datos vacíos en caso de valor nulo
      }
    })
  )
  .subscribe((response) => {
    this.handleSearchResponse(response);
  });
  }

  private handleSearchResponse(response: any): void {
    if (response && response.data) {
      this.anime = response.data;
      this.selectedAnime = undefined;
    } else {
      this.anime = [];
      this.selectedAnime = undefined;
    }
  }

  selectAnimeItem(anime: Datum): void {
    this.selectedAnime = anime;
  }

  goToAnimePage(animeId: number): void {
    this.router.navigate(['/anime', animeId]);
    this.clearSearch();
  }
}
