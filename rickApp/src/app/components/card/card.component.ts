import { Component, Inject, Input, OnInit } from '@angular/core';
import {  ResultCharacter } from 'src/app/interfaces/characters.interface';
import { rickService } from '../../services/rick.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() characters!: ResultCharacter;

  constructor(private rickService: rickService,
    ) {}

  ngOnInit(): void {
    // if ( !this.allCharacters ) throw Error('Hero property is required');
  }




}




