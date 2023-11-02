import { Component } from '@angular/core';
import { DatoManga } from '../../interfaces/manga.interface';
import { FormControl } from '@angular/forms';
import { MangaService } from '../../services/manga.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';
import { __values } from 'tslib';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent {
  searchInput = new FormControl('');
  selectedManga?: DatoManga;
  manga: DatoManga[] = [];

  constructor(private MangaService: MangaService, private router: Router) {}

  searchManga() {
    const valor: string = this.searchInput.value || '';

    this.searchInput.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((valor: string | null) => valor !== null),
      map((valor: string | null) => valor || ''),
      switchMap((valor:string)=> this.MangaService.getSugManga(valor))
    ).subscribe((response)=>{

if(response && response.data.length >0){
  this.manga = response.data;
  this.selectedManga=undefined;

}else{
  this.manga = [];
  this.selectedManga = undefined;
}


    });
  }

clearSearch(){
  this.searchInput.reset();
  this.manga = [];
  this.selectedManga = undefined;
}

selectMangaItem(manga:DatoManga){
this.selectedManga = manga;//colocamos que sera igual al manga seleccionado
}

goToMangaPage(mangaId:number){
this.router.navigate(['/manga',mangaId]);
this.clearSearch();
}



}
