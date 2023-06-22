import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';


import { Location, Result } from 'src/app/interfaces/location.interface';

import { rickService } from 'src/app/services/rick.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  location: Result[] = [];


  constructor(private rickService:rickService) {}


  ngOnInit(): void {
    this.rickService.getAllLocations().subscribe((data) => {
      this.location = data.results;
    });



  }

  getCharactersByLocation(locationId: number): void {
    const location = this.location.find((loca) => loca.id === locationId);
    if (location) {
      location.showCharacters = !location.showCharacters; // Invierte el estado de la variable showCharacters
      if (location.showCharacters) {
        const characterObservables = location.residents.map((residentUrl) => {
          return this.rickService.getCharacterByUrl(residentUrl);
        });

        forkJoin(characterObservables).subscribe((characters) => {
          location.characters = characters;
        });
      }
    }
  }
}





