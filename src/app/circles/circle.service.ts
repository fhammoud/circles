import {Injectable} from "@angular/core";
import {Circle} from "./circle/circle.model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class CircleService {
  circles: Circle[] = [];
  networkDataReceived = false;
  constructor(private http: HttpClient) { }

  getCircles() {
    return this.http.get('/circles')
      .pipe(map((response: any) => {
        this.networkDataReceived = true;
        let data = response;
        this.circles = [];
        for (let i = 0; i < data.length; i++) {
          this.circles.push(new Circle(data[i].name, data[i]._id, data[i].owner.username));
        }
        return this.circles;
      }));

    /*if ('indexedDB' in window) {
      readAllData('posts')
        .then(function(data) {
          if (!this.networkDataReceived) {
            console.log('From cache', data);
            this.circles = [];
            for (let i = 0; i < data.length; i++) {
              this.circles.push(new Circle(data[i].name, data[i]._id, data[i].owner.username));
            }
            return this.circles;
          }
        });
    }*/
  }

  createCircle(name: string) {
    return this.http.post('/circles', {name: name})
      .pipe(map((response: any) => {
        console.log(response);
      }));
  }

  deleteCircle(id: string) {
    return this.http.delete('/circles/' + id)
      .pipe(map((response: any) => {
        for (let i = 0; i < this.circles.length; i++) {
          if (this.circles[i].id === id)
            this.circles.splice(i, 1);
        }
      }));
  }
}
