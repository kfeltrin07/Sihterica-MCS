import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { OrganizacijskeJedinice } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { HttpService } from 'src/app/services/http/http.service';
import { SessionService } from 'src/app/services/session/session.service';
import { TranslationService } from 'src/app/services/translation/translation.service';
import RobotoFont from 'src/assets/fonts/roboto.json';

@Component({
  selector: 'app-organizacijske-jedinice-pdf',
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
  templateUrl: './organizacijske-jedinice-pdf.component.html',
  styleUrl: './organizacijske-jedinice-pdf.component.scss'
})
export class OrganizacijskeJedinicePdfComponent {
  public zaposleni!: OrganizacijskeJedinice[];

  public allColumns: boolean = true;
  public robotoFont: string = RobotoFont.robotoFont;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private http: HttpService,
    private globalVar: GlobalVariablesService,
    private globalFn: GlobalFunctionsService,
    private session: SessionService,
    private t: TranslationService
  ) { }

  public generatePDF(columns: string[], data: any, numberOfColumns: number, title: string): void {

    let orientation: 'p' | 'l' = numberOfColumns <= 4 ? 'p' : 'l';
    let dataAsArray: any = [];

    for (let i = 0; i < data.length; i++) {
      dataAsArray.push([]);

      dataAsArray[i].push(i + 1);

      if (this.dialogData.headers.includes('SIF_OJ') || this.allColumns) {
        dataAsArray[i].push(data[i].SIF_OJ);
      }

      if (this.dialogData.headers.includes('NAZ_OJ') || this.allColumns) {
        dataAsArray[i].push(data[i].NAZ_OJ);
      }

      if (this.dialogData.headers.includes('IDK') || this.allColumns) {
        dataAsArray[i].push(data[i].IDK);
      }

    }

    const doc = new jsPDF(orientation, 'pt', 'a4');
    doc.addFileToVFS('Roboto-Medium-normal.ttf', this.robotoFont);
    doc.addFont('Roboto-Medium-normal.ttf', 'Roboto-Medium', 'normal');
    doc.setFont('Roboto-Medium');
    let image: string;
    let marginLeftRight = 54, marginTop = 140, marginBottom = 70, headerImageWidth = 48, headerImageHeight = 58, headerImageMarginTop = 25,
      headerTextMarginLeft = 110, headerTextMarginTop = 50, titleMarginLeft = 215, titleMarginTop = 120, textFontSizeSmall = 9, textFontSizeNormal = 18;
    this.globalVar.headerTitle = this.t.translate('OrganizationalUnit');
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
      margin: { top: marginTop, right: marginLeftRight, bottom: marginBottom, left: marginLeftRight }
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
      doc.text(this.t.translate('CreationTime') + ': ' + moment().format('DD. MM. YYYY. HH:mm:ss'), marginLeftRight, pageHeight - marginLeftRight, { align: 'left', });
      doc.text(String(i) + ' / ' + String(pageCount), doc.internal.pageSize.getWidth() - marginLeftRight, pageHeight - marginLeftRight, { align: 'right', });
    }
    doc.save(title + '.pdf');

  }

  public getData(selectedSearchOption: string): void {

    this.http.postWithParams(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getOJ',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: '%' + this.dialogData.searchParam + '%',
          limit: 1000,
          sort: [
            {
              property: 'SIF_OJ',
              direction: 'ASC'
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.zaposleni = response.debugData.data;
      let columnsList: string[] = [];

      if (this.dialogData.headers.includes('SIF_OJ') || this.allColumns) {
        columnsList.push(this.t.translate('SIF_OJ'));
      }

      if (this.dialogData.headers.includes('NAZ_OJ') || this.allColumns) {
        columnsList.push(this.t.translate('NAZ_OJ'));
      }

      if (this.dialogData.headers.includes('IDK') || this.allColumns) {
        columnsList.push(this.t.translate('IDK'));
      }

      this.generatePDF(columnsList, this.zaposleni, columnsList.length, this.t.translate('OrganizationalUnit'));
    });

  }
}
