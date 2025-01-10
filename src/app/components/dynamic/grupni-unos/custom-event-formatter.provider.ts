import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { formatDate } from '@angular/common';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
    constructor(
        @Inject(LOCALE_ID) private locale: string,
        public t:TranslationService
    ) {
        super();
    }

    // you can override any of the methods defined in the parent class

    public override month(event: CalendarEvent): string {
        return `${event.title}`;
    }

    public override monthTooltip(event: CalendarEvent): string {
        return `${event.title}`;
    }

    public override week(event: CalendarEvent): string {
        return `<div class="event-title-div"> 
        <label>${event.title}</label>
        <b>${formatDate(event.start, 'HH:mm', this.locale)} - ${formatDate(event.end?event.end:0, 'HH:mm', this.locale)}</b>
        <label>${this.t.translate('PAUZAOD')}: ${event.meta.PAUZA_OD}</label>
        <label>${this.t.translate('PAUZADO')}: ${event.meta.PAUZA_DO}</label>
        </div>`;
    }

    public override weekTooltip(event: CalendarEvent): string {
        return `<b>${formatDate(event.start, 'HH:mm', this.locale)} - ${formatDate(event.end?event.end:0, 'HH:mm', this.locale)}</b> 
        ${event.title
        }`;
    }

    public override day(event: CalendarEvent): string {
        return `<div class="event-title-div">
        <label>${event.title}</label>
        <b>${formatDate(event.start, 'HH:mm', this.locale)} - ${formatDate(event.end?event.end:0, 'HH:mm', this.locale)}</b> 
        <label>${this.t.translate('PAUZAOD')}: ${event.meta.PAUZA_OD}</label>
        <label>${this.t.translate('PAUZADO')}: ${event.meta.PAUZA_DO}</label>
        </div>`;
    }

    public override dayTooltip(event: CalendarEvent): string {
        return `<b>${formatDate(event.start, 'HH:mm', this.locale)} - ${formatDate(event.end?event.end:0, 'HH:mm', this.locale)}</b> 
        ${event.title
        }`;
    }
}
