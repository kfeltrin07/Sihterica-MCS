import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';

@Component({
  selector: 'app-logging-out',
  standalone: true,
  imports: [
    MatIconModule,
    MatProgressBarModule,
    TranslationPipe
  ],
  templateUrl: './logging-out.component.html',
  styleUrl: './logging-out.component.scss'
})
export class LoggingOutComponent {

}
