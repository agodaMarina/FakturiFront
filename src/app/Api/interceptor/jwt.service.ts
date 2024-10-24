import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { LoaderService } from '../services/loader.service';

const routesWithoutToken = [
  '/api/v1/auth/register',
  '/api/v1/auth/login',
  '/api/v1/auth/activate_account',
];

@Injectable({
  providedIn: 'root',
})

export class JwtService implements HttpInterceptor {
  requestsCount = 0;
  constructor(
    private tokenService: TokenService,
    private loaderService: LoaderService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();

    const url = request.url;

    if (token && !routesWithoutToken.some((route) => url.includes(route))) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}

/*.pipe(
      finalize(() => {
        this.requestsCount--;

        if (this.requestsCount === 0) {
          this.loaderService.hideLoader();
        }
      })
    );*/
