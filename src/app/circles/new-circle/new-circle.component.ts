import { Component, OnInit } from '@angular/core';
import {StateService} from "../../_shared/services/state.service";
import {CircleService} from "../circle.service";
import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-circle',
  templateUrl: './new-circle.component.html',
  styleUrls: ['./new-circle.component.css']
})
export class NewCircleComponent implements OnInit {
  circleName: FormControl;

  constructor(
    private stateService: StateService,
    private circleService: CircleService,
    private router: Router
  ) { }

  ngOnInit() {
    this.stateService.setTitle('New Circle');
    this.circleName = new FormControl('', Validators.required);
  }

  onNewCircle() {
    let name = this.circleName.value;
    this.circleService.createCircle(name)
      .subscribe(
        () => this.router.navigateByUrl('/circles')
      );
  }
}
