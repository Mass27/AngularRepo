import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../services/anime.service';


@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit{



  constructor( private animeService:AnimeService ){}


ngOnInit(): void {

}

}
