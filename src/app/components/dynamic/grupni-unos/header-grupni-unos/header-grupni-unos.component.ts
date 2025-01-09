import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CalendarCommonModule, CalendarView, CalendarWeekModule } from 'angular-calendar';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';

@Component({
  selector: 'app-header-grupni-unos',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,

    CalendarCommonModule,
    CalendarWeekModule,

    CommonModule,
    FormsModule,
    TranslationPipe,
    TitleCasePipe
  ],
  templateUrl: './header-grupni-unos.component.html',
  styleUrl: './header-grupni-unos.component.scss'
})
export class HeaderGrupniUnosComponent {
  @Input() view!: CalendarView;

  @Input() viewDate!: Date;

  @Input() locale: string = 'hr-HR';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;
}

export const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};