import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {User} from "../user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import {ErrorComponent} from "../../_shared/error/error.component";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  returnUrl: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.user = new User(
      this.loginForm.value.username,
      this.loginForm.value.password
    );

    this.userService.login(this.user)
      .subscribe(() => {
        this.router.navigateByUrl('/');
      }, (err: HttpErrorResponse) => {
        this.dialog.open(ErrorComponent, {data: err.error.message});
      });
  }
}
