import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent{
  processedData: any[] = [];

  constructor(private fileService: FileService) {}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.fileService.processCSV(file, 1000000).then((data) => {
      // Aquí asegúrate de que 'data' sea un array antes de asignarlo
      if (Array.isArray(data)) {
        this.processedData = data;
      } else {
        console.error('Invalid data received from service');
      }
    }).catch((error) => {
      console.error('Error processing CSV:', error);
    });
  }

}
