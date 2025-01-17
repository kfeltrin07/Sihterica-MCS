import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CRUDAction } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-copy-dnevna-evidencija',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,

    CdkDrag,
    CdkDragHandle,
    TranslationPipe,
    CommonModule,
    FormsModule
  ],
  templateUrl: './copy-dnevna-evidencija.component.html',
  styleUrl: './copy-dnevna-evidencija.component.scss'
})
export class CopyDnevnaEvidencijaComponent {

  public varNames: any = {
    SADATUM:'',
    NADATUM:'',
  }

  constructor(
   @Inject(MAT_DIALOG_DATA) public recievedData: any,
    private http: HttpClient,
    private globalVar: GlobalVariablesService,
    private globalFn: GlobalFunctionsService,
    private t: TranslationService,
    private session: SessionService
  ) { }

  public copy(): void {
    this.http.post(this.globalVar.APIHost + this.globalVar.APIFile, {
      action: 'Sihterica',
      method: 'kopiranjeSihterice',
      sid: this.session.loggedInUser.sessionID,
      data: {
        pAkcija: CRUDAction.Insert,
        pSifVlas: this.session.loggedInUser.ownerID,
        pSaDatum: this.globalFn.formatDate(this.varNames.SADATUM),
        pNaDatum: this.globalFn.formatDate(this.varNames.NADATUM),
        pSifMt: this.recievedData.SIF_OJ,
        pSifVP: this.recievedData.SIF_VP,
        pMbr: this.recievedData.MBR,
        pSifOj: this.recievedData.SIF_OJ,
        pIdOperatera: this.session.loggedInUser.ID
      }
    }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
    });

  }
}
