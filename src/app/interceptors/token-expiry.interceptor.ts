import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenExpiryInterceptor implements HttpInterceptor {
  // Injecting the Auth Service to use auth related functions
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Ignoring the api calls to the endpoint which refreshes the token
    if (request.url.includes('/verify')) {
      return next.handle(request);
    }

    // Checking if this request gives a 403 Forbidden Error
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Forbidden) {
          return this.handleRefreshToken(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  // This function calls the Refresh Token Api and then when that call is done it recalls the actual api call
  handleRefreshToken(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('(/) Refreshing the Auth Token .........');

    return this.authService.refreshToken().pipe(
      // Changing this Observable to the actual request observable
      switchMap(() => {
        console.log('(/) Auth Token Refreshed .........');
        return next.handle(request);
      }),

      // If the 403 Forbidden still persists then we logout the user
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Forbidden) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }

        return throwError(() => error);
      })
    );
  }
}
