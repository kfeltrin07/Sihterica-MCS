import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { EvidencijaRadVre, EvidencijaRadVreRad } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-pdf-evidencija-radnog-vremena',
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
  templateUrl: './pdf-evidencija-radnog-vremena.component.html',
  styleUrl: './pdf-evidencija-radnog-vremena.component.scss'
})
export class PdfEvidencijaRadnogVremenaComponent {
  public zaposleni!: EvidencijaRadVre[];

  public allColumns: boolean = true;

  public datum: any = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private http: HttpClient,
    private globalVar: GlobalVariablesService,
    public globalFn: GlobalFunctionsService,
    private session: SessionService,
  ) {}

  public generatePDF(): void {

    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIReport +  '/hEvRadVr.php',
      {
        pSID: this.session.loggedInUser.sessionID,
        pSifVlas: this.session.loggedInUser.ownerID,
        pIdKorisnika: this.session.loggedInUser.ID,
        pFondSati: this.dialogData.FondSati,
        pDatum: this.globalFn.formatDate(this.dialogData.datum),
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
