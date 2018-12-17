import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from "@angular/common/http";
import {environment} from "../environments/environment";
import {catchError, finalize} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {StateService} from "./_shared/services/state.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private stateService: StateService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.stateService.setIsLoading(true);
    const duplicate = req.clone({url: environment.origin + req.url});

    return next.handle(duplicate)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }),
        finalize(() => {
          this.stateService.setIsLoading(false);
        })
      );
  }
}
