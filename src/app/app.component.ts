import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { Language } from './models/models.service';
import { CookiesService } from './services/cookies/cookies.service';
import { GlobalFunctionsService } from './services/global-functions/global-functions.service';
import { GlobalVariablesService } from './services/global-variables/global-variables.service';
import { SessionService } from './services/session/session.service';
import { SidenavService } from './services/sidenav/sidenav.service';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('snav') public sidenav!: MatSidenav;

  public translationLoaded: boolean = true;

  constructor(
    public session: SessionService,
    public globalVar: GlobalVariablesService,
    public globalFn: GlobalFunctionsService,
    private elementRef: ElementRef,
    private cookies: CookiesService,
    private router: Router,
    private http: HttpClient,
    public sidenavService: SidenavService,

  ) {
    if (environment.production) {
      window.console.log = () => { }
    }
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.getDynamicMenu();

      }
    });
    console.log(this.globalVar.env)
  }

  public ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
    if (this.globalVar.autoLogin) {
      /*this.session.login({
        pUsername: 'dejan',
        pPassword: 'd'
      });*/
      this.elementRef.nativeElement.style.setProperty('--screen-height-offset', '64px');
    }

    this.getCookies();

  }

  public getCookies(): void {
    this.session.loggedInUser.ID = +this.cookies.getCookie('logged-in-user-id');
    this.session.loggedInUser.username = this.cookies.getCookie('logged-in-user-username');
    this.session.loggedInUser.sessionID = this.cookies.getCookie('logged-in-user-session-id');
    this.session.loggedInUser.owner = this.cookies.getCookie('logged-in-user-owner');
    this.session.loggedInUser.ownerID = this.cookies.getCookie('logged-in-user-owner-id');
    this.session.loggedInUser.ULOGA = this.cookies.getCookie('ULOGA');
    this.session.loggedInUser.ULOGA_NAZIV = this.cookies.getCookie('ULOGA_NAZIV');

    if (this.cookies.getCookie('selected-language') != '') {
      this.globalVar.selectedLanguage = this.cookies.getCookie('selected-language') as Language;
    }
  }

  public getDynamicMenu(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Osobe',
        method: 'getDynamicMenu',
        sid: this.session.loggedInUser.sessionID,
        data: {
          limit: 1000,
          page: 1,
          pKorisnikId: this.session.loggedInUser.ID,
          pSid: this.session.loggedInUser.sessionID,
        }
      }
    ).subscribe((response: any) => {
      this.globalVar.dynamicMenu = response.debugData?.data;
      //console.log(this.router.url)
      if (this.globalVar.useDynamicMenus) {
        this.globalVar.sidebarItems = this.globalFn.resetSidebarItems(this.globalVar.sidebarItems);
        this.globalVar.sidebarItems = this.globalFn.filterSidebarItems(this.globalVar.sidebarItems);
        this.globalVar.cVRS = this.globalFn.getComponentFromUrl(this.router.url)?.rightsState;
        console.log(this.globalVar.sidebarItems);
        this.checkRole();

        //console.log(this.globalVar.cVRS);
      }
      if (this.globalVar.dynamicMenu?.length == 0) {
        this.globalVar.sidebarItems = this.globalFn.resetSidebarItems(this.globalVar.sidebarItems);
      }
    });
  }

  public checkRole() {
    for (let sidebar of this.globalVar.sidebarItems) {
      for (let dashboard of this.globalVar.dashboardItems) {
        for (let sidebarsubitem of sidebar.children!) {
          for (let dasboardsubitem of dashboard.items) {
            if (dasboardsubitem.name == sidebarsubitem.name && dasboardsubitem.url == sidebarsubitem.url)
              dasboardsubitem.rightsState = sidebarsubitem.rightsState;
            if (dasboardsubitem.rightsState != 0) {
              dashboard.rightsState = dasboardsubitem.rightsState;
            }
          }
        }
      }
    }
    console.log(this.globalVar.dashboardItems)
  }
  title = 'sihterica-projekt';
}
