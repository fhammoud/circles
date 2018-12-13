import { Component, OnInit } from '@angular/core';
import {UserService} from "../user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StateService} from "../_shared/services/state.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'Circles';
  isMainPage: boolean;

  constructor(
    public userService: UserService,
    private stateService: StateService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.stateService.getState()
      .subscribe(state => this.title = state.title);

    this.router.events.subscribe(
      () => {
        this.isMainPage = this.location.path() === ''
      }
    )
  }

  onLogout() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }

  onGoBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
