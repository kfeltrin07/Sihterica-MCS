import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-main-content',
  standalone:true,
  imports:[
    MatCardModule,
    RouterOutlet,
    FormsModule,
    CommonModule
  ],
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent {

  constructor(
    public session: SessionService
  ) {}
}
