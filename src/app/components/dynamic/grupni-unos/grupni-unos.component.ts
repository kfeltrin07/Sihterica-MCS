import { Component, ChangeDetectionStrategy, OnChanges, SimpleChanges, Injectable, OnInit, Inject, LOCALE_ID, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import {
  CalendarDateFormatter,
  CalendarDayModule,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarEventTitleFormatter,
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
import { colors, HeaderGrupniUnosComponent } from './header-grupni-unos/header-grupni-unos.component';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { MatButtonModule } from '@angular/material/button';
import { addDays, getDate, getYear, startOfDay } from 'date-fns';
import { CustomEventTitleFormatter } from './custom-event-formatter.provider';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { Grupe, Sheme } from 'src/app/models/models.service';
import { EventGrupniUnosComponent } from './event-grupni-unos/event-grupni-unos.component';
import { PickGrupeComponent } from '../../pickers/pick-grupe/pick-grupe.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Injectable()
class CustomDateFormatter extends CalendarNativeDateFormatter {

  public override monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date);
  }

  public override dayViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', 'hr-HR');
  }

};

interface Holiday {
  date: string;
  name: string;
}

type CalendarEventWithMeta = CalendarEvent<
  { type: 'holiday'; holiday: Holiday } | { type: 'normal' }
>;

@Component({
  selector: 'app-grupni-unos',
  standalone: true,
  imports: [
    HeaderGrupniUnosComponent,
    CalendarDayModule,
    CalendarWeekModule,
    CalendarMonthModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,

    FormsModule,
    CommonModule,
    TranslationPipe
  ],
  templateUrl: './grupni-unos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './grupni-unos.component.scss',
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    }
  ],
})
export class GrupniUnosComponent implements OnChanges, OnInit {

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
  public selectedGrupe: Grupe = {
    UKUPANBROJSLOGOVA:0,
    RN:0,
    ID_GRUPE: "",
    NAZ_GRUPE: "",
  };

  public varNames: any = {
    NAZ_GRUPE: ""
  }
  view: CalendarView = CalendarView.Month;
  locale: string = 'hr-HR';

  public match: boolean = false;

  viewDate = new Date();
  activeDayIsOpen = false;
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  public externalEvents: CalendarEvent[] = [];

  public events: CalendarEvent[] = [
  ];

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
      },
    },
  ];


  refresh = new Subject<void>();

  constructor(
    public http: HttpClient,
    public globalVar: GlobalVariablesService,
    private globalFn: GlobalFunctionsService,
    public session: SessionService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    console.log(this.externalEvents);
    this.getSheme();
    this.getHolidays();
  }



  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
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

  public checkDate() {
    console.log(this.viewDate);
    console.log(this.view);
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
      actions:this.actions,
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

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  public externalDrop(event: CalendarEvent) {
    if (this.externalEvents.indexOf(event) === -1) {
      this.events = this.events.filter((iEvent) => iEvent !== event);
    }
  }


  public printinginfo(event: any) {
    console.log(event)

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
        this.externalEvents = [...this.externalEvents, {
          id: index,
          title: shema.OPIS,
          start: dateOd,
          end: (dateDo < dateOd) ? addDays(dateDo, 1) : dateDo,
          color: colors[colorindex],
          draggable: true,
          actions: this.actions,
          meta: {
            OD: shema?.OD,
            DO: shema?.DO,
            SIF_SHEME: shema?.SIF_SHEME,
            OPIS: shema?.OPIS,
            PAUZA_DO: shema?.PAUZA_DO,
            PAUZA_OD: shema?.PAUZA_OD,
            UKUPANBROJSLOGOVA: shema?.UKUPANBROJSLOGOVA,
            RN: shema?.RN,
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


  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
    if(event.meta.type!='holiday'){
      const dialogRef = this.dialog.open(EventGrupniUnosComponent, {
        data: event
      });
      dialogRef.afterClosed().subscribe((result) => {
      });
    }
    
  }


  public getHolidays() {
    let date: Date = new Date();

    this.http.get('https://openholidaysapi.org/PublicHolidays?countryIsoCode=HR&languageIsoCode=HR&validFrom=' + (date.getFullYear()-1) + '-01-01&validTo=' + date.getFullYear() + '-12-31'

    ).subscribe((response: any) => {
      console.log(response);
      this.events = response.map((holiday: any) => {
        return {
          start: new Date(holiday.startDate),
          title: holiday.name[0].text,
          allDay: true,
          meta: {
            type: 'holiday',
            holiday,
            incrementsBadgeTotal: false,
          },
        }
      });
      this.cdr.markForCheck();
      console.log(this.events)
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
    this.varNames.ID_GRUPE="";
    this.varNames.NAZ_GRUPE="";

  }

  public refreshGrupe(searchParam: string, isSelected: boolean): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getGrupe',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: searchParam,
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
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredGrupe = response.debugData.data;
      if (!isSelected) {
        document.getElementById("offeredGrupe-dropdown")?.classList.add("select-dropdown-content-visible");
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
        if (item.ID_GRUPE == this.varNames.ID_GRUPE) {
          this.varNames.NAZ_GRUPE = item.NAZ_GRUPE;
        }
      }
    });
  }

  public selectGrupe(Grupe: Grupe): void {
    this.varNames.ID_GRUPE = Grupe.ID_GRUPE;
    this.varNames.NAZ_GRUPE = Grupe.NAZ_GRUPE;
    document.getElementById("offeredGrupe-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.GrupeDropdownIndex = -1;
  }

  public resetGrupeIndex(): void {
    this.GrupeDropdownIndex = -1;
    document.getElementById("offeredGrupe-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //GRUPE END
}

