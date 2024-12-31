import { DialogModule } from '@angular/cdk/dialog';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { PickOrgJediniceComponent } from 'src/app/components/pickers/pick-org-jedinice/pick-org-jedinice.component';
import { PickZaposleniComponent } from 'src/app/components/pickers/pick-zaposleni/pick-zaposleni.component';
import { CRUDAction, OrganizacijskeJedinice, OvlastenaOsobaMjTr, Zaposleni } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-create-ovlastene-osobe-mj-tr',
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
  templateUrl: './create-ovlastene-osobe-mj-tr.component.html',
  styleUrl: './create-ovlastene-osobe-mj-tr.component.scss'
})
export class CreateOvlasteneOsobeMjTrComponent {

  public OvlastenaOsobaMjTr: OvlastenaOsobaMjTr = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    ID: "",
    NAZIV: "",
    USERNAME: "",
    SIFMJTR: "",
    NAZMJTR: "",
    OD: "",
    DO: "",
    SATI: "",
  };

  public varNames: any = {
    NAZ_OJ: ""
  }

  public OrganizacijskeJediniceDropdownIndex: number = -1;
  public offeredOrganizacijskeJedinice: OrganizacijskeJedinice[] = [];
  public selectedOrganizacijskeJedinice: OrganizacijskeJedinice = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIFVLAS: "",
    SIF_OJ: "",
    NAZ_OJ: "",
    REG_BR: "",
    BOD_PC: "",
    KOEF_PC: "",
    VR_BOD: "",
    VR_KOEF: "",
    PROS_SAT: "",
    PROS_KOEF: "",
    PROS_BOD: "",
    IND1: "",
    SIF_NAD: "",
    BRO_HZZO: "",
    RSOPC: "",
    IDK: "",
    SYSD: ""
  };

  public ZaposleniDropdownIndex: number = -1;
  public offeredZaposleni: Zaposleni[] = [];
  public selectedZaposleni: Zaposleni = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIFVLAS: "",
    MBR: "",
    PREZIME_IME: "",
    SIF_RM: "",
    NAZ_ZAN: "",
    NAZ_RM: "",
    SIF_OJ: "",
    NAZ_OJ: "",
    IND: "",
  };

  constructor(
    private dialogRef: MatDialogRef<CreateOvlasteneOsobeMjTrComponent>,
    private http: HttpClient,
    public globalVar: GlobalVariablesService,
    public globalFn: GlobalFunctionsService,
    public t: TranslationService,
    public session: SessionService,
    public dialog: MatDialog
  ) { }

  public ngOnInit(): void { }

  public validateForm(OvlastenaOsobaMjTr: OvlastenaOsobaMjTr): boolean {
    if (OvlastenaOsobaMjTr.ID != '' && OvlastenaOsobaMjTr.SIFMJTR != '') {
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
        method: 'updateOvlOsobeMjTr',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pAkcija: CRUDAction.Insert,
          pIdKorisnika: this.OvlastenaOsobaMjTr.ID,
          pSifOJ: this.OvlastenaOsobaMjTr.SIFMJTR,
          pOd: this.OvlastenaOsobaMjTr.OD,
          pDo: this.OvlastenaOsobaMjTr.DO,
          pSati: this.OvlastenaOsobaMjTr.SATI
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
    });

    this.dialogRef.close();

  }


  //Organizacijska jedinica START
  public pickOrganizationalUnits(): void {
    const dialogRef = this.dialog.open(PickOrgJediniceComponent, {});

    dialogRef.afterClosed().subscribe((OrganizacijskeJedinice?: OrganizacijskeJedinice) => {
      this.setOrganizationalUnitsFromDialog(OrganizacijskeJedinice);
    });
  }

  public setOrganizationalUnitsFromDialog(OrganizacijskeJedinice?: OrganizacijskeJedinice): void {
    if (OrganizacijskeJedinice) {
      this.OvlastenaOsobaMjTr.SIFMJTR = OrganizacijskeJedinice.SIF_OJ;
      this.varNames.NAZ_OJ = OrganizacijskeJedinice.NAZ_OJ;
    }
  }

  public removeOrganizationalUnits(e: Event): void {
    e.preventDefault();
    this.OvlastenaOsobaMjTr.SIFMJTR = "";
    this.varNames.NAZ_OJ = "";

  }

  public refreshOrganizationalUnits(searchParam: string, isSelected: boolean): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getOJ',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: searchParam,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "SIF_OJ",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      console.log(response);
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredOrganizacijskeJedinice = response.debugData.data;
      if (!isSelected) {
        document.getElementById("offeredOrganizacijskeJedinice-dropdown")?.classList.add("select-dropdown-content-visible");
      }
    });
  }

  public selectOrganizationalUnits(OrganizacijskeJedinice: OrganizacijskeJedinice): void {
    this.OvlastenaOsobaMjTr.SIFMJTR = OrganizacijskeJedinice.SIF_OJ;
    this.varNames.NAZ_OJ = OrganizacijskeJedinice.NAZ_OJ;
    document.getElementById("offeredOrganizacijskeJedinice-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.OrganizacijskeJediniceDropdownIndex = -1;
  }

  public resetOrganizationalUnits(): void {
    this.OrganizacijskeJediniceDropdownIndex = -1;
    document.getElementById("offeredOrganizacijskeJedinice-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //Organizacijska jedinica  END

  //ZAPOSLENI START
  public pickZaposleni(): void {
    const dialogRef = this.dialog.open(PickZaposleniComponent, {});

    dialogRef.afterClosed().subscribe((Zaposleni?: Zaposleni) => {
      this.setZaposleniFromDialog(Zaposleni);
    });
  }

  public setZaposleniFromDialog(Zaposleni?: Zaposleni): void {
    if (Zaposleni) {
      this.OvlastenaOsobaMjTr.ID = Zaposleni.MBR;
      this.varNames.PREZIME_IME = Zaposleni.PREZIME_IME;
    }
  }

  public removeZaposleni(e: Event): void {
    e.preventDefault();
    this.OvlastenaOsobaMjTr.ID = "";
    this.varNames.PREZIME_IME = "";

  }

  public refreshZaposleni(searchParam: string, isSelected: boolean): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getZaposleni',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: searchParam,
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

  public selectZaposleni(Zaposleni: Zaposleni): void {
    this.OvlastenaOsobaMjTr.ID = Zaposleni.MBR;
    this.varNames.PREZIME_IME = Zaposleni.PREZIME_IME;
    document.getElementById("offeredZaposleni-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.ZaposleniDropdownIndex = -1;
  }

  public resetZaposleni(): void {
    this.ZaposleniDropdownIndex = -1;
    document.getElementById("offeredZaposleni-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //ZAPOSLENI END
}
