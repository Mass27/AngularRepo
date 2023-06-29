import { Component, OnInit } from '@angular/core';
import { DatoManga } from '../../interfaces/manga.interface';
import { MangaService } from '../../services/manga.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-info-manga',
  templateUrl: './info-manga.component.html'
})
export class InfoMangaComponent implements OnInit {

manga:DatoManga | undefined;

constructor( private mangaService:MangaService,
             private ActivatedRoute:ActivatedRoute,
              private router:Router  ){}


ngOnInit(): void {


  const mangaId = this.ActivatedRoute.snapshot.params['id'];
    this.getMangaDetails(mangaId);

}

getMangaDetails(mangaId: number): void {
  this.mangaService.getMangaById(mangaId).subscribe(
    (manga: DatoManga) => {
      console.log(manga); 
      this.manga = manga;
    },
    (error) => {
      console.error('Error al obtener los detalles del manga', error);
      this.router.navigate(['/manga/list']);
    }
  );
}



goBack() {
  this.router.navigateByUrl('manga/list');
}



}
