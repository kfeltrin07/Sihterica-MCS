import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PickGrupeComponent } from 'src/app/components/pickers/pick-grupe/pick-grupe.component';
import { PickVrstaPoslaComponent } from 'src/app/components/pickers/pick-vrsta-posla/pick-vrsta-posla.component';
import { CRUDAction, EvidencijaDnevna, Grupe, Sheme, VrstePosla, Zaposleni, ZaposleniPoGrupiIShemi } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { CreateGrupeComponent } from '../../grupe/create-grupe/create-grupe.component';

@Component({
  selector: 'app-create-dnevna-evidencija',
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
  templateUrl: './create-dnevna-evidencija.component.html',
  styleUrl: './create-dnevna-evidencija.component.scss'
})
export class CreateDnevnaEvidencijaComponent {
  public varNames: any = {
    ID_GRUPE: '',
    NAZ_GRUPE: '',
    SIF_VP: '',
    NAZ_VP: ''
  };

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

  public evidencijaDnevna: EvidencijaDnevna[] = [];
  public EvidencijaDnevna: EvidencijaDnevna = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIFVLAS: '',
    MBR: '',
    MBRX: '',
    OSOBA: '',
    SIF_VP: '',
    SIF_VP_N: '',
    ODHH: '',
    DOHH: '',
    RID: '',
    SATI: '',
    IDK: '',
    SYSD: '',
    OD: '',
    DO: '',
    IDK_N: '',
    ISATI: '',
    IODHH: '',
    IDOHH: '',
    SIF_MT: '',
    SIF_MT_N: '',
    DATUM: '',
    OSOBAX: '',
    SIF_VPX: '',
    SIF_MTX: '',
  };

  public zaposleniPoGrupiIShemi: ZaposleniPoGrupiIShemi[] = [];


  public GrupeDropdownIndex: number = -1;
  public offeredGrupe: Grupe[] = [];
  public filteredGrupe: Grupe[] = [];
  public selectedGrupe: Grupe = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    ID_GRUPE: "",
    NAZ_GRUPE: "",
    SIF_SHEME: "",
    SIF_OJ: "",
    NAZ_OJ: "",
    NAZ_SHEME: ""
  };

  public VrstePoslaDropdownIndex: number = -1;
  public offeredVrstePosla: VrstePosla[] = [];
  public filteredVrstePosla: VrstePosla[] = [];
  public selectedVrstePosla: VrstePosla = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIFVLAS: "",
    SIF_VP: "",
    NAZ_VP: "",
    SI: "",
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public receivedData: any,
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

  public Unos(zaposleni: ZaposleniPoGrupiIShemi): void {
    let SATI=(parseInt(this.Sheme.DO))-(parseInt(this.Sheme.OD));

    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'upisSihterice',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pAkcija: CRUDAction.Insert,
          pSifVlas: this.session.loggedInUser.ownerID,
          pDatum: this.globalFn.formatDate(this.receivedData.DATUM),
          pMbr: zaposleni.ID_RADNIKA,
          pSifOj: this.varNames.SIF_OJ,
          pSifVP: this.varNames.SIF_VP,
          pSati: SATI,
          pOd: this.Sheme.OD,
          pDo: this.Sheme.DO,
          pIdOperatera: this.session.loggedInUser.ID,
          pRid: ""
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
    });

    this.dialogRef.close();

  }

  public getZaposleniGrupe(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getPopisRadnikaGrupe',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pSifVlas: this.session.loggedInUser.ownerID,
          pIdOperatera: this.session.loggedInUser.ID,
          pIdGrupe: this.varNames.ID_GRUPE,
          limit: 1000000,
          page: 1,
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.zaposleniPoGrupiIShemi = response.debugData.data;

      this.http.post(
        this.globalVar.APIHost + this.globalVar.APIFile,
        {
          action: 'Sihterica',
          method: 'getSheme',
          sid: this.session.loggedInUser.sessionID,
          data: {
            pDioNaziva: '%%',
            pSifSheme: this.varNames.SIF_SHEME,
            limit: 1000000,
            page: 1,
            sort: [
              {
                property: 'SIF_SHEME',
                direction: 'ASC'
              }
            ]
          }
        }
      ).subscribe((response: any) => {
        this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
        this.Sheme = response.debugData.data[0];




        for (let zaposleni of this.zaposleniPoGrupiIShemi) {
          this.Unos(zaposleni);
        }
      });

    });
  }

  // GRUPE START
  public pickGrupe(): void {
    const dialogRef = this.dialog.open(PickGrupeComponent, {});

    dialogRef.afterClosed().subscribe((Grupe?: Grupe) => {
      this.setGrupeFromDialog(Grupe);
    });
  }

  public setGrupeFromDialog(Grupe?: Grupe): void {
    if (Grupe) {
      this.varNames.ID_GRUPE = Grupe.ID_GRUPE;
      this.varNames.NAZ_GRUPE = Grupe.NAZ_GRUPE;
      this.varNames.SIF_SHEME = Grupe.SIF_SHEME;
      this.varNames.SIF_OJ = Grupe.SIF_OJ;
      this.varNames.SATI = Grupe;
    }
  }

  public removeGrupe(e: Event): void {
    e.preventDefault();
    this.varNames.ID_GRUPE = "";
    this.varNames.NAZ_GRUPE = "";
    this.varNames.SIF_SHEME = "";
    this.varNames.SIF_OJ = "";

  }

  public refreshGrupe(searchParam: string, isSelected: boolean): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getGrupe',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: '%' + searchParam + '%',
          pSifSheme: '',
          pIdKorisnika: this.session.loggedInUser.ID,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "ID_GRUPE",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      console.log(response);
      this.offeredGrupe = response.debugData.data;
      this.filteredGrupe = this.offeredGrupe;
      console.log(isSelected);
      var dummyEl = document.getElementById('offeredGrupe1-help-span');
      var isFocused = (document.activeElement === dummyEl);
      if (!isSelected && isFocused) {
        document.getElementById("offeredGrupe1-dropdown")?.classList.add("select-dropdown-content-visible");
      }
    });
  }

  public OfferedGrupe(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getGrupe',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: this.varNames.ID_GRUPE,
          pSifSheme: '',
          pIdKorisnika: this.session.loggedInUser.ID,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "ID_GRUPE",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {

      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredGrupe = response.debugData.data;
      for (let item of this.offeredGrupe) {
        if (item.ID_GRUPE.toUpperCase() === this.varNames.ID_GRUPE.toUpperCase()) {
          this.varNames.NAZ_GRUPE = item.NAZ_GRUPE;
          this.varNames.ID_GRUPE = item.ID_GRUPE;
          this.varNames.SIF_SHEME = item.SIF_SHEME;
          this.varNames.SIF_OJ = item.SIF_OJ;
        }
      }
    });
  }

  public filterGrupe(text: string): void {
    if (!text) {
      this.refreshGrupe("", false);
      return;
    }

    this.offeredGrupe = this.filteredGrupe.filter(
      item => item?.ID_GRUPE.toLowerCase().includes(text.toLowerCase())
    );

    if (this.offeredGrupe.length == 0) {
      this.refreshGrupe(text, false);
    }
  }

  public selectGrupe(Grupe: Grupe): void {
    this.varNames.ID_GRUPE = Grupe.ID_GRUPE;
    this.varNames.NAZ_GRUPE = Grupe.NAZ_GRUPE;
    this.varNames.SIF_SHEME = Grupe.SIF_SHEME;
    this.varNames.SIF_OJ = Grupe.SIF_OJ;
    document.getElementById("offeredGrupe1-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.GrupeDropdownIndex = -1;
  }

  public resetGrupeIndex(): void {
    this.GrupeDropdownIndex = -1;
    document.getElementById("offeredGrupe1-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //GRUPE END


  // VRSTA POSLA START
  public pickVrstePosla(): void {
    const dialogRef = this.dialog.open(PickVrstaPoslaComponent, {});

    dialogRef.afterClosed().subscribe((VrstePosla?: VrstePosla) => {
      this.setVrstePoslaFromDialog(VrstePosla);
    });
  }

  public setVrstePoslaFromDialog(VrstePosla?: VrstePosla): void {
    if (VrstePosla) {
      this.varNames.SIF_VP = VrstePosla.SIF_VP;
      this.varNames.NAZ_VP = VrstePosla.NAZ_VP;
    }
  }

  public removeVrstePosla(e: Event): void {
    e.preventDefault();
    this.varNames.SIF_VP = "";
    this.varNames.NAZ_VP = "";

  }

  public async refreshVrstePosla(searchParam: string, isSelected: boolean) {
    await this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getVrstePosla',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: '%' + searchParam + '%',
          limit: 100,
          page: 1,
          sort: [
            {
              property: "SIF_VP",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      console.log(response);
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredVrstePosla = response.debugData.data;
      this.filteredVrstePosla = this.offeredVrstePosla;
      var dummyEl = document.getElementById('offeredVrstePosla1-help-span');
      var isFocused = (document.activeElement === dummyEl);
      if (!isSelected && isFocused) {
        document.getElementById("offeredVrstePosla1-dropdown")?.classList.add("select-dropdown-content-visible");
      }
    });
  }

  public OfferedVrstePosla(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getVrstePosla',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: this.varNames.SIF_VP,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "SIF_VP",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {

      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredVrstePosla = response.debugData.data;
      for (let item of this.offeredVrstePosla) {
        if (item.SIF_VP.toUpperCase() === this.varNames.SIF_VP.toUpperCase()) {
          this.varNames.NAZ_VP = item.NAZ_VP;
          this.varNames.SIF_VP = item.SIF_VP;
        }
      }
    });
  }

  public filterVrstePosla(text: string): void {
    if (!text) {
      this.refreshVrstePosla("", false);
      return;
    }

    this.offeredVrstePosla = this.filteredVrstePosla.filter(
      item => item?.SIF_VP.toLowerCase().includes(text.toLowerCase())
    );

    if (this.offeredVrstePosla.length == 0) {
      this.refreshVrstePosla(text, false);
    }
  }

  public selectVrstePosla(VrstePosla: VrstePosla): void {
    this.varNames.SIF_VP = VrstePosla.SIF_VP;
    this.varNames.NAZ_VP = VrstePosla.NAZ_VP;
    document.getElementById("offeredVrstePosla1-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.VrstePoslaDropdownIndex = -1;
  }

  public resetVrstePoslaIndex(): void {
    this.VrstePoslaDropdownIndex = -1;
    document.getElementById("offeredVrstePosla1-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //GRUPE END

}
