import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { PickEvidencijaVezeIzracunaComponent } from 'src/app/components/pickers/pick-evidencija-veze-izracuna/pick-evidencija-veze-izracuna.component';
import { PickEvidencijaVezeSifraComponent } from 'src/app/components/pickers/pick-evidencija-veze-sifra/pick-evidencija-veze-sifra.component';
import { EvidencijaRadVreZagVeze, EvidVezeSifra, EvidVezeIzracuna, CRUDAction } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-create-evidencija-radnog-vremena-zaglavlje-veze',
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
  templateUrl: './create-evidencija-radnog-vremena-zaglavlje-veze.component.html',
  styleUrl: './create-evidencija-radnog-vremena-zaglavlje-veze.component.scss'
})
export class CreateEvidencijaRadnogVremenaZaglavljeVezeComponent implements OnInit {
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
    XFAKTOR: "1",
    SIF_VLAS: "",
  };

  public varNames: any = {
    NAZ_OJ: ""
  }

  public EvidVezeSifraDropdownIndex: number = -1;
  public offeredEvidVezeSifra: EvidVezeSifra[] = [];
  public filteredEvidVezeSifra: EvidVezeSifra[] = [];
  public selectedEvidVezeSifra: EvidVezeSifra = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIF_STUPCA: "",
    KNAZIV: ""
  };

  public EvidVezeIzracunaDropdownIndex: number = -1;
  public offeredEvidVezeIzracuna: EvidVezeIzracuna[] = [];
  public filteredEvidVezeIzracuna: EvidVezeIzracuna[] = [];
  public selectedEvidVezeIzracuna: EvidVezeIzracuna = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIF_VLAS: "",
    SIFRA: "",
    OPIS: "",
  };

  constructor(
    private dialogRef: MatDialogRef<CreateEvidencijaRadnogVremenaZaglavljeVezeComponent>,
    private http: HttpClient,
    public globalVar: GlobalVariablesService,
    public globalFn: GlobalFunctionsService,
    public t: TranslationService,
    public session: SessionService,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
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
          pAkcija: CRUDAction.Insert,
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
      this.filteredEvidVezeSifra = response.debugData.data;
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
        if (item.SIF_STUPCA.toUpperCase() == this.EvidencijaRadVreZagVeze.SIF_STUPCA.toUpperCase()) {
          this.EvidencijaRadVreZagVeze.KNAZIV = item.KNAZIV;
          this.EvidencijaRadVreZagVeze.SIF_STUPCA = item.SIF_STUPCA;
        }
      }
    });
  }

  public filterEvidVezeSifra(text: string): void {
    if (!text) {
      this.refreshEvidVezeSifra("",false);
      return;
    }
  
    this.offeredEvidVezeSifra = this.filteredEvidVezeSifra.filter(
      item => item?.SIF_STUPCA.toLowerCase().includes(text.toLowerCase())
    );

    if(this.offeredEvidVezeSifra.length == 0){
      this.refreshEvidVezeSifra(text,false);
    }
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
      this.filteredEvidVezeIzracuna = response.debugData.data;
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
        if (item.SIFRA.toUpperCase() == this.EvidencijaRadVreZagVeze.SIF_VP.toUpperCase()) {
          this.EvidencijaRadVreZagVeze.NAZ_VP = item.OPIS;
          this.EvidencijaRadVreZagVeze.SIF_VP = item.SIFRA;
        }
      }
    });
  }

  public filterEvidVezeIzracuna(text: string): void {
    if (!text) {
      this.refreshEvidVezeIzracuna("",false);
      return;
    }
  
    this.offeredEvidVezeIzracuna = this.filteredEvidVezeIzracuna.filter(
      item => item?.SIFRA.toLowerCase().includes(text.toLowerCase())
    );

    if(this.offeredEvidVezeIzracuna.length == 0){
      this.refreshEvidVezeIzracuna(text,false);
    }
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
