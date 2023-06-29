import { Component, OnInit } from '@angular/core';
import { rickService } from 'src/app/services/rick.service';
import { ResultCharacter } from '../../interfaces/characters.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css'],
})
export class ListPageComponent implements OnInit {
  characters: ResultCharacter[] = [];

  constructor(private rickservice: rickService) {}

  ngOnInit(): void {
    this.rickservice.getCharacterAll().subscribe((data) => {
      this.characters = data.results;
      console.log(data);
    });
  }
}
