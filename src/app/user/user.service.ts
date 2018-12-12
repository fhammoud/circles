import {Injectable} from "@angular/core";
import {User} from "./user.model";
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {}

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
    localStorage.clear();
  }

  isLoggedIn() {
    let isLoggedIn = false;
    const token: string = this.jwtHelperService.tokenGetter();
    if (token)
      isLoggedIn = !this.jwtHelperService.isTokenExpired(token);

    return isLoggedIn;
  }
}
