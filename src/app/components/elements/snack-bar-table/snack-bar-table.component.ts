import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { porukeZaGrupno } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
    selector: 'app-snack-bar-table',
    imports: [
        MatTableModule,
        MatTooltipModule,
        MatListModule,
        MatButtonModule,
        TranslationPipe,
        CommonModule,
        FormsModule
    ],
    templateUrl: './snack-bar-table.component.html',
    styleUrl: './snack-bar-table.component.scss'
})
export class SnackBarTableComponent implements OnInit{
  public displayedColumns: string[] = ['MBR', 'SIFRA_RAD', 'DATUM','PORUKA'];

  public porukeZaGrupno:porukeZaGrupno={
    RN: 0,
    UKUPANBROJSLOGOVA: 0,
    DATUM: "",
    IDK: "",
    INDIKATOR: "",
    MBR: "",
    PORUKA: "",
    SIFRA_RAD: "",
    SIFVLAS: "",
  }
  constructor(
    public http: HttpClient,
    public globalVar: GlobalVariablesService,
    public globalFn: GlobalFunctionsService,
    public session: SessionService,
    public snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log(this.globalVar.snackBarTableData);
  }

}
