import { Component, Inject } from '@angular/core';
import { Zaposleni } from 'src/app/models/models.service';
import RobotoFont from 'src/assets/fonts/roboto.json';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { HttpService } from 'src/app/services/http/http.service';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-zaposleni-pdf',
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
  templateUrl: './zaposleni-pdf.component.html',
  styleUrl: './zaposleni-pdf.component.scss'
})
export class ZaposleniPdfComponent {

  public zaposleni!: Zaposleni[];

  public allColumns: boolean = true;
  public robotoFont: string = RobotoFont.robotoFont;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private http: HttpService,
    private globalVar: GlobalVariablesService,
    private globalFn: GlobalFunctionsService,
    private session: SessionService,
    private t: TranslationService
  ) {}

  public generatePDF(columns: string[], data: any, numberOfColumns: number, title: string): void {

    let orientation: 'p' | 'l' = numberOfColumns <= 4 ? 'p' : 'l';
    let dataAsArray: any = [];

    for (let i = 0; i < data.length; i++) {
      dataAsArray.push([]);
      
      dataAsArray[i].push(i + 1);

      if (this.dialogData.headers.includes('MBR') || this.allColumns) {
        dataAsArray[i].push(data[i].MBR);
      }

      if (this.dialogData.headers.includes('PREZIME_IME') || this.allColumns) {
        dataAsArray[i].push(data[i].PREZIME_IME);
      }

      if (this.dialogData.headers.includes('SIF_RM') || this.allColumns) {
        dataAsArray[i].push(data[i].SIF_RM);
      }

      if (this.dialogData.headers.includes('NAZ_ZAN') || this.allColumns) {
        dataAsArray[i].push(data[i].NAZ_ZAN);
      }

      if (this.dialogData.headers.includes('NAZ_RM') || this.allColumns) {
        dataAsArray[i].push(data[i].NAZ_RM);
      }

      if (this.dialogData.headers.includes('SIF_OJ') || this.allColumns) {
        dataAsArray[i].push(data[i].SIF_OJ);
      }

      if (this.dialogData.headers.includes('NAZ_OJ') || this.allColumns) {
        dataAsArray[i].push(data[i].NAZ_OJ);
      }

      if (this.dialogData.headers.includes('IND') || this.allColumns) {
        dataAsArray[i].push(data[i].IND);
      }
    }

    const doc = new jsPDF(orientation, 'pt', 'a4');
    doc.addFileToVFS('Roboto-Medium-normal.ttf', this.robotoFont);
    doc.addFont('Roboto-Medium-normal.ttf', 'Roboto-Medium', 'normal');
    doc.setFont('Roboto-Medium');
    let image: string;
    let marginLeftRight = 54, marginTop = 140, marginBottom = 70, headerImageWidth = 48, headerImageHeight = 58, headerImageMarginTop = 25,
        headerTextMarginLeft = 110, headerTextMarginTop = 50, titleMarginLeft = 215, titleMarginTop = 120, textFontSizeSmall = 9, textFontSizeNormal = 18;
      this.globalVar.headerTitle = 'Zaposleni';
      this.globalVar.headerImage = '../../../../assets/images/icons/png/inventory.png';
      image = this.globalVar.headerImage;

      autoTable(doc, {
        //html: '#' + tableID,
        columns,
        body: dataAsArray,
        styles: {
          font: 'Roboto-Medium',
        },
        showHead: 'everyPage',
        showFoot: 'everyPage',
        theme: 'striped',
        margin: {top: marginTop, right: marginLeftRight, bottom: marginBottom, left: marginLeftRight}
      })
    
      const pageCount = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.addImage(image, 'png', marginLeftRight, headerImageMarginTop, headerImageWidth, headerImageHeight);
        doc.setFontSize(textFontSizeSmall);
        doc.setTextColor(0, 0, 0);
        //doc.setTextColor(0, 53, 118);
        doc.setFontSize(textFontSizeNormal);
        doc.text(title, titleMarginLeft, titleMarginTop);
        doc.setFontSize(textFontSizeSmall);
        doc.setPage(i);
        let pageSize = doc.internal.pageSize;
        let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        let str = String(i) + ' / ' + String(pageCount);
        doc.text(this.t.translate('CreationTime') + ': ' + moment().format('DD. MM. YYYY. HH:mm:ss'), marginLeftRight, pageHeight - marginLeftRight, {align: 'left',});
        doc.text(String(i) + ' / ' + String(pageCount), doc.internal.pageSize.getWidth() - marginLeftRight, pageHeight - marginLeftRight, {align: 'right',}); 
      }
      doc.save(title + '.pdf');
    
  }

  public getData(selectedSearchOption: string): void {

    this.http.postWithParams(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getZaposleni',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva:  '%' + this.dialogData.searchParam + '%',
          limit: 1000,
          sort: [
            {
              property: 'MBR',
              direction: 'ASC'
            }
          ]
        }
      }
    ).subscribe((response:any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.zaposleni = response.debugData.data;
      let columnsList: string[] = [];

      columnsList.push(this.t.translate('Ordinal'));

      if (this.dialogData.headers.includes('MBR') || this.allColumns) {
        columnsList.push(this.t.translate('MBR'));
      }

      if (this.dialogData.headers.includes('PREZIME_IME') || this.allColumns) {
        columnsList.push(this.t.translate('PREZIME_IME'));
      }

      if (this.dialogData.headers.includes('SIF_RM') || this.allColumns) {
        columnsList.push(this.t.translate('SIF_RM'));
      }

      if (this.dialogData.headers.includes('NAZ_ZAN') || this.allColumns) {
        columnsList.push(this.t.translate('NAZ_ZAN'));
      }

      if (this.dialogData.headers.includes('NAZ_RM') || this.allColumns) {
        columnsList.push(this.t.translate('NAZ_RM'));
      }

      if (this.dialogData.headers.includes('SIF_OJ') || this.allColumns) {
        columnsList.push(this.t.translate('SIF_OJ'));
      }

      if (this.dialogData.headers.includes('NAZ_OJ') || this.allColumns) {
        columnsList.push(this.t.translate('NAZ_OJ'));
      }

      if (this.dialogData.headers.includes('IND') || this.allColumns) {
        columnsList.push(this.t.translate('IND'));
      }

      this.generatePDF(columnsList, this.zaposleni, columnsList.length, this.t.translate('Zaposleni'));
    });

  }
}
