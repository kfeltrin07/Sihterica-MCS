import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { GlobalVariablesService } from '../global-variables/global-variables.service';
import { LoadingService } from '../loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private loading:LoadingService,
    public globalVar: GlobalVariablesService

  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.globalVar.RequestUrl=request.url;

    this.loading.setLoading(true, request.url);

    return next.handle(request).pipe(        
      finalize(()=>{
      this.loading.setLoading(false, request.url);
  }));
  }
}