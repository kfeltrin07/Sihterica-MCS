import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { rekapitulacijaMjesecna } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
    selector: 'app-snack-bar-rekapitulacija-mjesecna',
    imports: [
        MatTableModule,
        MatTooltipModule,
        MatListModule,
        MatButtonModule,
        TranslationPipe,
        CommonModule,
        FormsModule
    ],
    templateUrl: './snack-bar-rekapitulacija-mjesecna.component.html',
    styleUrl: './snack-bar-rekapitulacija-mjesecna.component.scss'
})
export class SnackBarRekapitulacijaMjesecnaComponent  implements OnInit{
  public displayedColumns: string[] = ['NAZ_MT','SIF_VP_N','SATI'];

  public dataAndKeys:rekapitulacijaMjesecna={
    UKUPANBROJSLOGOVA:0,
    RN:0,
    VRSTA: "",
    SIF_MT: "",
    NAZ_MT: "",
    SIF_VP: "",
    SIF_VP_N: "",
    SATI: "",
  }
  constructor(
    public http: HttpClient,
    public globalVar: GlobalVariablesService,
    public globalFn: GlobalFunctionsService,
    public session: SessionService,
    public snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
  }
}
