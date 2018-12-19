import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Image} from "./image.model";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  images: Image[] = [];

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer) { }

  createImage(circle: string, image: string) {
    return this.http.post('/images/' + circle, {image: image})
      .pipe(map((image: any) => {
        image.data = this.arrayBufferToBase64(image.image.data.data);
        image.data = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + image.data);
        return this.images.unshift(new Image(image._id, image.owner, image.data, image.time));
      }));
  }

  getImages(circle: string) {
    return this.http.get('/images?circleId=' + circle)
      .pipe(map((result: any) => {
        let album = result[0].album;
        this.images = [];
        for (let i = 0; i < album.length; i++) {
          album[i].data = this.arrayBufferToBase64(album[i].image.data.data);
          album[i].data = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + album[i].data);
          this.images.unshift(new Image(album[i]._id, album[i].owner, album[i].data, album[i].time));
        }
        return this.images;
      }));
  }

  getImage(imageId: string) {
    return this.http.get('/images/' + imageId)
      .pipe(map((image: any) => {
        image.data = this.arrayBufferToBase64(image.image.data.data);
        image.data = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + image.data);
        return new Image(image._id, image.owner, image.data, image.time);
      }));
  }

  deleteImage(imageId: string) {
    return this.http.delete('/images/' + imageId);
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
