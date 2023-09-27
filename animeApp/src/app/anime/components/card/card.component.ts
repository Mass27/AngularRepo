import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatumGenresAnime } from '../../interfaces/genresByanime.interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() animes!: DatumGenresAnime;

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
