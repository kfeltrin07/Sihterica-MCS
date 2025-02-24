import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-pdf-dnevna-evidencija',
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
  templateUrl: './pdf-dnevna-evidencija.component.html',
  styleUrl: './pdf-dnevna-evidencija.component.scss'
})
export class PdfDnevnaEvidencijaComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<PdfDnevnaEvidencijaComponent>,
    private http: HttpClient,
    private globalVar: GlobalVariablesService,
    public globalFn: GlobalFunctionsService,
    private session: SessionService,
  ) {}

  public generatePDF(): void {

    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIReport +  '/hSihter.php',
      {
        pSID: this.session.loggedInUser.sessionID,
        pSifVlas: this.session.loggedInUser.ownerID,
        pIdKorisnika: this.session.loggedInUser.ID,
        pDatum: this.globalFn.formatDate(this.dialogData.DATUM),
        pMbr: this.dialogData.MBR,
        pZSifMt: this.dialogData.SIF_OJ,
        pSifOj: this.dialogData.SIF_OJ,
        pZSifVp: this.dialogData.SIF_VP,
      },
      {
        headers: new HttpHeaders({
          'Accept': 'application/pdf, text/html, application/xhtml+xml, */*',
          'Content-Type': 'application/pdf'
        }),
        responseType: 'arraybuffer'
        //responseType: 'text' 
      }
    ).subscribe((response: any) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      URL.revokeObjectURL(url);

    });
  }
}
