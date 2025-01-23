import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { GlobalVariablesService } from '../global-variables/global-variables.service';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor(
    public globalVar: GlobalVariablesService,
  ) { }

  private sidenav!: MatSidenav;


  public setSidenav(sidenav: MatSidenav) {
    this.globalVar.sideNav = sidenav;
  }

  public open() {
    return this.globalVar.sideNav.open();
  }


  public close() {
    return this.globalVar.sideNav.close();
  }

  public toggle(): void {
    this.globalVar.sideNav.toggle();
  }
}
