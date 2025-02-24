import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { GlobalVariablesService } from '../global-variables/global-variables.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  public sideNavToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null);

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
    return this.sideNavToggleSubject.next(null);
  }

}
