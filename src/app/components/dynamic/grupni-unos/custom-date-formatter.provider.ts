import { Injectable } from "@angular/core";
import { CalendarNativeDateFormatter, DateFormatterParams } from "angular-calendar";
import { formatDate } from '@angular/common';

@Injectable()
export class CustomDateFormatter extends CalendarNativeDateFormatter {

  public override monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date);
  }

  public override dayViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', 'hr-HR');
  }

};