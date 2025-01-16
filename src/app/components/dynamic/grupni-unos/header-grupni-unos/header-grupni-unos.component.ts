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

export const colors: any = [
  {
    primary: '#ad2121', //  RED
    secondary: '#FAE3E3',

  },
  {
    primary: '#1e90ff', // BLUE
    secondary: '#D1E8FF',

  },
  {
    primary: '#e3bc08', // YELLOW
    secondary: '#FDF1BA',

  },
  {
    primary: '#7bc379', // GREEN
    secondary: '#93e990',

  },
  {
    primary: '#bf90e9', // PURPLE
    secondary: '#cd9bfa',

  },
  {
    primary: '#0ccf94', // green
    secondary: '#1af0b0',
  },

];


export const colorsHoliday: any = [
  {
    primary: '#a36b0a', // PURPLE 2
    secondary: '#f0cb8b',
  }
]