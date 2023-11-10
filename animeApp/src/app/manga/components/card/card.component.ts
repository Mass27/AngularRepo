import { Component, Input, OnInit } from '@angular/core';
import { DatumGenreByManga } from '../../interfaces/mangaGenresBy.interfaces';

@Component({
  selector: 'app-card-manga',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{


@Input() manga!:DatumGenreByManga;

ngOnInit(): void {

}


}
