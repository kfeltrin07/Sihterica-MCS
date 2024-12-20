import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { LogoutPromptComponent } from './logout-prompt/logout-prompt.component';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-toolbar',
  standalone:true,
  imports:[
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatButtonModule,

    CommonModule,

    TranslationPipe
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @HostListener('window:keydown.Control.Shift.F11',['$event']) scrollUp(event: KeyboardEvent) {
    this.show();
  };

  
  public showKonekcije:boolean=false;

  constructor(
    public session: SessionService,
    public dialog: MatDialog,
    public router: Router,
    public globalFn: GlobalFunctionsService,
    public globalVar: GlobalVariablesService,
    public sidenavService:SidenavService

  ) {}
  
  public openLogoutPrompt(): void {
    const dialogRef = this.dialog.open(LogoutPromptComponent, {});
    dialogRef.afterClosed().subscribe((result) => {});
  }

  public show():void{
    this.showKonekcije= !this.showKonekcije
  }
}
