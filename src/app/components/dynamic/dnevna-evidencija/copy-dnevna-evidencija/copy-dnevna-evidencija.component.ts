import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CRUDAction, EvidencijaDnevna, Sheme, ZaposleniPoGrupiIShemi } from 'src/app/models/models.service';
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
    SADATUM: '',
    NADATUM: '',
  }
  public ArrayPodatakaZaUnos: any = [];
  public evidencijaDnevna: EvidencijaDnevna[] = [];

  public sheme: Sheme[] = [];
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public recievedData: any,
    public dialogRef: MatDialogRef<CopyDnevnaEvidencijaComponent>,
    private http: HttpClient,
    private globalVar: GlobalVariablesService,
    private globalFn: GlobalFunctionsService,
    private t: TranslationService,
    private session: SessionService
  ) {
    this.varNames.SADATUM = this.recievedData.DATUM
   }

  public copy(): void {
    if (this.recievedData.MBR != '%' && this.recievedData.MBR != '') {
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
    else {
      this.ArrayPodatakaZaUnos= [];
      this.getEvidencijaDnevna();
    }

  }



  public Unos(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'upisSihtericeGrupni',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pPodaci: JSON.stringify(this.ArrayPodatakaZaUnos)
        }
      }
    ).subscribe((response: any) => {
      if (response.debugData.data.length != 0) {
        this.globalVar.snackBarTableData = response.debugData.data;
        this.globalFn.showSnackbarCostum(response.debugData.data.length);
      }
      else {
        this.globalFn.showSnackbarError("Dogodila se neka greška kod unosa");
      }
    });

    this.dialogRef.close();

  }

  public getEvidencijaDnevna(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvidencijaDnevna',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pSifVlas: this.session.loggedInUser.ownerID,
          pIdKorisnika: this.session.loggedInUser.ID,
          pMbr: this.recievedData.MBR ? this.recievedData.MBR : "%",
          pDatum: this.globalFn.formatDate(this.varNames.SADATUM),
          pSifOj: this.recievedData.SIF_OJ ? this.recievedData.SIF_OJ : "%",
          pZSifMt: this.recievedData.SIF_OJ ? this.recievedData.SIF_OJ : "%",
          pZSifVp: this.recievedData.SIF_VP ? this.recievedData.SIF_VP : "%",
          limit: 10000,
          page: 1,
          sort: [
            {
              property: 'MBR',
              direction: 'ASC'
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      this.evidencijaDnevna = response.debugData.data;

      for (let zaposleni of this.evidencijaDnevna) {
        this.ArrayPodatakaZaUnos = [...this.ArrayPodatakaZaUnos, {
          pAkcija: CRUDAction.Insert,
          pMbr: zaposleni.MBR,
          pSifVlas: this.session.loggedInUser.ownerID,
          pSifOj: zaposleni.SIF_MT,
          pSifVP: zaposleni.SIF_VP,
          pDatum: this.globalFn.formatDate(this.varNames.NADATUM),
          pSati: zaposleni.SATI,
          pOd: zaposleni.OD,
          pDo: zaposleni.DO,
          pIdOperatera: this.session.loggedInUser.ID
        }];
      }

      this.Unos();

    });
  }
}
