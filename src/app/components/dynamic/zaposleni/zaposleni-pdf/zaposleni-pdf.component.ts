import { Component, Inject } from '@angular/core';
import { Zaposleni } from 'src/app/models/models.service';
import RobotoFont from 'src/assets/fonts/roboto.json';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    public dialogRef: MatDialogRef<ZaposleniPdfComponent>,
    private http: HttpClient,
    private globalVar: GlobalVariablesService,
    private session: SessionService,
  ) {}

  public generatePDF(): void {

    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIReport +  '/hZaposleni.php',
      {
        pSID: this.session.loggedInUser.sessionID,
        pSifVlas: this.session.loggedInUser.ownerID,
        pDioNaziva: this.dialogData,
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
