import {Injectable} from "@angular/core";
import {User} from "./user.model";
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {StateService} from "../_shared/services/state.service";

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private stateService: StateService,
    private jwtHelperService: JwtHelperService) {}

  login(user: User) {
    return this.http.post('/users/login', user)
      .pipe(map((response: string) => {
        localStorage.setItem('token', response);
      }));
  }

  register(user: User) {
    return this.http.post('/users', user)
      .pipe(map((response: string) => {
        localStorage.setItem('token', response);
      }));
  }

  logout() {
    this.stateService.deleteState();
    localStorage.clear();
  }

  isLoggedIn() {
    let isLoggedIn = false;
    const token: string = this.jwtHelperService.tokenGetter();
    if (token)
      isLoggedIn = !this.jwtHelperService.isTokenExpired(token);

    this.stateService.setIsLoggedIn(isLoggedIn);
    return isLoggedIn;
  }
}
