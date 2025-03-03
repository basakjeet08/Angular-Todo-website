import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  // Injecting the auth service to get the tokens
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Ignoring the tokens for the public routes
    if (
      request.url.includes('/verify') ||
      request.url.includes('/login') ||
      request.url.includes('/register')
    ) {
      return next.handle(request);
    }

    const token = this.authService.getToken()?.token;
    if (!token) return next.handle(request);

    // Adding the authorization header to the request
    const modifiedRequest = request.clone({
      headers: request.headers.append('Authorization', `Bearer ${token}`),
    });

    // We are letting the request go to the next set of interceptor or get sent
    return next.handle(modifiedRequest);
  }
}
