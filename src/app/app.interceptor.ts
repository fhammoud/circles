import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from "@angular/common/http";
import {environment} from "../environments/environment";
import {catchError} from "rxjs/operators";
import {Observable} from "rxjs";

export class AppInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const duplicate = req.clone({url: environment.origin + req.url});

    return next.handle(duplicate)
      .pipe(catchError((error: HttpErrorResponse) => {
        return Observable.throw(error);
      }));
  }
}
