import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NotifyService } from './services';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private notifyService: NotifyService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Client-side error.
          errorMessage = `Error: ${error.error.message}`;
        } else {
          console.log(error.error.Message);

          // Server-side error.
          errorMessage = error.error.Message
            ? error.error.Message
            : `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this.notifyService.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
