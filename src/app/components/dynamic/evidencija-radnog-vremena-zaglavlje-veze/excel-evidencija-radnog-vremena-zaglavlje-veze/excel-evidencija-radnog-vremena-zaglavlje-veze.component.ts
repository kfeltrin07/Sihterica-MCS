import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { EvidencijaRadVreZagVeze } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { HttpService } from 'src/app/services/http/http.service';
import { SessionService } from 'src/app/services/session/session.service';
import { TranslationService } from 'src/app/services/translation/translation.service';
import RobotoFont from 'src/assets/fonts/roboto.json';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel-evidencija-radnog-vremena-zaglavlje-veze',
  standalone: true,
  imports: [
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,

    CommonModule,
    FormsModule,
    TranslationPipe
  ],
  templateUrl: './excel-evidencija-radnog-vremena-zaglavlje-veze.component.html',
  styleUrl: './excel-evidencija-radnog-vremena-zaglavlje-veze.component.scss'
})
export class ExcelEvidencijaRadnogVremenaZaglavljeVezeComponent {
  public evidencijaRadVreZagVeze!: EvidencijaRadVreZagVeze[];
  public EvidencijaRadVreZagVeze: EvidencijaRadVreZagVeze = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    RID: "",
    SIF_STUPCA: "",
    SIF_VP: "",
    KNAZIV: "",
    OPIS: "",
    NAZ_VP: "",
    SI: "",
    XFAKTOR: "",
    SIF_VLAS: "",
  }

  public allColumns: boolean = true;
  public bySearch: boolean = true;
  public robotoFont: string = RobotoFont.robotoFont;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private http: HttpService,
    private globalVar: GlobalVariablesService,
    private globalFn: GlobalFunctionsService,
    private session: SessionService,
    private t: TranslationService
  ) { }

  public generateExcel(columns: string[], data: any, numberOfColumns: number, title: string): void {

    let dataAsArray: any = [];
    dataAsArray.push([]);
    dataAsArray[0].push(this.t.translate('Ordinal'));

    for (let key in this.EvidencijaRadVreZagVeze) {
      if (key !== 'UKUPANBROJSLOGOVA' && key !== 'RN') {
        if (this.dialogData.headers.includes(key.toString()) || this.allColumns) {
          dataAsArray[0].push(this.t.translate(key));
        }
      }
    }

    for (let i = 0; i < data.length; i++) {
      dataAsArray.push([]);

      dataAsArray[i + 1].push(i + 1);

      for (let key in this.EvidencijaRadVreZagVeze) {
        if (key != 'UKUPANBROJSLOGOVA' && key != 'RN') {
          if (this.dialogData.headers.includes(key.toString()) || this.allColumns) {
            dataAsArray[i + 1].push(data[i][key]);
          }

        }
      }
    }

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataAsArray, { skipHeader: true });

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    let fileName = title + '.xlsx';
    XLSX.writeFile(wb, fileName);
  }

  public getData(selectedSearchOption: string): void {

    this.http.postWithParams(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaZagVeze',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: '%' + this.dialogData.searchParam + '%',
          limit: 1000,
          sort: [
            {
              property: 'SIF_STUPCA',
              direction: 'ASC'
            }
          ]
        }
      }
    ).subscribe((response) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.evidencijaRadVreZagVeze = response.debugData.data;
      let columnsList: string[] = [];

      columnsList.push(this.t.translate('Ordinal'));

      for (let key in this.EvidencijaRadVreZagVeze) {
        if (key !== 'UKUPANBROJSLOGOVA' && key !== 'RN') {
          if (this.dialogData.headers.includes(key.toString()) || this.allColumns) {
            columnsList.push(this.t.translate(key));
          }
        }
      }

      this.generateExcel(columnsList, this.evidencijaRadVreZagVeze, columnsList.length, this.t.translate('EvidencijaRadVremZagVeze'));
    });

  }
}
