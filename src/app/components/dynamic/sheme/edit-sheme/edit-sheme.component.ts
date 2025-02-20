import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CRUDAction, Sheme } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-edit-sheme',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,

    CdkDrag,
    CdkDragHandle,
    FormsModule,
    CommonModule,
    TranslationPipe
  ],
  templateUrl: './edit-sheme.component.html',
  styleUrl: './edit-sheme.component.scss'
})
export class EditShemeComponent implements OnInit {
  public Sheme: Sheme = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIF_SHEME: "",
    OPIS: "",
    OD: "",
    DO: "",
    PAUZA_OD: "",
    PAUZA_DO: "",
  };

  public varNames: any = {
    NAZ_OJ: ""
  }


  constructor(
    @Inject(MAT_DIALOG_DATA) public receivedSheme: Sheme,
    public dialogRef: MatDialogRef<EditShemeComponent>,
    private http: HttpClient,
    public globalVar: GlobalVariablesService,
    public globalFn: GlobalFunctionsService,
    public t: TranslationService,
    public session: SessionService,
    public dialog: MatDialog
  ) { }

  public ngOnInit(): void { 
    this.Sheme = this.receivedSheme;
  }

  public validateForm(Sheme: Sheme): boolean {
    if (Sheme.OPIS != '' && Sheme.OD != '' && Sheme.DO != '' && Sheme.PAUZA_OD != '' && Sheme.PAUZA_DO != '') {
      return false;
    } else {
      return true;
    }
  }

  public save(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'updateSheme',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pAkcija: CRUDAction.Update,
          pSifSheme: this.Sheme.SIF_SHEME,
          pSifVlas: this.session.loggedInUser.ownerID,
          pOpis: this.Sheme.OPIS,
          pOd: this.Sheme.OD,
          pDo: this.Sheme.DO,
          pPauzaOd: this.Sheme.PAUZA_OD,
          pPauzaDo: this.Sheme.PAUZA_DO,
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
    });

    this.dialogRef.close();

  }
}
