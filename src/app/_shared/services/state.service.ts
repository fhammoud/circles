import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class StateService {
  private subject = new Subject<any>();

  private state = {
    title: 'Circles',
    isLoggedIn: false,
    isLoading: false
  };

  constructor(private jwtHelperService: JwtHelperService) { }

  setTitle(title: string) {
    this.state.title = title;
    this.subject.next(this.state);
  }

  setIsLoggedIn(value: boolean) {
    this.state.isLoggedIn = value;
    this.subject.next(this.state);
  }

  setIsLoading(value: boolean) {
    this.state.isLoading = value;
    this.subject.next(this.state);
  }

  getUsername(): string {
    const token: string = this.jwtHelperService.tokenGetter();
    return this.jwtHelperService.decodeToken(token).user.username;
  }

  getUserId(): string {
    const token: string = this.jwtHelperService.tokenGetter();
    return this.jwtHelperService.decodeToken(token).user._id;
  }

  getState(): Observable<any> {
    return this.subject.asObservable();
  }

  deleteState() {
    this.state = {
      title: 'Circles',
      isLoggedIn: false,
      isLoading: false
    };
    this.subject.next(this.state);
  }
}
