import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { PickOpisVrsteComponent } from 'src/app/components/pickers/pick-opis-vrste/pick-opis-vrste.component';
import { OvlastenaOsobaMjTr, CRUDAction, EvidencijaRadVreZag, OpisVrste } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-edit-evidencija-radnog-vremena-zaglavlje',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatTooltip,
    MatButtonModule,

    CdkDrag,
    CdkDragHandle,
    FormsModule,
    CommonModule,
    TranslationPipe
  ],
  templateUrl: './edit-evidencija-radnog-vremena-zaglavlje.component.html',
  styleUrl: './edit-evidencija-radnog-vremena-zaglavlje.component.scss'
})
export class EditEvidencijaRadnogVremenaZaglavljeComponent implements OnInit {
  public EvidencijaRadVreZag: EvidencijaRadVreZag = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    RID: "",
    SIF_STUPCA: "",
    RBROJ: "",
    KNAZIV: "",
    OPIS: "",
    VRSTA_SLOGA: "",
    OPISVRSTE: "",
  };

  public varNames: any = {
    NAZ_OJ: ""
  }

  public OpisVrsteDropdownIndex: number = -1;
  public offeredOpisVrste: OpisVrste[] = [];
  public selectedOpisVrste: OpisVrste = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIF_VLAS: "",
    SIFRA: "",
    OPIS: "",
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public receivedEvidencijaRadVreZag: EvidencijaRadVreZag,
    private dialogRef: MatDialogRef<EditEvidencijaRadnogVremenaZaglavljeComponent>,
    private http: HttpClient,
    public globalVar: GlobalVariablesService,
    public globalFn: GlobalFunctionsService,
    public t: TranslationService,
    public session: SessionService,
    public dialog: MatDialog
  ) {
    let keys: keyof EvidencijaRadVreZag;
    for (keys in this.EvidencijaRadVreZag) {
      if (keys != 'UKUPANBROJSLOGOVA' && keys != 'RN') {
        this.EvidencijaRadVreZag[keys] = receivedEvidencijaRadVreZag[keys]
      }
    }
  }

  public ngOnInit(): void {
    this.OfferedOpisVrste();
  }

  public validateForm(EvidencijaRadVreZag: EvidencijaRadVreZag): boolean {
    if (EvidencijaRadVreZag.SIF_STUPCA != '' && EvidencijaRadVreZag.VRSTA_SLOGA != '') {
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
        method: 'updateEvRadnogVremenaZag',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pAkcija: CRUDAction.Update,
          pSifVlas: this.session.loggedInUser.ownerID,
          pSifStupca: this.EvidencijaRadVreZag.SIF_STUPCA,
          pRBroj: this.EvidencijaRadVreZag.RBROJ,
          pKNaziv: this.EvidencijaRadVreZag.KNAZIV,
          pOpis: this.EvidencijaRadVreZag.OPIS,
          pVrstaSloga: this.EvidencijaRadVreZag.VRSTA_SLOGA,
          pRid: this.EvidencijaRadVreZag.RID
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
    });

    this.dialogRef.close();

  }


 //OpisVrste START
  public pickOpisVrste(): void {
    const dialogRef = this.dialog.open(PickOpisVrsteComponent, {});

    dialogRef.afterClosed().subscribe((OpisVrste?: OpisVrste) => {
      this.setOpisVrsteFromDialog(OpisVrste);
    });
  }

  public setOpisVrsteFromDialog(OpisVrste?: OpisVrste): void {
    if (OpisVrste) {
      this.EvidencijaRadVreZag.VRSTA_SLOGA = OpisVrste.SIFRA;
      this.EvidencijaRadVreZag.OPISVRSTE = OpisVrste.OPIS;
    }
  }

  public removeOpisVrste(e: Event): void {
    e.preventDefault();
    this.EvidencijaRadVreZag.VRSTA_SLOGA = "";
    this.EvidencijaRadVreZag.OPISVRSTE = "";

  }

  public refreshOpisVrste(searchParam: string, isSelected: boolean): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getOpisVrste',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: searchParam,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "SIFRA",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      console.log(response);
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredOpisVrste = response.debugData.data;
      if (!isSelected) {
        document.getElementById("offeredOpisVrste-dropdown")?.classList.add("select-dropdown-content-visible");
      }
    });
  }

  public OfferedOpisVrste(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getOpisVrste',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: this.EvidencijaRadVreZag.VRSTA_SLOGA,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "SIFRA",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {

      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredOpisVrste = response.debugData.data;
      for (let item of this.offeredOpisVrste) {
        if (item.SIFRA == this.EvidencijaRadVreZag.VRSTA_SLOGA) {
          this.EvidencijaRadVreZag.OPISVRSTE = item.OPIS;
        }
      }
    });
  }

  public selectOpisVrste(OpisVrste: OpisVrste): void {
    this.EvidencijaRadVreZag.VRSTA_SLOGA = OpisVrste.SIFRA;
    this.EvidencijaRadVreZag.OPISVRSTE = OpisVrste.OPIS;
    document.getElementById("offeredOpisVrste-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.OpisVrsteDropdownIndex = -1;
  }

  public resetOpisVrste(): void {
    this.OpisVrsteDropdownIndex = -1;
    document.getElementById("offeredOpisVrste-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //ZAPOSLENI END
}
