import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { Gif, search } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {


  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey: string = 'LeLdsFk7lmdbz7au9rlvNtscjsCiZdDM';
  private apiUrl: string = environments.apiKUrl;

  constructor(private http: HttpClient) {}

  searchTag(tag: string): void {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<search>(`${this.apiUrl}/search`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
        // console.log({ gifs: this.gifList });
      });
  }

// searchTag(): void {
//   const url = `${this.apiUrl}/search?api_key=${this.apiKey}`;

//   this.http.get<Gif[]>(url).subscribe(
//     (response) => {
//       this.gifList = response;
//       console.log('Respuesta de la petición GET:', response);
//     },
//     (error) => {
//       console.error('Error en la petición GET:', error);
//     }
//     );
//   }

}
