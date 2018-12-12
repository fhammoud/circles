import {Component} from "@angular/core";
import {CircleService} from "./circle.service";

@Component({
  selector: 'app-circles',
  template: '<router-outlet></router-outlet>',
  providers: [CircleService]
})
export class CirclesComponent { }
