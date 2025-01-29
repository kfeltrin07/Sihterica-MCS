import { Component, ChangeDetectionStrategy, OnChanges, SimpleChanges, Injectable, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Subject } from 'rxjs';
import {
  CalendarCommonModule,
  CalendarDateFormatter,
  CalendarDayModule,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarEventTitleFormatter,
  CalendarModule,
  CalendarMonthModule,
  CalendarMonthViewDay,
  CalendarNativeDateFormatter,
  CalendarView,
  CalendarWeekModule,
  DateFormatterParams,
  DAYS_OF_WEEK,
} from 'angular-calendar';

import { FormsModule } from '@angular/forms';
import { formatDate, CommonModule } from '@angular/common';
import { colors, colorsHoliday, HeaderGrupniUnosComponent } from './header-grupni-unos/header-grupni-unos.component';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { MatButtonModule } from '@angular/material/button';
import { addDays, getDate, getYear, startOfDay } from 'date-fns';
import { CustomEventTitleFormatter } from './custom-event-formatter.provider';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { CRUDAction, EvidencijaMjesecna, Grupe, EvidencijaRadVreOj, Sheme, VrstePosla, ZaposleniPoGrupiIShemi } from 'src/app/models/models.service';
import { EventGrupniUnosComponent } from './event-grupni-unos/event-grupni-unos.component';
import { PickGrupeComponent } from '../../pickers/pick-grupe/pick-grupe.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PickVrstaPoslaComponent } from '../../pickers/pick-vrsta-posla/pick-vrsta-posla.component';
import { PickPopisRadnikaGrupeComponent } from '../../pickers/pick-popis-radnika-grupe/pick-popis-radnika-grupe.component';
import { PickOrgJediniceComponent } from '../../pickers/pick-org-jedinice/pick-org-jedinice.component';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { DnevnaEvidencijaComponent } from '../dnevna-evidencija/dnevna-evidencija.component';
import { PickEvidencijaHelpOjComponent } from '../../pickers/pick-evidencija-help-oj/pick-evidencija-help-oj.component';



@Component({
  selector: 'app-grupni-unos',
  standalone: true,
  imports: [
    HeaderGrupniUnosComponent,
    CalendarDayModule,
    CalendarWeekModule,
    CalendarMonthModule,
    CalendarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatAutocompleteModule,

    FormsModule,
    CommonModule,
    TranslationPipe
  ],
  templateUrl: './grupni-unos.component.html',
  styleUrl: './grupni-unos.component.scss',
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
    /*
        {
          provide: CalendarEventTitleFormatter,
          useClass: CustomEventTitleFormatter
        }*/
  ],
})
export class GrupniUnosComponent implements OnInit {

  public sheme: Sheme[] = [];
  public Sheme: Sheme = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIF_SHEME: "",
    OPIS: "",
    OD: "",
    DO: "",
    PAUZA_OD: "",
    PAUZA_DO: "",
  };

  public GrupeDropdownIndex: number = -1;
  public offeredGrupe: Grupe[] = [];
  public filteredGrupe: Grupe[] = [];
  public selectedGrupe: Grupe = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    ID_GRUPE: "",
    NAZ_GRUPE: "",
    SIF_SHEME: "",
    SIF_OJ: "",
    NAZ_OJ: "",
    NAZ_SHEME: ""

  };

  public grupe: Grupe[] = [];
  public Grupe: Grupe = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    ID_GRUPE: "",
    NAZ_GRUPE: "",
    SIF_SHEME: "",
    SIF_OJ: "",
    NAZ_OJ: "",
    NAZ_SHEME: ""

  };

  public VrstePoslaDropdownIndex: number = -1;
  public offeredVrstePosla: VrstePosla[] = [];
  public filteredVrstePosla: VrstePosla[] = [];
  public selectedVrstePosla: VrstePosla = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIFVLAS: "",
    SIF_VP: "",
    NAZ_VP: "",
    SI: "",
  };

  public ZaposleniPoGrupiIShemiDropdownIndex: number = -1;
  public offeredZaposleniPoGrupiIShemi: ZaposleniPoGrupiIShemi[] = [];
  public filteredZaposleniPoGrupiIShemi: ZaposleniPoGrupiIShemi[] = [];
  public selectedZaposleniPoGrupiIShemi: ZaposleniPoGrupiIShemi = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIFVLAS: "",
    ID_GRUPE: "",
    SIF_SHEME: "",
    NAZ_SHEME: "",
    OD: "",
    DO: "",
    SATI: "",
    ID_RADNIKA: "",
    NAZIV_RADNIKA: "",
    SIF_RM: "",
    NAZ_RM: "",
    SIF_OJ: "",
    NAZ_OJ: ""
  };

  public EvidencijaRadVreOjDropdownIndex: number = -1;
  public offeredEvidencijaRadVreOj: EvidencijaRadVreOj[] = [];
  public filteredEvidencijaRadVreOj: EvidencijaRadVreOj[] = [];
  public selectedEvidencijaRadVreOj: EvidencijaRadVreOj = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIF_OJ: "",
    NAZMJTR: "",
    VRSTA: "",
  };

  public zaposleniPoGrupiIShemi: ZaposleniPoGrupiIShemi[] = [];

  public evidencijaMjesecna: EvidencijaMjesecna[] = [];


  public varNames: any = {
    NAZ_GRUPE: "",
    SIF_VP: "",
    ID_GRUPE: "",
    ID_RADNIKA: "",
    NAZ_OJ: "",
    SIFMJTR: "%",
    SIF_OJ: "%",
  }


  view: CalendarView = CalendarView.Month;
  locale: string = 'hr-HR';

  public match: boolean = false;

  viewDate = new Date();
  activeDayIsOpen = false;
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];



  refresh = new Subject<void>();

  constructor(
    public http: HttpClient,
    public globalVar: GlobalVariablesService,
    public globalFn: GlobalFunctionsService,
    public session: SessionService,
    public dialog: MatDialog,
    public router: Router,
  ) { }


  public ngOnInit(): void {
    //this.getSheme();
    this.getGrupeEvents();
    this.getHolidays();
    this.GetInitialGrupe();
    this.OfferedEvidencijaRadVreOj();
    this.OfferedVrstePosla();
    this.getEvidencijaMjesecna();
  }

  public beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      day.badgeTotal = day.events.filter(
        (event) => event.meta.incrementsBadgeTotal
      ).length;
    });
  }

  public changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }

  public clearCalendar(): void {
    this.globalVar.events = [];
    this.getHolidays();
  }

  public eventDropped({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    console.log(newStart);
    newStart.setHours(event.meta.OD.substring(0, 2), event.meta.OD.substring(3, 4));
    console.log(newStart);

    if(!newEnd){
      newEnd = new Date(newStart);
      console.log(newEnd);
    }
    newEnd?.setHours(event.meta.DO.substring(0, 2), event.meta.DO.substring(3, 4));

    console.log(newEnd);

    let match: boolean = false;
    const newEvent: CalendarEvent = {
      id: this.globalVar.events.length,
      title: event.title,
      start: newStart,
      end: newEnd,
      color: event.color,
      draggable: event.draggable,
      meta: event.meta,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    }
    this.globalVar.events = this.globalVar.events.map((iEvent) => {
      if (iEvent === event) {
        match = true;
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      if (iEvent !== event && match == false) {

        match = false
      }

      return iEvent;
    });

    if (match == false) {
      this.globalVar.events = [...this.globalVar.events, newEvent];
    }
  }

  public eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();

  }

  public deleteEvent(eventToDelete: CalendarEvent) {
    this.globalVar.events = this.globalVar.events.filter((event) => event !== eventToDelete);
  }

  public externalDropSheme(event: CalendarEvent) {
    if (this.globalVar.externalShemeEvents.indexOf(event) === -1) {
      this.globalVar.events = this.globalVar.events.filter((iEvent) => iEvent !== event);
    }
  }

  public externalDropGrupe(event: CalendarEvent) {
    if (this.globalVar.externalShemeEvents.indexOf(event) === -1) {
      this.globalVar.events = this.globalVar.events.filter((iEvent) => iEvent !== event);
    }
  }

  public getSheme(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getSheme',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: '%%',
          pSifSheme: '',
          limit: 100000,
          page: 1,
          sort: [
            {
              property: 'SIF_SHEME',
              direction: 'ASC'
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.sheme = response.debugData.data;
      let index = 0;
      let colorindex = 0;

      for (let shema of this.sheme) {
        let date: Date = new Date();

        let dateOd: Date = new Date(date.getFullYear(), date.getMonth(), date.getDay(), +shema.OD.substring(0, 2), +shema.OD.substring(3, 4));
        let dateDo: Date = new Date(date.getFullYear(), date.getMonth(), date.getDay(), +shema.DO.substring(0, 2), +shema.DO.substring(3, 4));

        if (index == colors.length) {
          colorindex = 0
        }
        this.globalVar.externalShemeEvents = [...this.globalVar.externalShemeEvents, {
          id: index,
          title: shema.OPIS,
          start: dateOd,
          end: (dateDo < dateOd) ? addDays(dateDo, 1) : dateDo,
          color: colors[colorindex],
          draggable: true,
          meta: {
            OD: shema?.OD,
            DO: shema?.DO,
            SIF_SHEME: shema?.SIF_SHEME,
            OPIS: shema?.OPIS,
            PAUZA_DO: shema?.PAUZA_DO,
            PAUZA_OD: shema?.PAUZA_OD,
            UKUPANBROJSLOGOVA: shema?.UKUPANBROJSLOGOVA,
            RN: shema?.RN,
            NOVASHEMA: true,
            incrementsBadgeTotal: true,

          },
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        }];
        index++;
        colorindex++;
      }
      this.refresh.next();

    });
  }

  public getGrupeEvents(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getGrupe',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: '%%',
          pSifSheme: '',
          pIdKorisnika: this.session.loggedInUser.ID,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "ID_GRUPE",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      console.log(response);
      this.grupe = response.debugData.data;



      let index = 0;
      let colorindex = 0;

      for (let grupe of this.grupe) {

        this.http.post(
          this.globalVar.APIHost + this.globalVar.APIFile,
          {
            action: 'Sihterica',
            method: 'getSheme',
            sid: this.session.loggedInUser.sessionID,
            data: {
              pDioNaziva: '%%',
              pSifSheme: grupe.SIF_SHEME,
              limit: 100000,
              page: 1,
              sort: [
                {
                  property: 'SIF_SHEME',
                  direction: 'ASC'
                }
              ]
            }
          }
        ).subscribe((response: any) => {
          console.log(response);

          let shema = response.debugData.data[0];

          let date: Date = new Date();

          let dateOd: Date = new Date(date.getFullYear(), date.getMonth(), date.getDay(), +shema.OD.substring(0, 2), +shema.OD.substring(3, 4));
          let dateDo: Date = new Date(date.getFullYear(), date.getMonth(), date.getDay(), +shema.DO.substring(0, 2), +shema.DO.substring(3, 4));

          if (index == colors.length) {
            colorindex = 0
          };

          if (!this.globalVar.externalGrupeEvents.find((iEvent) => iEvent.meta.ID_GRUPE === grupe.ID_GRUPE)) {
            this.globalVar.externalGrupeEvents = [...this.globalVar.externalGrupeEvents, {
              id: index,
              title: grupe.NAZ_GRUPE,
              start: dateOd,
              end: (dateDo < dateOd) ? addDays(dateDo, 1) : dateDo,
              color: colors[colorindex],
              draggable: true,
              meta: {
                OD: shema?.OD,
                DO: shema?.DO,
                NAZ_GRUPE: grupe?.NAZ_GRUPE,
                ID_GRUPE: grupe?.ID_GRUPE,
                SIF_OJ: grupe?.SIF_OJ,
                NAZ_OJ: grupe?.NAZ_OJ,
                NAZ_SHEME: shema?.OPIS,
                SIF_SHEME: shema?.SIF_SHEME,
                OPIS: shema?.OPIS,
                PAUZA_DO: shema?.PAUZA_DO,
                PAUZA_OD: shema?.PAUZA_OD,
                UKUPANBROJSLOGOVA: shema?.UKUPANBROJSLOGOVA,
                RN: shema?.RN,
                NOVASHEMA: true,
                type: 'grupa',
                incrementsBadgeTotal: true,

              },
              resizable: {
                beforeStart: true,
                afterEnd: true,
              },
            }];
          };


          index++;
          colorindex++;
        });
      };
    });
  }

  public eventClicked(event: any): void {
    console.log('event clicked');
    if (event.meta?.type != 'holiday') {
      const dialogRef = this.dialog.open(EventGrupniUnosComponent, {
        data: event
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.globalVar.events = this.globalVar.events.map((iEvent) => {
            if (iEvent === event) {
              return {
                ...event,
                title: result.title,
                start: result.start,
                end: result.end,
                color: result.color,
                meta: result.meta,
                draggable: result.draggable,
                resizable: result.resizable,
              };
            }
            return iEvent;
          });
        }
      });
    }

  }


  public getHolidays() {
    let date: Date = new Date();

    this.http.get('https://openholidaysapi.org/PublicHolidays?countryIsoCode=HR&languageIsoCode=HR&validFrom=' + (date.getFullYear() - 1) + '-01-01&validTo=' + date.getFullYear() + '-12-31'

    ).subscribe((response: any) => {
      this.globalVar.events = response.map((holiday: any) => {
        return {
          start: new Date(holiday.startDate),
          title: holiday.name[0].text,
          allDay: true,
          color: colorsHoliday[0],
          meta: {
            type: 'holiday',
            holiday,
            incrementsBadgeTotal: false,
          },
        }
      });
    });

  }







  // GRUPE START
  public pickGrupe(): void {
    const dialogRef = this.dialog.open(PickGrupeComponent, {});

    dialogRef.afterClosed().subscribe((Grupe?: Grupe) => {
      this.setGrupeFromDialog(Grupe);
    });
  }

  public setGrupeFromDialog(Grupe?: Grupe): void {
    if (Grupe) {
      this.varNames.ID_GRUPE = Grupe.ID_GRUPE;
      this.varNames.NAZ_GRUPE = Grupe.NAZ_GRUPE;
    }
  }

  public removeGrupe(e: Event): void {
    e.preventDefault();
    this.varNames.ID_GRUPE = "";
    this.varNames.NAZ_GRUPE = "";

  }

  public refreshGrupe(searchParam: string, isSelected: boolean): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getGrupe',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: '%' + searchParam + '%',
          pSifSheme: '',
          pIdKorisnika: this.session.loggedInUser.ID,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "ID_GRUPE",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      console.log(response);
      this.offeredGrupe = response.debugData.data;
      this.filteredGrupe = this.offeredGrupe;
      console.log(isSelected);
      var dummyEl = document.getElementById('offeredGrupe1-help-span');
      var isFocused = (document.activeElement === dummyEl);
      if (!isSelected && isFocused) {
        document.getElementById("offeredGrupe1-dropdown")?.classList.add("select-dropdown-content-visible");
      }
    });
  }

  public OfferedGrupe(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getGrupe',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: this.varNames.ID_GRUPE,
          pSifSheme: '',
          pIdKorisnika: this.session.loggedInUser.ID,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "ID_GRUPE",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {

      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredGrupe = response.debugData.data;
      for (let item of this.offeredGrupe) {
        if (item.ID_GRUPE.toUpperCase() === this.varNames.ID_GRUPE.toUpperCase()) {
          this.varNames.NAZ_GRUPE = item.NAZ_GRUPE;
          this.varNames.ID_GRUPE = item.ID_GRUPE;
        }
      }
    });
  }

  public GetInitialGrupe(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getGrupe',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: '',
          pSifSheme: '',
          pIdKorisnika: this.session.loggedInUser.ID,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "ID_GRUPE",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.varNames.NAZ_GRUPE = response.debugData.data[0].NAZ_GRUPE;
      this.varNames.ID_GRUPE = response.debugData.data[0].ID_GRUPE;
    });
  }

  public filterGrupe(text: string): void {
    if (!text) {
      this.refreshGrupe("", false);
      return;
    }

    this.offeredGrupe = this.filteredGrupe.filter(
      item => item?.ID_GRUPE.toLowerCase().includes(text.toLowerCase())
    );

    if (this.offeredGrupe.length == 0) {
      this.refreshGrupe(text, false);
    }
  }

  public selectGrupe(Grupe: Grupe): void {
    this.varNames.ID_GRUPE = Grupe.ID_GRUPE;
    this.varNames.NAZ_GRUPE = Grupe.NAZ_GRUPE;
    document.getElementById("offeredGrupe1-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.GrupeDropdownIndex = -1;
  }

  public resetGrupeIndex(): void {
    this.GrupeDropdownIndex = -1;
    document.getElementById("offeredGrupe1-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //GRUPE END


  // VRSTA POSLA START
  public pickVrstePosla(): void {
    const dialogRef = this.dialog.open(PickVrstaPoslaComponent, {});

    dialogRef.afterClosed().subscribe((VrstePosla?: VrstePosla) => {
      this.setVrstePoslaFromDialog(VrstePosla);
    });
  }

  public setVrstePoslaFromDialog(VrstePosla?: VrstePosla): void {
    if (VrstePosla) {
      this.varNames.SIF_VP = VrstePosla.SIF_VP;
      this.varNames.NAZ_VP = VrstePosla.NAZ_VP;
    }
  }

  public removeVrstePosla(e: Event): void {
    e.preventDefault();
    this.varNames.SIF_VP = "";
    this.varNames.NAZ_VP = "";

  }

  public async refreshVrstePosla(searchParam: string, isSelected: boolean) {
    await this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getVrstePosla',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: '%' + searchParam + '%',
          limit: 100,
          page: 1,
          sort: [
            {
              property: "SIF_VP",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      console.log(response);
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredVrstePosla = response.debugData.data;
      this.filteredVrstePosla = this.offeredVrstePosla;
      var dummyEl = document.getElementById('offeredVrstePosla-help-span');
      var isFocused = (document.activeElement === dummyEl);
      if (!isSelected && isFocused) {
        document.getElementById("offeredVrstePosla-dropdown")?.classList.add("select-dropdown-content-visible");
      }
    });
  }

  public OfferedVrstePosla(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getVrstePosla',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: this.varNames.SIF_VP,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "SIF_VP",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {

      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredVrstePosla = response.debugData.data;
      for (let item of this.offeredVrstePosla) {
        if (item.SIF_VP.toUpperCase() === this.varNames.SIF_VP.toUpperCase()) {
          this.varNames.NAZ_VP = item.NAZ_VP;
          this.varNames.SIF_VP = item.SIF_VP;
        }
      }
    });
  }

  public filterVrstePosla(text: string): void {
    if (!text) {
      this.refreshVrstePosla("", false);
      return;
    }

    this.offeredVrstePosla = this.filteredVrstePosla.filter(
      item => item?.SIF_VP.toLowerCase().includes(text.toLowerCase())
    );

    if (this.offeredVrstePosla.length == 0) {
      this.refreshVrstePosla(text, false);
    }
  }

  public selectVrstePosla(VrstePosla: VrstePosla): void {
    this.varNames.SIF_VP = VrstePosla.SIF_VP;
    this.varNames.NAZ_VP = VrstePosla.NAZ_VP;
    document.getElementById("offeredVrstePosla-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.VrstePoslaDropdownIndex = -1;
  }

  public resetVrstePoslaIndex(): void {
    this.VrstePoslaDropdownIndex = -1;
    document.getElementById("offeredVrstePosla-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //GRUPE END


  //ZaposleniPoGrupiIShemi START
  public pickZaposleniPoGrupiIShemi(): void {
    if (!this.varNames.ID_GRUPE) {
      this.globalFn.showSnackbarError("Odaberite grupu");
      return;
    }
    else {
      const dialogRef = this.dialog.open(PickPopisRadnikaGrupeComponent, {
        data: this.varNames.ID_GRUPE
      });

      dialogRef.afterClosed().subscribe((ZaposleniPoGrupiIShemi?: ZaposleniPoGrupiIShemi) => {
        this.setZaposleniPoGrupiIShemiFromDialog(ZaposleniPoGrupiIShemi);
      });
    }
  }

  public setZaposleniPoGrupiIShemiFromDialog(ZaposleniPoGrupiIShemi?: ZaposleniPoGrupiIShemi): void {
    if (ZaposleniPoGrupiIShemi) {
      this.varNames.ID_RADNIKA = ZaposleniPoGrupiIShemi.ID_RADNIKA;
      this.varNames.NAZIV_RADNIKA = ZaposleniPoGrupiIShemi.NAZIV_RADNIKA;
      this.varNames.SIF_SHEME = ZaposleniPoGrupiIShemi.SIF_SHEME;
      this.varNames.NAZ_SHEME = ZaposleniPoGrupiIShemi.NAZ_SHEME;
    }
  }

  public removeZaposleniPoGrupiIShemi(e: Event): void {
    e.preventDefault();
    this.varNames.ID_RADNIKA = "";
    this.varNames.NAZIV_RADNIKA = "";
    this.varNames.SIF_SHEME = "";
    this.varNames.NAZ_SHEME = "";
  }

  public refreshZaposleniPoGrupiIShemi(searchParam: string, isSelected: boolean): void {
    if (!this.varNames.ID_GRUPE) {
      this.globalFn.showSnackbarError("Odaberite grupu");
      return;
    }
    else {
      this.http.post(
        this.globalVar.APIHost + this.globalVar.APIFile,
        {
          action: 'Sihterica',
          method: 'getPopisRadnikaGrupe',
          sid: this.session.loggedInUser.sessionID,
          data: {
            pSifVlas: this.session.loggedInUser.ownerID,
            pIdOperatera: this.session.loggedInUser.ID,
            pIdGrupe: this.varNames.ID_GRUPE,
            limit: 10000,
            page: 1,
            sort: [
              {
                property: "ID_RADNIKA",
                direction: "ASC"
              }
            ]
          }
        }
      ).subscribe((response: any) => {
        console.log(response);
        this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
        this.offeredZaposleniPoGrupiIShemi = response.debugData.data;
        this.filteredZaposleniPoGrupiIShemi = this.offeredZaposleniPoGrupiIShemi;
        var dummyEl = document.getElementById('offeredZaposleniPoGrupiIShemi-help-span');
        var isFocused = (document.activeElement === dummyEl);
        if (!isSelected && isFocused) {
          document.getElementById("offeredZaposleniPoGrupiIShemi-dropdown")?.classList.add("select-dropdown-content-visible");
        }
      });
    }
  }

  public OfferedZaposleniPoGrupiIShemi(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getPopisRadnikaGrupe',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pSifVlas: this.session.loggedInUser.ownerID,
          pIdOperatera: this.session.loggedInUser.ID,
          pIdGrupe: this.varNames.ID_GRUPE,
          limit: 10000,
          page: 1,
          sort: [
            {
              property: "ID_RADNIKA",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {

      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredZaposleniPoGrupiIShemi = response.debugData.data;
      for (let item of this.offeredZaposleniPoGrupiIShemi) {
        if (item.ID_RADNIKA.toUpperCase() == this.varNames.ID_RADNIKA.toUpperCase()) {
          this.varNames.NAZIV_RADNIKA = item.NAZIV_RADNIKA;
          this.varNames.SIF_SHEME = item.SIF_SHEME;
          this.varNames.NAZ_SHEME = item.NAZ_SHEME;
          this.varNames.ID_RADNIKA = item.ID_RADNIKA;
        }
      }
    });
  }

  public filterZaposleniPoGrupiIShemi(text: string): void {
    if (!text) {
      this.refreshZaposleniPoGrupiIShemi("", false);
      return;
    }

    this.offeredZaposleniPoGrupiIShemi = this.filteredZaposleniPoGrupiIShemi.filter(
      item => item?.ID_RADNIKA.toLowerCase().includes(text.toLowerCase())
    );

    if (this.offeredZaposleniPoGrupiIShemi.length == 0) {
      this.refreshZaposleniPoGrupiIShemi(text, false);
    }
  }

  public selectZaposleniPoGrupiIShemi(ZaposleniPoGrupiIShemi: ZaposleniPoGrupiIShemi): void {
    this.varNames.ID_RADNIKA = ZaposleniPoGrupiIShemi.ID_RADNIKA;
    this.varNames.NAZIV_RADNIKA = ZaposleniPoGrupiIShemi.NAZIV_RADNIKA;
    this.varNames.SIF_SHEME = ZaposleniPoGrupiIShemi.SIF_SHEME;
    this.varNames.NAZ_SHEME = ZaposleniPoGrupiIShemi.NAZ_SHEME;
    document.getElementById("offeredZaposleniPoGrupiIShemi-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.ZaposleniPoGrupiIShemiDropdownIndex = -1;
  }

  public resetZaposleniPoGrupiIShemiIndex(): void {
    this.ZaposleniPoGrupiIShemiDropdownIndex = -1;
    document.getElementById("offeredZaposleniPoGrupiIShemi-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //ZaposleniPoGrupiIShemi END

  public pickEvidencijaRadVreOj(): void {
    const dialogRef = this.dialog.open(PickEvidencijaHelpOjComponent, {});

    dialogRef.afterClosed().subscribe((EvidencijaRadVreOj?: EvidencijaRadVreOj) => {
      this.setEvidencijaRadVreOjFromDialog(EvidencijaRadVreOj);
    });
  }

  public setEvidencijaRadVreOjFromDialog(EvidencijaRadVreOj?: EvidencijaRadVreOj): void {
    if (EvidencijaRadVreOj) {
      this.varNames.SIF_OJ = EvidencijaRadVreOj.SIF_OJ;
      this.varNames.NAZMJTR = EvidencijaRadVreOj.NAZMJTR;

    }
  }

  public removeEvidencijaRadVreOj(e: Event): void {
    e.preventDefault();
    this.varNames.SIF_OJ = "";
    this.varNames.NAZMJTR = "";
  }

  public refreshEvidencijaRadVreOj(searchParam: string, isSelected: boolean): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaSviRadniciHelpOj',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pIdKorisnika: this.session.loggedInUser.ID,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "SIF_OJ",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      console.log(response);
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredEvidencijaRadVreOj = response.debugData.data;
      this.filteredEvidencijaRadVreOj = response.debugData.data;
      var dummyEl = document.getElementById('offeredEvidencijaRadVreOj-help-span');
      var isFocused = (document.activeElement === dummyEl);
      if (!isSelected && isFocused) {
        document.getElementById("offeredEvidencijaRadVreOj-dropdown")?.classList.add("select-dropdown-content-visible");
      }
    });
  }

  public OfferedEvidencijaRadVreOj(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaSviRadniciHelpOj',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pIdKorisnika: this.session.loggedInUser.ID,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "SIF_OJ",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {

      this.offeredEvidencijaRadVreOj = response.debugData.data;
      for (let item of this.offeredEvidencijaRadVreOj) {
        if (item.SIF_OJ.toUpperCase() == this.varNames.SIF_OJ.toUpperCase()) {
          this.varNames.NAZMJTR = item.NAZMJTR;
          this.varNames.SIF_OJ = item.SIF_OJ;
        }
      }
    });
  }

  public filterEvidencijaRadVreOj(text: string): void {
    if (!text) {
      this.refreshEvidencijaRadVreOj("", false);
      return;
    }

    this.offeredEvidencijaRadVreOj = this.filteredEvidencijaRadVreOj.filter(
      item => item?.SIF_OJ.toLowerCase().includes(text.toLowerCase())
    );

    if (this.offeredEvidencijaRadVreOj.length == 0) {
      this.refreshEvidencijaRadVreOj(text, false);
    }
  }

  public selectEvidencijaRadVreOj(EvidencijaRadVreOj: EvidencijaRadVreOj): void {
    this.varNames.SIF_OJ = EvidencijaRadVreOj.SIF_OJ;
    this.varNames.NAZMJTR = EvidencijaRadVreOj.NAZMJTR;
    this.varNames.VRSTA = EvidencijaRadVreOj.VRSTA;

    document.getElementById("offeredEvidencijaRadVreOj-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.EvidencijaRadVreOjDropdownIndex = -1;
  }

  public resetEvidencijaRadVreOjIndex(): void {
    this.EvidencijaRadVreOjDropdownIndex = -1;
    document.getElementById("offeredEvidencijaRadVreOj-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //EvidencijaRadVreOj END

  public getZaposleniGrupe(event: any): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getPopisRadnikaGrupe',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pSifVlas: this.session.loggedInUser.ownerID,
          pIdOperatera: this.session.loggedInUser.ID,
          pIdGrupe: event.meta.ID_GRUPE,
          limit: 1000000,
          page: 1,
          sort: [
            {
              property: 'NAZIV_RADNIKA',
              direction: 'ASC'
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.zaposleniPoGrupiIShemi = response.debugData.data;
      for (let zaposleni of this.zaposleniPoGrupiIShemi) {
        this.upisSihterice(event, zaposleni);
      }


    });
  }

  public async save() {
    for (let event of this.globalVar.events) {
      if (event.meta?.type != 'holiday') {
        await this.getZaposleniGrupe(event);
      }
    }
  }

  public upisSihterice(event: any, zaposleni: ZaposleniPoGrupiIShemi): void {
    const firstDate: Date = new Date(event.start);
    const secondDate: Date = new Date(event.end)
    let milliDiff: number = firstDate.getTime()
      - secondDate.getTime();
    milliDiff = Math.abs(milliDiff);
    const totalSeconds = Math.floor(milliDiff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'upisSihterice',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pAkcija: CRUDAction.Insert,
          pSifVlas: this.session.loggedInUser.ownerID,
          pDatum: this.globalFn.formatDate(event.start.toISOString().slice(0, 10)),
          pMbr: zaposleni.ID_RADNIKA,
          pSifOj: event.meta.SIF_OJ,
          pSifVP: this.varNames.SIF_VP,
          pSati: totalHours,
          pOd: event.start.toISOString().slice(11, 16),
          pDo: event.end.toISOString().slice(11, 16),
          pIdOperatera: this.session.loggedInUser.ID,
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
    });
  }


  public getEvidencijaMjesecna(): void {
    this.globalVar.events = this.globalVar.events.filter((iEvent) => iEvent.meta.type === "holiday");

    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvidencijaMjesecna',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pIdKorisnika: 4,
          pMbr: this.varNames.ID_RADNIKA,
          pZaMjesec: this.globalFn.formatDate(this.viewDate.toISOString().slice(0, 10)).slice(3, 10),
          pSifMjTr: this.varNames.SIFMJTR,
          pZSifMt: this.varNames.SIFMJTR,
          pZSifVp: this.varNames.SIF_VP,
          limit: 1000000,
          page: 1,
          sort: [
            {
              property: 'D1',
              direction: 'ASC'
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.evidencijaMjesecna = response.debugData.data;
      let index = 0;
      let colorindex = 0;


      for (let satnica of this.evidencijaMjesecna) {
        if (satnica.OD != null || satnica.DO != null) {
          console.log("Upisivanje satnice");

          let dateOd: Date = new Date(+satnica.DATUM.slice(6, 10), +satnica.DATUM.slice(3, 5) - 1, +satnica.DATUM.slice(0, 2), +satnica.OD.substring(0, 2), +satnica.OD.substring(3, 4));
          let dateDo: Date = new Date(+satnica.DATUM.slice(6, 10), +satnica.DATUM.slice(3, 5) - 1, +satnica.DATUM.slice(0, 2), +satnica.DO.substring(0, 2), +satnica.DO.substring(3, 4));

          if (index == colors.length) {
            colorindex = 0
          }
          this.globalVar.events = [...this.globalVar.events, {
            id: index,
            title: this.varNames.NAZ_SHEME,
            start: dateOd,
            end: (dateDo < dateOd) ? addDays(dateDo, 1) : dateDo,
            color: this.globalVar.externalGrupeEvents.find(u => u.meta.SIF_SHEME.toLowerCase() === this.varNames.SIF_SHEME.toLowerCase())?.color,
            draggable: true,
            meta: {
              UKUPANBROJSLOGOVA: satnica?.UKUPANBROJSLOGOVA,
              RN: satnica?.RN,
              OD: satnica?.OD,
              DO: satnica?.DO,
              PAUZA_DO: this.globalVar.externalGrupeEvents.find(u => u.meta.SIF_SHEME.toLowerCase() === this.varNames.SIF_SHEME.toLowerCase())?.meta.PAUZA_DO,
              PAUZA_OD: this.globalVar.externalGrupeEvents.find(u => u.meta.SIF_SHEME.toLowerCase() === this.varNames.SIF_SHEME.toLowerCase())?.meta.PAUZA_OD,
              SIF_MT: satnica?.SIF_MT,
              MBR: satnica?.MBR,
              SIF_VP: satnica?.SIF_VP,
              SIF_MT_N: satnica?.SIF_MT_N,
              NAZIV: satnica?.NAZIV,
              incrementsBadgeTotal: true,
              SIF_VP_N: satnica?.SIF_VP_N,
            },
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },

          }
          ];
          index++;
          colorindex++;

        }
      }
    });

  }

  public goToDnevnaEvidencija(event: any): void {
    let data = { ID_RADNIKA: this.varNames.ID_RADNIKA, SIFMJTR: this.varNames.SIFMJTR, SIF_VP: this.varNames.SIF_VP, DATUM: event.date.toLocaleString() };

    this.router.navigate(["dnevna-evidencija", data]);


  }
}