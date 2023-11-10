import { Component, OnInit } from '@angular/core';
import { DatoManga, Manga } from '../../interfaces/manga.interface';
import { MangaService } from '../../services/manga.service';
import { GeneralGenreManga, generalDatumManga } from '../../interfaces/generalGenresManga.interfaces';
import { DatumGenreByManga, DatumGenreManga } from '../../interfaces/mangaGenresBy.interfaces';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

mangaList: DatumGenreByManga[]=[];
currentPage = 1 ;
genreManga:generalDatumManga[]=[];
selectedGenreManga:number | null = null;

constructor( private mangaService:MangaService, private router:Router,private activatedRoute:ActivatedRoute){}

ngOnInit(): void {
this.loadGenres();
  this.loadMangaList();
}

loadMangaList() {
  this.mangaService.getPaginationManga(this.currentPage).subscribe((data: Manga) => {
if(this.selectedGenreManga){
this.mangaService.getGenreByManga(this.selectedGenreManga,this.currentPage).subscribe((filterManga:DatumGenreManga)=>{
this.mangaList = filterManga.data;
this.scrollToTop();
})
}else{
  this.mangaList = data.data;
}
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

loadGenres(){
this.mangaService.getAllGenres().subscribe((data:GeneralGenreManga)=>{
this.genreManga=data.data;
console.log('GENEROS',this.genreManga)
})
}

filterByGenreManga(genreId:number | null):void{
this.selectedGenreManga=genreId;
this.currentPage=1;
this.loadMangaList();


}



scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

}
