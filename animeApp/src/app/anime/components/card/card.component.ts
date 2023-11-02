import { Component, Input } from '@angular/core';
import { DatumGenresAnime } from '../../interfaces/genresByanime.interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent  {
  @Input() animes!: DatumGenresAnime;
}
