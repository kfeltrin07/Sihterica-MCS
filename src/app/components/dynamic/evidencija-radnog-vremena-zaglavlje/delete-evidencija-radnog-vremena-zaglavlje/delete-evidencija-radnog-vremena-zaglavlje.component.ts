import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CRUDAction, EvidencijaRadVreZag } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
    selector: 'app-delete-evidencija-radnog-vremena-zaglavlje',
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
    templateUrl: './delete-evidencija-radnog-vremena-zaglavlje.component.html',
    styleUrl: './delete-evidencija-radnog-vremena-zaglavlje.component.scss'
})
export class DeleteEvidencijaRadnogVremenaZaglavljeComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public recievedEvidencijaRadVreZag: EvidencijaRadVreZag,
    public dialogRef: MatDialogRef<DeleteEvidencijaRadnogVremenaZaglavljeComponent>,
    private http: HttpClient,
    private globalVar: GlobalVariablesService,
    private globalFn: GlobalFunctionsService,
    private t: TranslationService,
    private session: SessionService
  ) { }

  public delete(): void {

    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'updateEvRadnogVremenaZag',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pAkcija: CRUDAction.Delete,
          pRid: this.recievedEvidencijaRadVreZag.RID,
          pSifVlas: this.session.loggedInUser.ownerID
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
    });

  }
}
