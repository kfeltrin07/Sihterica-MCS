import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ReadPostRequestMain } from 'src/app/models/models.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
  ) {}

  // START: REST API
  public get(url: string): Observable<any> {
    return this.http.request(
      'GET',
      url
    ).pipe(map(res => res));
  }

  public post(url: string, body: any): Observable<any> {
    return this.http.request(
      'POST',
      url,
      {
        body: body
      }
    ).pipe(map(res => res));
  }

  public postWithParams(url: string, body: ReadPostRequestMain): Observable<any> {
    return this.http.request(
      'POST',
      url,
      {
        body: body
      }
    ).pipe(map(res => res));
  }

  public put(url: string, body: any): Observable<any> {
    return this.http.request(
      'PUT',
      url,
      {
        body: body
      }
    ).pipe(map(res => res));
  }

  public delete(url: string): Observable<any> {
    return this.http.request(
      'DELETE',
      url
    ).pipe(map(res => res));
  }
  // END: REST API
}
