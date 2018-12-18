import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Image} from "./image.model";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  images: Image[] = [];

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer) { }

  getImages(circle: string) {
    return this.http.get('/images?circleId=' + circle)
      .pipe(map((result: any) => {
        let album = result[0].album;
        for (let i = 0; i < album.length; i++) {
          album[i].data = this.arrayBufferToBase64(album[i].image.data.data);
          album[i].data = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + album[i].data);
          this.images.unshift(album[i]);
        }
        return this.images;
      }));
  }

  createImage(circle: string, image: string) {
    return this.http.post('/images/' + circle, {image: image})
      .pipe(map((image: any) => {
        image.data = this.arrayBufferToBase64(image.image.data.data);
        image.data = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + image.data);
        return this.images.unshift(image);
      }));
  }

  createImageFallback(circle: string, image: any) {
    return this.http.post('/images/' + circle, image)
      .pipe(map((image: any) => {
        image.data = this.arrayBufferToBase64(image.image.data.data);
        image.data = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + image.data);
        return this.images.unshift(image);
      }));
  }

  arrayBufferToBase64( buffer ) {
    let binary = '';
    let bytes = new Uint8Array( buffer );
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }
}
