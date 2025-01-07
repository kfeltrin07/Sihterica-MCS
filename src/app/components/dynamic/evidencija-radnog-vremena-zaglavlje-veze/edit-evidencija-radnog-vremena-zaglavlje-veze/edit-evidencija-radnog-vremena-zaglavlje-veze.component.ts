import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { PickEvidencijaVezeIzracunaComponent } from 'src/app/components/pickers/pick-evidencija-veze-izracuna/pick-evidencija-veze-izracuna.component';
import { PickEvidencijaVezeSifraComponent } from 'src/app/components/pickers/pick-evidencija-veze-sifra/pick-evidencija-veze-sifra.component';
import { CRUDAction, EvidencijaRadVreZagVeze, EvidVezeIzracuna, EvidVezeSifra } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-edit-evidencija-radnog-vremena-zaglavlje-veze',
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
  templateUrl: './edit-evidencija-radnog-vremena-zaglavlje-veze.component.html',
  styleUrl: './edit-evidencija-radnog-vremena-zaglavlje-veze.component.scss'
})
export class EditEvidencijaRadnogVremenaZaglavljeVezeComponent implements OnInit {
  public EvidencijaRadVreZagVeze: EvidencijaRadVreZagVeze = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    RID: "",
    SIF_STUPCA: "",
    SIF_VP: "",
    KNAZIV: "",
    OPIS: "",
    NAZ_VP: "",
    SI: "",
    XFAKTOR: "",
    SIF_VLAS: "",
  };

  public varNames: any = {
    NAZ_OJ: ""
  }

  public EvidVezeSifraDropdownIndex: number = -1;
  public offeredEvidVezeSifra: EvidVezeSifra[] = [];
  public selectedEvidVezeSifra: EvidVezeSifra = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIF_STUPCA: "",
    KNAZIV: ""
  };

  public EvidVezeIzracunaDropdownIndex: number = -1;
  public offeredEvidVezeIzracuna: EvidVezeIzracuna[] = [];
  public selectedEvidVezeIzracuna: EvidVezeIzracuna = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIF_VLAS: "",
    SIFRA: "",
    OPIS: "",
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public receivedEvidencijaRadVreZagVeze: EvidencijaRadVreZagVeze,
    private dialogRef: MatDialogRef<EditEvidencijaRadnogVremenaZaglavljeVezeComponent>,
    private http: HttpClient,
    public globalVar: GlobalVariablesService,
    public globalFn: GlobalFunctionsService,
    public t: TranslationService,
    public session: SessionService,
    public dialog: MatDialog
  ) {
    let keys: keyof EvidencijaRadVreZagVeze;
    for (keys in this.EvidencijaRadVreZagVeze) {
      if (keys != 'UKUPANBROJSLOGOVA' && keys != 'RN') {
        this.EvidencijaRadVreZagVeze[keys] = receivedEvidencijaRadVreZagVeze[keys]
      }
    }
  }

  public ngOnInit(): void {
    this.OfferedEvidVezeSifra();
    this.OfferedEvidVezeIzracuna();
  }

  public validateForm(EvidencijaRadVreZagVeze: EvidencijaRadVreZagVeze): boolean {
    if (EvidencijaRadVreZagVeze.SIF_STUPCA != '' && EvidencijaRadVreZagVeze.SIF_VP != '') {
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
        method: 'updateEvRadnogVremenaZagVeze',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pAkcija: CRUDAction.Update,
          pSifVlas: this.session.loggedInUser.ownerID,
          pSifStupca: this.EvidencijaRadVreZagVeze.SIF_STUPCA,
          pSifVp: this.EvidencijaRadVreZagVeze.SIF_VP,
          pXFaktor: this.EvidencijaRadVreZagVeze.KNAZIV,
          pRid: this.EvidencijaRadVreZagVeze.RID
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
    });

    this.dialogRef.close();

  }


  //EvidVezeSifra START
  public pickEvidVezeSifra(): void {
    const dialogRef = this.dialog.open(PickEvidencijaVezeSifraComponent, {});

    dialogRef.afterClosed().subscribe((EvidVezeSifra?: EvidVezeSifra) => {
      this.setEvidVezeSifraFromDialog(EvidVezeSifra);
    });
  }

  public setEvidVezeSifraFromDialog(EvidVezeSifra?: EvidVezeSifra): void {
    if (EvidVezeSifra) {
      this.EvidencijaRadVreZagVeze.SIF_STUPCA = EvidVezeSifra.SIF_STUPCA;
      this.EvidencijaRadVreZagVeze.KNAZIV = EvidVezeSifra.KNAZIV;
    }
  }

  public removeEvidVezeSifra(e: Event): void {
    e.preventDefault();
    this.EvidencijaRadVreZagVeze.SIF_STUPCA = "";
    this.EvidencijaRadVreZagVeze.KNAZIV = "";

  }

  public refreshEvidVezeSifra(searchParam: string, isSelected: boolean): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaZagVezeSifra',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: searchParam,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "SIF_STUPCA",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      console.log(response);
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredEvidVezeSifra = response.debugData.data;
      if (!isSelected) {
        document.getElementById("offeredEvidVezeSifra-dropdown")?.classList.add("select-dropdown-content-visible");
      }
    });
  }

  public OfferedEvidVezeSifra(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaZagVezeSifra',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: this.EvidencijaRadVreZagVeze.SIF_STUPCA,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "SIF_STUPCA",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {

      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredEvidVezeSifra = response.debugData.data;
      for (let item of this.offeredEvidVezeSifra) {
        if (item.SIF_STUPCA == this.EvidencijaRadVreZagVeze.SIF_STUPCA) {
          this.EvidencijaRadVreZagVeze.KNAZIV = item.KNAZIV;
        }
      }
    });
  }

  public selectEvidVezeSifra(EvidVezeSifra: EvidVezeSifra): void {
    this.EvidencijaRadVreZagVeze.SIF_STUPCA = EvidVezeSifra.SIF_STUPCA;
    this.EvidencijaRadVreZagVeze.KNAZIV = EvidVezeSifra.KNAZIV;
    document.getElementById("offeredEvidVezeSifra-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.EvidVezeSifraDropdownIndex = -1;
  }

  public resetEvidVezeSifra(): void {
    this.EvidVezeSifraDropdownIndex = -1;
    document.getElementById("offeredEvidVezeSifra-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //EvidVezeSifra END

  //EvidVezeIzracuna START
  public pickEvidVezeIzracuna(): void {
    const dialogRef = this.dialog.open(PickEvidencijaVezeIzracunaComponent, {});

    dialogRef.afterClosed().subscribe((EvidVezeIzracuna?: EvidVezeIzracuna) => {
      this.setEvidVezeIzracunaFromDialog(EvidVezeIzracuna);
    });
  }

  public setEvidVezeIzracunaFromDialog(EvidVezeIzracuna?: EvidVezeIzracuna): void {
    if (EvidVezeIzracuna) {
      this.EvidencijaRadVreZagVeze.SIF_VP = EvidVezeIzracuna.SIFRA;
      this.EvidencijaRadVreZagVeze.NAZ_VP = EvidVezeIzracuna.OPIS;
    }
  }

  public removeEvidVezeIzracuna(e: Event): void {
    e.preventDefault();
    this.EvidencijaRadVreZagVeze.SIF_VP = "";
    this.EvidencijaRadVreZagVeze.NAZ_VP = "";

  }

  public refreshEvidVezeIzracuna(searchParam: string, isSelected: boolean): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaZagVrIzracuna',
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
      this.offeredEvidVezeIzracuna = response.debugData.data;
      if (!isSelected) {
        document.getElementById("offeredEvidVezeIzracuna-dropdown")?.classList.add("select-dropdown-content-visible");
      }
    });
  }

  public OfferedEvidVezeIzracuna(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaZagVrIzracuna',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: this.EvidencijaRadVreZagVeze.SIF_STUPCA,
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
      this.offeredEvidVezeIzracuna = response.debugData.data;
      for (let item of this.offeredEvidVezeIzracuna) {
        if (item.SIFRA == this.EvidencijaRadVreZagVeze.SIF_VP) {
          this.EvidencijaRadVreZagVeze.NAZ_VP = item.OPIS;
        }
      }
    });
  }

  public selectEvidVezeIzracuna(EvidVezeIzracuna: EvidVezeIzracuna): void {
    this.EvidencijaRadVreZagVeze.SIF_VP = EvidVezeIzracuna.SIFRA;
    this.EvidencijaRadVreZagVeze.NAZ_VP = EvidVezeIzracuna.OPIS;
    document.getElementById("offeredEvidVezeIzracuna-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.EvidVezeIzracunaDropdownIndex = -1;
  }

  public resetEvidVezeIzracuna(): void {
    this.EvidVezeIzracunaDropdownIndex = -1;
    document.getElementById("offeredEvidVezeIzracuna-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //EvidVezeSifra END
}
