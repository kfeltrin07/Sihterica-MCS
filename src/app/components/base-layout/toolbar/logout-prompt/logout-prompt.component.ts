import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-logout-prompt',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,

    TranslationPipe
  ],
  templateUrl: './logout-prompt.component.html',
  styleUrl: './logout-prompt.component.scss'
})
export class LogoutPromptComponent {
  constructor(
    public session: SessionService
  ) {}

}
