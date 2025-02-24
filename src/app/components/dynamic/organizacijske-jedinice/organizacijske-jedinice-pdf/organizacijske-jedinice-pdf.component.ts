import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { OrganizacijskeJedinice } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
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
    public dialogRef: MatDialogRef<OrganizacijskeJedinicePdfComponent>,
    private http: HttpClient,
    private globalVar: GlobalVariablesService,
    private session: SessionService,
  ) { }

  public generatePDF(): void {

    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIReport + '/hOj.php',
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
