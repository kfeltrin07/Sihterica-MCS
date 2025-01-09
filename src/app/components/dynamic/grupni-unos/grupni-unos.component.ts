import { Component, ChangeDetectionStrategy, OnChanges, SimpleChanges, Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {
  CalendarDateFormatter,
  CalendarDayModule,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarMonthModule,
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
import { getDate, getYear, startOfDay } from 'date-fns';

@Injectable()
class CustomDateFormatter extends CalendarNativeDateFormatter {

  public override monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date);
  }

  public override dayViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', 'hr-HR');
  }

}

@Component({
  selector: 'app-grupni-unos',
  standalone: true,
  imports: [
    HeaderGrupniUnosComponent,
    CalendarDayModule,
    CalendarWeekModule,
    CalendarMonthModule,
    MatButtonModule,

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
  ],
})
export class GrupniUnosComponent implements OnChanges, OnInit {


  view: CalendarView = CalendarView.Month;
  locale: string = 'hr-HR';

  viewDate = new Date();
  activeDayIsOpen = false;

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  events: CalendarEvent[] = [
    /*
    {
      title: 'Draggable event',
      color: colors.yellow,
      start: new Date(),
      draggable: true,
    },
    {
      title: 'A non draggable event',
      color: colors.blue,
      start: new Date(),
    },*/
  ];
  public date: Date = new Date();
  public date1: Date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDay(), 8);
  public date2: Date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDay(), 16);
  public date3: Date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDay(), 14);
  public date4: Date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDay(), 22);

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
      },
    },
  ];

  public externalEvents: CalendarEvent[] = [
    {
      title: 'Jutarnja',
      color: colors.yellow,
      start: this.date1,
      end: this.date2,
      draggable: true,
    },
    {
      title: 'Popodnevna',
      color: colors.blue,
      start: this.date3,
      end: this.date4,
      draggable: true,
    },
  ];

  refresh = new Subject<void>();


  ngOnInit(): void {
    console.log(this.externalEvents);
  }



  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
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
    const newEvent:CalendarEvent = {
      id:this.events.length,
      title: event.title,
      start: newStart,
      end: newEnd,
      color: event.color,
      draggable: event.draggable,
    }
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        console.log("match");
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      else{
        console.log("no match");
        console.log(this.events);
        console.log(event);
        console.log(this.events);
      }

      return iEvent;
    });
    
    this.events = [...this.events, newEvent];
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
}

