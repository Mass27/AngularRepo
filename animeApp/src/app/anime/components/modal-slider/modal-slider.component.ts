import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import {
  Datum,
  EpisodePop
} from '../../interfaces/popularAnimeEps.interfaces';

@Component({
  selector: 'app-modal-slider',
  templateUrl: './modal-slider.component.html',
  styleUrls: ['./modal-slider.component.css'],
})
export class ModalSliderComponent implements OnInit {
  epPop: Datum[] = [];
  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {
    this.animeService.getEpisodesAnimePopular().subscribe((res) => {
      this.epPop = res.data;
    });
  }



}
