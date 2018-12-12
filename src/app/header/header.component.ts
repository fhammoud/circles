import { Component, OnInit } from '@angular/core';
import {UserService} from "../user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StateService} from "../_shared/services/state.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'Circles';

  constructor(
    public userService: UserService,
    private stateService: StateService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.stateService.getState()
      .subscribe(state => this.title = state.title);
  }

  onLogout() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }

  onGoBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
