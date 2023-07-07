import { Component } from '@angular/core';
import { Anime, Datum } from '../../interfaces/anime.interfaces';
import { AnimeService } from '../../services/anime.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent {

  searchInput = new FormControl('');
  anime: Datum[] = [];
  selectAnime?: Datum;

  constructor(private animeService: AnimeService, private router: Router) {}

  searchAnime(): void {
    const value: string = this.searchInput.value || '';

    this.animeService.getSugges(value).subscribe((response) => {
      if (response && response.data.length > 0) {
        const animeSug: Anime = response;
        const firstAnime: Datum = animeSug.data[0];
        this.anime = animeSug.data;
        this.selectAnime = firstAnime;
        console.log(this.anime);
      } else {
        this.anime = [];
        this.selectAnime = undefined;
      }
    });
  }

  goToAnimePage(animeId: number): void {
    this.router.navigate(['/anime', animeId]);

    this.searchInput.reset();
    this.anime = [];
    this.selectAnime = undefined;
  }



}
