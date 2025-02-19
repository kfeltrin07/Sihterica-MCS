import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SessionUser, LoginBody, LogoutBody, UserMetadata } from 'src/app/models/models.service';
import { CookiesService } from '../cookies/cookies.service';
import { GlobalFunctionsService } from '../global-functions/global-functions.service';
import { GlobalVariablesService } from '../global-variables/global-variables.service';
import { TranslationService } from '../translation/translation.service';
import { MatDialog } from '@angular/material/dialog';
import { LoggingInComponent } from 'src/app/components/dynamic/login/logging-in/logging-in.component';
import { LoggingOutComponent } from 'src/app/components/dynamic/login/logging-out/logging-out.component';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '../sidenav/sidenav.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  @ViewChild('snav') public sidenav!:MatSidenav;

  public loggingInDialogRef: any;
  public loggingOutDialogRef: any;

  constructor(
    public http: HttpClient,
    public globalVar: GlobalVariablesService,
    public globalFn: GlobalFunctionsService,
    public cookies: CookiesService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private t: TranslationService,
    public sidenavservice:SidenavService
  ) { }

  loggedInUser: SessionUser = { // prijavljeni korisnik
    ID: 0,
    owner: '',
    ownerID: '',
    displayedUsername: '',
    username: '',
    password: '',
    sessionID: '',
    roleID: 0,
    ULOGA: '',
    ULOGA_NAZIV: '',
  };

  loginBody: LoginBody = { // koristi se za slanje podataka za prijavu na Login komponenti
    action: 'mySqlSession',
    method: 'PrijaviKorisnika',
    data: {
      pOwner: '',
      pUsername: '',
      pPassword: ''
    }
  };

  logoutBody: LogoutBody = { // koristi se za slanje podataka za prijavu na Login komponenti
    action: 'mySqlSession',
    method: 'OdjaviKorisnika',
    data: {
      pOwner: '',
      pUsername: '',
      pPassword: ''
    }
  };

  public login(userLogin: UserMetadata): void {
    this.openLoggingInDialog();
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'OracleSession',
        method: 'PrijaviKorisnika',
        data: userLogin
      }
    ).subscribe((response: any) => {
      if (response.debugData.sessionInfo.oracleConnectError != 0) {
        if (response.debugData.metadata.OPIS != 'SQL:OK' && response.debugData.metadata.OPIS != 'O.K.') {
          this.openSnackBar(response.debugData.metadata.OPIS, this.t.translate('Okay'));
        }
        //this.loggingInDialogRef.close();
        this.globalVar.loggingInMessage = 'LoginFailed';
      } else {
        if (response.debugData.metadata.OPIS != 'SQL:OK' && response.debugData.metadata.OPIS != 'O.K.') {
          this.openSnackBar(response.debugData.metadata.OPIS, this.t.translate('Okay'));
        }
        this.sidenavservice.setSidenav(this.sidenav);
        this.sessionInfo(response.debugData.sessionInfo.sid);
        this.loggingInDialogRef.close();
        this.cookies.setCookie('logged-in-user-username', userLogin.pUsername ? userLogin.pUsername : "");
        this.cookies.setCookie('logged-in-user-session-id', this.loggedInUser.sessionID);
        this.cookies.setCookie('logged-in-user-owner', userLogin.pOwner ? userLogin.pOwner : "");

        //this.router.navigate(['/dashboard']);
        this.router.navigate(['/selection-screen']);
      }
    });

  }

  public openLoggingInDialog(): void {
    this.loggingInDialogRef = this.dialog.open(LoggingInComponent, {});
    this.loggingInDialogRef.afterClosed().subscribe((result: any) => {
      this.globalVar.loggingInMessage = 'LoggingIn';
    });
  }

  public logout(): void {
    this.dialog.closeAll();
    this.openLoggingOutDialog();
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'OracleSession',
        method: 'OdjaviSesiju',
        data: {
          pSid: this.loggedInUser.sessionID
        }
      }
    ).subscribe((response: any) => {
      if (response.debugData?.metadata?.OPIS != 'SQL:OK' && response.debugData?.metadata?.OPIS != 'O.K.') {
        this.openSnackBar(response.debugDat?.metadata?.OPIS, this.t.translate('Okay'));
      }
      //this.sessionInfo(this.loggedInUser.sessionID);
      this.loggedInUser = {
        ID: 0,
        displayedUsername: "",
        username: "",
        password: "",
        sessionID: "",
        roleID: 0,
        owner: "",
        ownerID: '',
        IDVlasnika: 0,
        ULOGA: "",
        ULOGA_NAZIV: ""
      };
      this.cookies.deleteCookie('logged-in-user-session-id');
      this.loggingOutDialogRef.close();
      this.router.navigate(['/login']);
    });

  }

  public openLoggingOutDialog(): void {
    this.loggingOutDialogRef = this.dialog.open(LoggingOutComponent, {});
    this.loggingOutDialogRef.afterClosed().subscribe((result: any) => { });
  }

  public sessionInfo(sid: string): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'OracleSession',
        method: 'getSessionInfo',
        sid: sid,
        data: {
          pSid: sid
        }
      }
    ).subscribe((response: any) => {
      console.log(response);
      if (response.debugData.metadata.OPIS != 'SQL:OK' && response.debugData.metadata.OPIS != 'O.K.') {
        this.openSnackBar(response.debugData.metadata.OPIS, this.t.translate('Okay'));
      }
      if (response.debugData.sessionInfo.opisAkcije == 'SQL:OK') {
        this.loggedInUser = {
          ID: +response.debugData.data['0'].IDK,
          username: response.debugData.data['0'].USERNAME,
          sessionID: response.debugData.data['0'].SID,
          owner: response.debugData.data['0'].IMEVLASNIKA,
          ownerID: response.debugData.data['0'].IDVLASNIKA,
          ULOGA: response.debugData.data['0'].ULOGA,
          ULOGA_NAZIV: response.debugData.data['0'].ULOGA_NAZIV,
        }
        this.loggingInDialogRef.close();
        this.cookies.setCookie('logged-in-user-id', this.loggedInUser.ID!.toString());
        this.cookies.setCookie('logged-in-user-username', this.loggedInUser.username!.toString());
        this.cookies.setCookie('logged-in-user-session-id', this.loggedInUser.sessionID);
        this.cookies.setCookie('logged-in-user-owner', this.loggedInUser.owner!);
        this.cookies.setCookie('ULOGA', this.loggedInUser.ULOGA!);
        this.cookies.setCookie('ULOGA_NAZIV', this.loggedInUser.ULOGA_NAZIV!);

        this.cookies.setCookie('logged-in-user-owner-id', this.loggedInUser.ownerID!.toString());
        this.cookies.setCookie('logged-in-user-displayed-username', this.loggedInUser.displayedUsername!);
        /*this.cookies.setCookie('logged-in-user-role-id', this.loggedInUser.roleID!.toString());
        this.cookies.setCookie('logged-in-user-password', this.loggedInUser.password!.toString());*/
        //this.router.navigate(['/dashboard']);
        if (this.router.url == '/login') {
          this.router.navigate(['/selection-screen']);
        }
      }
    });

  }

  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  public getDynamicMenu(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Osobe',
        method: 'getDynamicMenu',
        sid: this.loggedInUser.sessionID,
        data: {
          limit: 100,
          page: 1,
          pKorisnikId: this.loggedInUser.ID,
          pSid: this.loggedInUser.sessionID,
        }
      }
    ).subscribe((response: any) => {
      this.globalVar.dynamicMenu = response.debugData.data;
      if (this.globalVar.useDynamicMenus) {
        this.globalVar.sidebarItems = this.globalFn.resetSidebarItems(this.globalVar.sidebarItems);
        this.globalVar.sidebarItems = this.globalFn.filterSidebarItems(this.globalVar.sidebarItems);
        this.globalVar.cVRS = this.globalFn.getComponentFromUrl(this.router.url)?.rightsState;
      }
      if (this.globalVar.dynamicMenu.length == 0) {
        this.globalVar.sidebarItems = this.globalFn.resetSidebarItems(this.globalVar.sidebarItems);
      }
    });
  }


}
