import {Component, Input, OnInit} from '@angular/core';
import {Circle} from "./circle.model";
import {CircleService} from "../circle.service";
import {StateService} from "../../_shared/services/state.service";

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit {
  @Input() circle: Circle;

  constructor(private circleService: CircleService) { }

  ngOnInit() {
  }

  onCircleDelete() {
    this.circleService.deleteCircle(this.circle.id).subscribe();
  }
}
