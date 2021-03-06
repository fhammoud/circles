import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../user.model";
import {Router} from "@angular/router";
import {ErrorComponent} from "../../_shared/error/error.component";
import {MatDialog} from "@angular/material";
import {registerValidator} from "./register.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User;

  constructor(private userService: UserService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordConfirm: new FormControl('', registerValidator('password'))
    });
  }

  onSubmit() {
    this.user = new User(
      this.registerForm.value.username,
      this.registerForm.value.password
    );

    this.userService.register(this.user)
      .subscribe(() => {
        this.router.navigateByUrl('/');
      }, err => {
        this.dialog.open(ErrorComponent, {data: err.error.message});
      });
  }
}
