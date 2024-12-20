import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SessionService } from '../session/session.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {


  constructor(
    public session: SessionService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Outgoing HTTP request',request)
    return next.handle(request).pipe(tap((event: HttpEvent<any>) =>{
      if (event instanceof HttpResponse) {
        console.log('Incomping HTTP response', event);
        if (event.body.debugData?.metadata?.ERR == -1 && event.body.debugData?.metadata?.OPIS.toLowerCase() == "nema takve sesije" && 
          (request.body.method != 'getGridIzborKolona' && request.body.method != 'getDynamicMenu' &&  
            request.body.method !='getSessionInfo' && request.body.method !='OdjaviSesiju')) {
          this.session.logout();
        }
      }
    }));
  }
}
