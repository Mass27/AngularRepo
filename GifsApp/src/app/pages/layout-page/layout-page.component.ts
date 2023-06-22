import { Component, ElementRef, ViewChild } from '@angular/core';
import { Gif } from 'src/app/interfaces/gifs.interfaces';
import { GifsService } from 'src/app/services/gifs.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {



  constructor( private gifsService: GifsService ) { }


  get gifs(): Gif[] {
    return this.gifsService.gifList;
  }
}
