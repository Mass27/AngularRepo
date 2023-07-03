import { Component, Input, OnInit } from '@angular/core';
import { Datum } from '../../interfaces/anime.interfaces';
import { Router } from '@angular/router';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {


@Input() animes!:Datum;



constructor(private router: Router) {}

ngOnInit(): void {


}


}
