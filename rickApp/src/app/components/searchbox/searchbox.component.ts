import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import {
  AllCharacters,
  ResultCharacter,
} from 'src/app/interfaces/characters.interface';
import { rickService } from 'src/app/services/rick.service';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css'],
})
export class SearchboxComponent {
  searchInput = new FormControl('');
  characters: ResultCharacter[] = [];
  selectedCharacter?: ResultCharacter;

  constructor(private rickServices: rickService, private router: Router) {}

  searchCharacter() {
    const value: string = this.searchInput.value || '';

    this.rickServices.getSugges(value).subscribe((response) => {
      if (response && response.results.length > 0) {
        const characters: AllCharacters = response;
        const firstCharacter: ResultCharacter = characters.results[0];
        this.characters = characters.results;
        this.selectedCharacter = firstCharacter;
        console.log(this.characters); // Mostrar resultados en la consola
      } else {
        this.characters = [];
        this.selectedCharacter = undefined;
      }
    });
  }

  onselect(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedCharacter = undefined;
      return;
    }

    const charac: ResultCharacter = event.option.value;
    this.searchInput.setValue(charac.name);
    this.selectedCharacter = charac;

    // Redirigir a la página de detalles
    this.router.navigate(['/character', charac.id]);
  }
}
