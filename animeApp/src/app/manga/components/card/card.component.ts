import { Component, Input, OnInit } from '@angular/core';
import { MangaService } from '../../services/manga.service';
import { DatoManga } from '../../interfaces/manga.interface';

@Component({
  selector: 'app-card-manga',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{


@Input() manga!:DatoManga;

ngOnInit(): void {

}


}
