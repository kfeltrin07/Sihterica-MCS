import { Component, ElementRef, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DashboardSubitem, DashboardItem } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';

@Component({
  selector: 'app-selection-screen',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    
    TranslationPipe
  ],
  templateUrl: './selection-screen.component.html',
  styleUrl: './selection-screen.component.scss'
})
export class SelectionScreenComponent implements OnInit {

  public submenuItems: DashboardSubitem[] = [];
  public selectedDashboardItem: DashboardItem | undefined;

  constructor(
    public globalVar: GlobalVariablesService,
    private elementRef: ElementRef,
    public router: Router
  ) {}

  public ngOnInit(): void {
  }
}
