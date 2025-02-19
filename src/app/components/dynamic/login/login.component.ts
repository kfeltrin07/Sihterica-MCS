import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Konekcija, Owner, UserMetadata } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { CookiesService } from 'src/app/services/cookies/cookies.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,


    TranslationPipe,
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  @HostListener('window:keydown.Control.Shift.F11', ['$event']) scrollUp(event: KeyboardEvent) {
    if (this.globalVar.env == 'mcs'||'production'||'development') {
      this.show();
    }
  };


  public vlasnici: Owner[] = [];
  public vlasnik: Owner = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    ID_KORISNIKA: "",
    ID_VLASNIKA: "",
    NAZIV_VLASNIKA: "",
    USERNAME: ""
  }

  public selectedValue: string = "";
  public showKonekcije: boolean = false;
  public selected1: string = "";

  public konekcije: Konekcija[] = this.globalVar.konekcije[this.globalVar.env];

  public obscurePassword: boolean = true;
  /*public userLogin: UserMetadata = {
    pOwner: 'demo',
    pUsername: 'demo',
    pPassword: 'demode94'
  };*/
  public userLogin: UserMetadata = {
    pOwner: 'čistoća',
    pUsername: '',
    pPassword: ''
  };

  constructor(
    public t: TranslationService,
    public http: HttpClient,
    public globalVar: GlobalVariablesService,
    public session: SessionService,
    public dialog: MatDialog,
    public cookies: CookiesService,

  ) { }


  public ngOnInit(): void {
    this.globalVar.loggingInMessage = 'LoggingIn';
    this.getCookies();
    if (this.session.loggedInUser) {
      this.userLogin.pUsername = this.session.loggedInUser.username ? this.session.loggedInUser.username : "";
    }
  }

  public toggleObscurity(): void {
    this.obscurePassword = !this.obscurePassword;
  }

  public login(): void {
    this.session.login(this.userLogin);
  }

  public show(): void {
    if (this.showKonekcije == false) {
      this.showKonekcije = true
    }
    else {
      this.showKonekcije = false
    }
  }

  public changeConnection(selected: Konekcija) {

    this.selected1 = selected.value;

    for (var item of this.globalVar.konekcijeAPIFile[this.globalVar.env]) {
      if (item.viewValue == selected.viewValue) {
        this.globalVar.APIFile = item.value
      }
    }

    for (var item of this.globalVar.konekcijeAPIReport[this.globalVar.env]) {
      if (item.viewValue == selected.viewValue) {
        this.globalVar.APIReport = item.value
      }
    }

    this.cookies.setCookie('connected-APIFile', this.globalVar.APIFile);
    this.cookies.setCookie('connected-APIReport', this.globalVar.APIReport);
    this.cookies.setCookie('connected-database', this.selected1);

    this.globalVar.APIHost = this.selected1;
    console.log(this.globalVar.APIHost);
  }

  public getCookies(): void {
    this.session.loggedInUser.ID = +this.cookies.getCookie('logged-in-user-id');
    this.session.loggedInUser.username = this.cookies.getCookie('logged-in-user-username');
    this.session.loggedInUser.sessionID = this.cookies.getCookie('logged-in-user-session-id');
    this.session.loggedInUser.owner = this.cookies.getCookie('logged-in-user-owner');
    this.session.loggedInUser.ownerID = this.cookies.getCookie('logged-in-user-owner-id');
    this.session.loggedInUser.IDVlasnika = +this.cookies.getCookie('logged-in-user-id-vlasnika');
    this.session.loggedInUser.displayedUsername = this.cookies.getCookie('logged-in-user-displayed-username');
    this.session.loggedInUser.password = this.cookies.getCookie('logged-in-user-password');
    this.session.loggedInUser.roleID = +this.cookies.getCookie('logged-in-user-role-id');

  }

  /*
  public getVlasnika(): void {
    this.vlasnici = []
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Osobe',
        method: 'getVlasniciZaOsobu',
        data: {
          pUsername: this.userLogin.pUsername,
          limit:1000,
          sort: [
            {
              property: "NAZIV_VLASNIKA",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      if(response.debugData?.data){
        if (response.debugData?.data?.length == 0) {
          this.vlasnici.push({
            UKUPANBROJSLOGOVA: 1,
            RN: 1,
            ID_KORISNIKA: "",
            ID_VLASNIKA: "",
            NAZIV_VLASNIKA: "NO OWNERS",
            USERNAME: ""
          })
        }
        else {
          this.vlasnici = response.debugData.data;
          const foundUser = this.vlasnici.find(u => u.NAZIV_VLASNIKA.toLowerCase() === this.userLogin.pOwner.toLowerCase());
          if (foundUser) {
            console.log("I found the owner");
            this.vlasnik = foundUser;
            console.log(this.vlasnik);
            console.log(foundUser);
  
          }
          else{
            this.vlasnik=response.debugData.data[0]
          }
        }
      }
      
    });
  }*/
}
