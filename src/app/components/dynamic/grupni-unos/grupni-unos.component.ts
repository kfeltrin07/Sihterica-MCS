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
import { CRUDAction, EvidencijaMjesecna, Grupe, OrganizacijskeJedinice, Sheme, VrstePosla, ZaposleniPoGrupiIShemi } from 'src/app/models/models.service';
import { EventGrupniUnosComponent } from './event-grupni-unos/event-grupni-unos.component';
import { PickGrupeComponent } from '../../pickers/pick-grupe/pick-grupe.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PickVrstaPoslaComponent } from '../../pickers/pick-vrsta-posla/pick-vrsta-posla.component';
import { PickPopisRadnikaGrupeComponent } from '../../pickers/pick-popis-radnika-grupe/pick-popis-radnika-grupe.component';
import { PickOrgJediniceComponent } from '../../pickers/pick-org-jedinice/pick-org-jedinice.component';
import {CustomDateFormatter} from './custom-date-formatter.provider';



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
  };

  public grupe: Grupe[] = [];
  public Grupe: Grupe = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    ID_GRUPE: "",
    NAZ_GRUPE: "",
    SIF_SHEME: "",
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

  public OrganizacijskeJediniceDropdownIndex: number = -1;
  public offeredOrganizacijskeJedinice: OrganizacijskeJedinice[] = [];
  public filteredEvidVezeIzracuna: OrganizacijskeJedinice[] = [];
  public selectedOrganizacijskeJedinice: OrganizacijskeJedinice = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIFVLAS: "",
    SIF_OJ: "",
    NAZ_OJ: "",
    REG_BR: "",
    BOD_PC: "",
    KOEF_PC: "",
    VR_BOD: "",
    VR_KOEF: "",
    PROS_SAT: "",
    PROS_KOEF: "",
    PROS_BOD: "",
    IND1: "",
    SIF_NAD: "",
    BRO_HZZO: "",
    RSOPC: "",
    IDK: "",
    SYSD: ""
  };

  public zaposleniPoGrupiIShemi: ZaposleniPoGrupiIShemi[] = [];

  public evidencijaMjesecna: EvidencijaMjesecna[] = [];


  public varNames: any = {
    NAZ_GRUPE: "",
    SIF_VP: "",
    ID_GRUPE: "",
    ID_RADNIKA: "",
    NAZ_OJ: "",
    SIFMJTR:""
  }


  view: CalendarView = CalendarView.Month;
  locale: string = 'hr-HR';

  public match: boolean = false;

  viewDate = new Date();
  activeDayIsOpen = false;
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  public externalShemeEvents: CalendarEvent[] = [
    /*
    {
      id: 1,
      title: "Test",
      start: new Date(),
      end: this.viewDate1,
      color: colors[0],
      draggable: true,
      actions: this.actions,
      meta: {
        OD: new Date(),
        DO: new Date(),
        SIF_SHEME:"2",
        OPIS: "Neki opis",
        PAUZA_DO: "10:00",
        PAUZA_OD: "10:30",
        UKUPANBROJSLOGOVA: "1",
        RN: "2",
        incrementsBadgeTotal: true,

      },
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    }*/
  ];

  public externalGrupeEvents: CalendarEvent[] = [
  ];

  public events: CalendarEvent[] = [
  ];

  refresh = new Subject<void>();

  constructor(
    public http: HttpClient,
    public globalVar: GlobalVariablesService,
    public globalFn: GlobalFunctionsService,
    public session: SessionService,
    public dialog: MatDialog,
  ) { }


  public ngOnInit(): void {
    this.getSheme();
    this.getGrupeEvents();
    this.getHolidays();
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
    this.events=[];
    this.getHolidays();
  }

  public eventDropped({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    let match: boolean = false;
    const newEvent: CalendarEvent = {
      id: this.events.length,
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
    this.events = this.events.map((iEvent) => {
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
      this.events = [...this.events, newEvent];
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
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  public externalDropSheme(event: CalendarEvent) {
    if (this.externalShemeEvents.indexOf(event) === -1) {
      this.events = this.events.filter((iEvent) => iEvent !== event);
    }
  }

  public externalDropGrupe(event: CalendarEvent) {
    if (this.externalGrupeEvents.indexOf(event) === -1) {
      this.events = this.events.filter((iEvent) => iEvent !== event);
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
          pSifSheme:'',
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
        this.externalShemeEvents = [...this.externalShemeEvents, {
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
          this.externalGrupeEvents = [...this.externalGrupeEvents, {
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
          index++;
          colorindex++;
        });
        };
    });
  }

  public  eventClicked(event: any): void {
    console.log('event clicked');
    if (event.meta?.type != 'holiday') {
      const dialogRef = this.dialog.open(EventGrupniUnosComponent, {
        data: event
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.events = this.events.map((iEvent) => {
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
      this.events = response.map((holiday: any) => {
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
      if (!isSelected) {
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
      if (!isSelected) {
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
        if (!isSelected) {
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

  //Organizacijska jedinica START
  public pickOrganizationalUnits(): void {
    const dialogRef = this.dialog.open(PickOrgJediniceComponent, {});

    dialogRef.afterClosed().subscribe((OrganizacijskeJedinice?: OrganizacijskeJedinice) => {
      this.setOrganizationalUnitsFromDialog(OrganizacijskeJedinice);
    });
  }

  public setOrganizationalUnitsFromDialog(OrganizacijskeJedinice?: OrganizacijskeJedinice): void {
    if (OrganizacijskeJedinice) {
      this.varNames.SIFMJTR = OrganizacijskeJedinice.SIF_OJ;
      this.varNames.NAZ_OJ = OrganizacijskeJedinice.NAZ_OJ;
    }
  }

  public removeOrganizationalUnits(e: Event): void {
    e.preventDefault();
    this.varNames.SIFMJTR = "";
    this.varNames.NAZ_OJ = "";

  }

  public refreshOrganizationalUnits(searchParam: string, isSelected: boolean): void {
    console.log("refresh was clicked");
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getOJ',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: searchParam,
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
      this.offeredOrganizacijskeJedinice = response.debugData.data;
      this.filteredEvidVezeIzracuna = response.debugData.data;
      console.log("data is here");
      if (!isSelected) {
        document.getElementById("offeredOrganizacijskeJedinice-dropdown")?.classList.add("select-dropdown-content-visible");
      }
    });
  }

  public OfferedOrganizationalUnits(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getOJ',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: this.varNames.SIFMJTR,
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

      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredOrganizacijskeJedinice = response.debugData.data;
      for (let item of this.offeredOrganizacijskeJedinice) {
        if (item.SIF_OJ.toUpperCase() == this.varNames.SIFMJTR.toUpperCase()) {
          this.varNames.NAZ_OJ = item.NAZ_OJ;
          this.varNames.SIFMJTR = item.SIF_OJ;
        }
      }
    });
  }

  public filterOrganizationalUnits(text: string): void {
    if (!text) {
      this.refreshOrganizationalUnits("", false);
      return;
    }

    this.offeredOrganizacijskeJedinice = this.filteredEvidVezeIzracuna.filter(
      item => item?.SIF_OJ.toLowerCase().includes(text.toLowerCase())
    );

    if (this.offeredOrganizacijskeJedinice.length == 0) {
      this.refreshOrganizationalUnits(text, false);
    }
  }

  public selectOrganizationalUnits(OrganizacijskeJedinice: OrganizacijskeJedinice): void {
    this.varNames.SIFMJTR = OrganizacijskeJedinice.SIF_OJ;
    this.varNames.NAZ_OJ = OrganizacijskeJedinice.NAZ_OJ;
    document.getElementById("offeredOrganizacijskeJedinice-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.OrganizacijskeJediniceDropdownIndex = -1;
  }

  public resetOrganizationalUnits(): void {
    this.OrganizacijskeJediniceDropdownIndex = -1;
    document.getElementById("offeredOrganizacijskeJedinice-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //Organizacijska jedinica  END

  public getZaposleniGrupe(): void {
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
      for (let event of this.events) {
        if (event.meta?.type != 'holiday') {
          console.log(event);
          for (let zaposleni of this.zaposleniPoGrupiIShemi) {
            this.upisSihterice(event, zaposleni);
          }
        }
      }
    });
  }

  public async save() {
    await this.getZaposleniGrupe();
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
          pSifOj: zaposleni.SIF_OJ,
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
    this.events = this.events.filter((iEvent) => iEvent.meta.type === "holiday");

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

          let dateOd: Date = new Date(+satnica.DATUM.slice(6, 10), +satnica.DATUM.slice(3, 5)-1, +satnica.DATUM.slice(0, 2), +satnica.OD.substring(0, 2), +satnica.OD.substring(3, 4));
          let dateDo: Date = new Date(+satnica.DATUM.slice(6, 10), +satnica.DATUM.slice(3, 5)-1, +satnica.DATUM.slice(0, 2), +satnica.DO.substring(0, 2), +satnica.DO.substring(3, 4));

          if (index == colors.length) {
            colorindex = 0
          }
          this.events = [...this.events, {
            id: index,
            title: this.varNames.NAZ_SHEME,
            start: dateOd,
            end: (dateDo < dateOd) ? addDays(dateDo, 1) : dateDo,
            color: this.externalShemeEvents.find(u => u.meta.SIF_SHEME.toLowerCase() === this.varNames.SIF_SHEME.toLowerCase())?.color,
            draggable: true,
            meta: {
              UKUPANBROJSLOGOVA: satnica?.UKUPANBROJSLOGOVA,
              RN: satnica?.RN,
              OD: satnica?.OD,
              DO: satnica?.DO,
              PAUZA_DO: this.externalShemeEvents.find(u => u.meta.SIF_SHEME.toLowerCase() === this.varNames.SIF_SHEME.toLowerCase())?.meta.PAUZA_DO,
              PAUZA_OD: this.externalShemeEvents.find(u => u.meta.SIF_SHEME.toLowerCase() === this.varNames.SIF_SHEME.toLowerCase())?.meta.PAUZA_OD,
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

}

