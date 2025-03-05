import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CRUDAction, OvlastenaOsobaMjTr } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
    selector: 'app-delete-ovlastene-osobe-mj-tr',
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
    templateUrl: './delete-ovlastene-osobe-mj-tr.component.html',
    styleUrl: './delete-ovlastene-osobe-mj-tr.component.scss'
})
export class DeleteOvlasteneOsobeMjTrComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public recievedOvlastenaOsobaMjTr: OvlastenaOsobaMjTr,
    public dialogRef: MatDialogRef<DeleteOvlasteneOsobeMjTrComponent>,
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
        method: 'updateOvlOsobeMjTr',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pAkcija: CRUDAction.Delete,
          pIdKorisnika: this.recievedOvlastenaOsobaMjTr.ID,
          pSifOJ: this.recievedOvlastenaOsobaMjTr.SIFMJTR
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
    });

  }
}
