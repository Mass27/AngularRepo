import { Gif } from './../../interfaces/gifs.interfaces';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent  {


  @Input()
  public gifs: Gif[] = [];


}
