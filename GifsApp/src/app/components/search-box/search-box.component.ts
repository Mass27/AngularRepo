import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from 'src/app/services/gifs.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {


  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;


  constructor( private gifsService: GifsService ) { }


  // searchTag( newTag: string ) {
  searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag( newTag );

    this.tagInput.nativeElement.value = '';

  }





}
