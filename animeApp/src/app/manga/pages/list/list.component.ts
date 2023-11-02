import { Component, OnInit } from '@angular/core';
import { DatoManga, Manga } from '../../interfaces/manga.interface';
import { MangaService } from '../../services/manga.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

mangaList: DatoManga[]=[];
currentPage = 1 ;

constructor( private mangaService:MangaService){}

ngOnInit(): void {
  // this.mangaService.getAllManga().subscribe( (data) => {
  //   this.mangaList = data.data;
  //   console.log(this.mangaList)
  // });
  this.loadMangaList();
}

loadMangaList() {
  this.mangaService.getPaginationManga(this.currentPage).subscribe((data: Manga) => {
    this.mangaList = data.data;
    console.log(this.mangaList)
    this.scrollToTop();
  });
}

nextPage() {
  this.currentPage++;
  this.loadMangaList();
}
previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.loadMangaList();
  }
}

scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

}
