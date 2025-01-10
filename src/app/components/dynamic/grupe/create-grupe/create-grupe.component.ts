import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PickEvidencijaHelpRadniciComponent } from 'src/app/components/pickers/pick-evidencija-help-radnici/pick-evidencija-help-radnici.component';
import { PickShemeComponent } from 'src/app/components/pickers/pick-sheme/pick-sheme.component';
import { CRUDAction, Grupe, Sheme, EvRadnogVremenaHelpRadnici } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-create-grupe',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,

    CdkDrag,
    CdkDragHandle,
    FormsModule,
    CommonModule,
    TranslationPipe
  ],
  templateUrl: './create-grupe.component.html',
  styleUrl: './create-grupe.component.scss'
})
export class CreateGrupeComponent {
  public Grupe: Grupe = {
    UKUPANBROJSLOGOVA:0,
    RN:0,
    ID_GRUPE: "",
    NAZ_GRUPE: "",
  };

  public varNames: any = {
    NAZ_OJ: ""
  }

  /*
  public ShemeDropdownIndex: number = -1;
  public offeredSheme: Sheme[] = [];
  public selectedSheme: Sheme = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIF_SHEME: "",
    OPIS: "",
    OD: "",
    DO: "",
    PAUZA_OD: "",
    PAUZA_DO: "",
  };

  public ZaposleniDropdownIndex: number = -1;
  public offeredZaposleni: EvRadnogVremenaHelpRadnici[] = [];
  public selectedZaposleni: EvRadnogVremenaHelpRadnici = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    MBR: "",
    PREZIME_IME: "",
    OSOBA: "",
  };*/

  constructor(
    private dialogRef: MatDialogRef<CreateGrupeComponent>,
    private http: HttpClient,
    public globalVar: GlobalVariablesService,
    public globalFn: GlobalFunctionsService,
    public t: TranslationService,
    public session: SessionService,
    public dialog: MatDialog
  ) { }

  public ngOnInit(): void { }

  public validateForm(Grupe: Grupe): boolean {
    if (Grupe.ID_GRUPE != '' && Grupe.NAZ_GRUPE != '') {
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
        method: 'updateGrupe',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pAkcija: CRUDAction.Insert,
          pSifVlas: this.session.loggedInUser.ownerID,
          pIdGrupe: this.Grupe.ID_GRUPE,
          pNazGrupe: this.Grupe.NAZ_GRUPE,
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
    });

    this.dialogRef.close();

  }



/*
  //Sheme START
  public pickSheme(): void {
    const dialogRef = this.dialog.open(PickShemeComponent, {});

    dialogRef.afterClosed().subscribe((Sheme?: Sheme) => {
      this.setShemeFromDialog(Sheme);
    });
  }

  public setShemeFromDialog(Sheme?: Sheme): void {
    if (Sheme) {
      this.Grupe.SIF_SHEME = Sheme.SIF_SHEME;
      this.Grupe.NAZ_SHEME = Sheme.OPIS;
    }
  }

  public removeSheme(e: Event): void {
    e.preventDefault();
    this.Grupe.SIF_SHEME = "";
    this.Grupe.NAZ_SHEME = "";
  }

  public refreshSheme(searchParam: string, isSelected: boolean): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getSheme',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: searchParam,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "SIF_SHEME",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      console.log(response);
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredSheme = response.debugData.data;
      if (!isSelected) {
        document.getElementById("offeredSheme-dropdown")?.classList.add("select-dropdown-content-visible");
      }
    });
  }

  public OfferedSheme(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getSheme',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: this.Grupe.SIF_SHEME,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "SIF_SHEME",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {

      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredSheme = response.debugData.data;
      for (let item of this.offeredSheme) {
        if (item.SIF_SHEME == this.Grupe.SIF_SHEME) {
          this.Grupe.NAZ_SHEME = item.OPIS;
        }
      }
    });
  }

  public selectSheme(Sheme: Sheme): void {
    this.Grupe.SIF_SHEME = Sheme.SIF_SHEME;
    this.Grupe.NAZ_SHEME = Sheme.OPIS;
    document.getElementById("offeredSheme-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.ShemeDropdownIndex = -1;
  }

  public resetSheme(): void {
    this.ShemeDropdownIndex = -1;
    document.getElementById("offeredSheme-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //ZAPOSLENI END

  //ZAPOSLENI START
  public pickZaposleni(): void {
    const dialogRef = this.dialog.open(PickEvidencijaHelpRadniciComponent, {});

    dialogRef.afterClosed().subscribe((EvRadnogVremenaHelpRadnici?: EvRadnogVremenaHelpRadnici) => {
      this.setZaposleniFromDialog(EvRadnogVremenaHelpRadnici);
    });
  }

  public setZaposleniFromDialog(EvRadnogVremenaHelpRadnici?: EvRadnogVremenaHelpRadnici): void {
    if (EvRadnogVremenaHelpRadnici) {
      this.Grupe.ID_RADNIKA = EvRadnogVremenaHelpRadnici.MBR;
      this.Grupe.NAZIV_RADNIKA = EvRadnogVremenaHelpRadnici.PREZIME_IME;
    }
  }

  public removeZaposleni(e: Event): void {
    e.preventDefault();
    this.Grupe.ID_RADNIKA = "";
    this.Grupe.NAZIV_RADNIKA = "";
  }

  public refreshZaposleni(searchParam: string, isSelected: boolean): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaHelpRadnici',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pMbr: searchParam,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "MBR",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      console.log(response);
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredZaposleni = response.debugData.data;
      if (!isSelected) {
        document.getElementById("offeredZaposleni-dropdown")?.classList.add("select-dropdown-content-visible");
      }
    });
  }

  public OfferedZaposleni(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaHelpRadnici',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pMbr: this.Grupe.ID_RADNIKA,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "MBR",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {

      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredZaposleni = response.debugData.data;
      for (let item of this.offeredZaposleni) {
        if (item.MBR == this.Grupe.ID_RADNIKA) {
          this.Grupe.NAZIV_RADNIKA = item.PREZIME_IME;
        }
      }
    });
  }

  public selectZaposleni(EvRadnogVremenaHelpRadnici: EvRadnogVremenaHelpRadnici): void {
    this.Grupe.ID_RADNIKA = EvRadnogVremenaHelpRadnici.MBR;
    this.Grupe.NAZIV_RADNIKA = EvRadnogVremenaHelpRadnici.PREZIME_IME;
    document.getElementById("offeredZaposleni-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.ZaposleniDropdownIndex = -1;
  }

  public resetZaposleniIndex(): void {
    this.ZaposleniDropdownIndex = -1;
    document.getElementById("offeredZaposleni-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //ZAPOSLENI END*/
}
