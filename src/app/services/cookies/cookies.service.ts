import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  
  constructor(
    private ngxCookieService: CookieService
  ) { }

  // START: cookies
  setCookie(key: string, value: string) {
    this.ngxCookieService.set(key, value);
  }

  getCookie(key: string) {
    return this.ngxCookieService.get(key);
  }
   
  deleteCookie(key: string) {
    this.ngxCookieService.delete(key);
  }
   
  deleteAllCookies() {
    this.ngxCookieService.deleteAll();
  }
  // END: cookies
}
