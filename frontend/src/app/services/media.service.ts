import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gallery } from '../models/Gallery';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) { }

  getGallery() {
    let configUrl = 'http://localhost:8080/medias';
    return this.http.get<Gallery>(configUrl);
  }
}
