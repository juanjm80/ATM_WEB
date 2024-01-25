import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //debugger;
    let newCloneRequest = request
    const token = localStorage.getItem('loginTOken');
    if (token != null) {
       newCloneRequest = request.clone({
        setHeaders:{
          Authorization: `Bearer ${token}`
        }
      })
    }    
    return next.handle(newCloneRequest);
  }
}
