import {Component, OnInit} from "@angular/core";
import {Circle} from "./circle/circle.model";
import {CircleService} from "./circle.service";
import {StateService} from "../_shared/services/state.service";


@Component({
  selector: 'app-circle-list',
  templateUrl: './circle-list.component.html',
  styleUrls: ['./circle-list.component.css']
})
export class CircleListComponent implements OnInit {
  user: string;
  circles: Circle[] = [];

  constructor(
    private circleService: CircleService,
    private stateService: StateService) { }

  ngOnInit() {
    this.stateService.setTitle('Circles');
    this.user = this.stateService.getUsername();

    this.circleService.getCircles()
      .subscribe((circles: Circle[]) => this.circles = circles);
  }
}
