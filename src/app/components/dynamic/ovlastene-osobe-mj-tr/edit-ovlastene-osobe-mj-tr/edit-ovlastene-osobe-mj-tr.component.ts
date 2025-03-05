import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { PickOrgJediniceComponent } from 'src/app/components/pickers/pick-org-jedinice/pick-org-jedinice.component';
import { PickOvlasteneOsobeComponent } from 'src/app/components/pickers/pick-ovlastene-osobe/pick-ovlastene-osobe.component';
import { PickZaposleniComponent } from 'src/app/components/pickers/pick-zaposleni/pick-zaposleni.component';
import { OvlastenaOsobaMjTr, OrganizacijskeJedinice, Zaposleni, CRUDAction, Operateri } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
    selector: 'app-edit-ovlastene-osobe-mj-tr',
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
    templateUrl: './edit-ovlastene-osobe-mj-tr.component.html',
    styleUrl: './edit-ovlastene-osobe-mj-tr.component.scss'
})
export class EditOvlasteneOsobeMjTrComponent {

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
  public filteredOrganizacijskeJedinice: OrganizacijskeJedinice[] = [];
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

  public OperateriDropdownIndex: number = -1;
  public offeredOperateri: Operateri[] = [];
  public filteredOperateri: Operateri[] = [];
  public selectedOperateri: Operateri = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    ID: "",
    NAZIV: "",
    USERNAME: "",
    PASSWORD: "",
    NAPOMENA: "",
    IDULOGE: "",
    ULOGA: "",
  };
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public receivedOvlastenaOsobaMjTr: OvlastenaOsobaMjTr,
    public dialogRef: MatDialogRef<EditOvlasteneOsobeMjTrComponent>,
    private http: HttpClient,
    public globalVar: GlobalVariablesService,
    public globalFn: GlobalFunctionsService,
    public t: TranslationService,
    public session: SessionService,
    public dialog: MatDialog
  ) { 
    let keys:keyof OvlastenaOsobaMjTr;
    for(keys in this.OvlastenaOsobaMjTr){
      if(keys!='UKUPANBROJSLOGOVA' && keys!='RN'){
        this.OvlastenaOsobaMjTr[keys]=  receivedOvlastenaOsobaMjTr[keys]
      }
    }
  }

  public ngOnInit(): void { 
  }

  public validateForm(OvlastenaOsobaMjTr: OvlastenaOsobaMjTr): boolean {
    if (OvlastenaOsobaMjTr.ID != '' && OvlastenaOsobaMjTr.SIFMJTR != '' && OvlastenaOsobaMjTr.OD != '' && OvlastenaOsobaMjTr.DO != '' && OvlastenaOsobaMjTr.SATI != '') {
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
          pAkcija: CRUDAction.Update,
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
          limit: 10,
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

  public OfferedOrganizationalUnits(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getOJ',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: this.OvlastenaOsobaMjTr.SIFMJTR,
          limit: 10,
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

      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredOrganizacijskeJedinice = response.debugData.data;
      for (let item of this.offeredOrganizacijskeJedinice) {
        if (item.SIF_OJ == this.OvlastenaOsobaMjTr.SIFMJTR) {
          this.varNames.NAZ_OJ = item.NAZ_OJ;
        }
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
    public pickOperateri(): void {
      const dialogRef = this.dialog.open(PickOvlasteneOsobeComponent, {});
  
      dialogRef.afterClosed().subscribe((Operateri?: Operateri) => {
        this.setOperateriFromDialog(Operateri);
      });
    }
  
    public setOperateriFromDialog(Operateri?: Operateri): void {
      if (Operateri) {
        this.OvlastenaOsobaMjTr.ID = Operateri.ID;
        this.varNames.NAZIV = Operateri.NAZIV;
      }
    }
  
    public removeOperateri(e: Event): void {
      e.preventDefault();
      this.OvlastenaOsobaMjTr.ID = "";
      this.varNames.NAZIV = "";
  
    }
  
    public refreshOperateri(searchParam: string, isSelected: boolean): void {
      this.http.post(
        this.globalVar.APIHost + this.globalVar.APIFile,
        {
          action: 'Sihterica',
          method: 'getPregledOperatera',
          sid: this.session.loggedInUser.sessionID,
          data: {
            pDioNaziva: searchParam,
            limit: 10,
            page: 1,
            sort: [
              {
                property: "ID",
                direction: "ASC"
              }
            ]
          }
        }
      ).subscribe((response: any) => {
        console.log(response);
        this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
        this.offeredOperateri = response.debugData.data;
        this.filteredOperateri = response.debugData.data;
        if (!isSelected) {
          document.getElementById("offeredOperateri-dropdown")?.classList.add("select-dropdown-content-visible");
        }
      });
    }
  
    public OfferedOperateri(): void {
      this.http.post(
        this.globalVar.APIHost + this.globalVar.APIFile,
        {
          action: 'Sihterica',
          method: 'getPregledOperatera',
          sid: this.session.loggedInUser.sessionID,
          data: {
            pDioNaziva: this.OvlastenaOsobaMjTr.ID,
            limit: 10,
            page: 1,
            sort: [
              {
                property: "ID",
                direction: "ASC"
              }
            ]
          }
        }
      ).subscribe((response: any) => {
  
        this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
        this.offeredOperateri = response.debugData.data;
        for (let item of this.offeredOperateri) {
          if (item.ID.toUpperCase() == this.OvlastenaOsobaMjTr.ID.toUpperCase()) {
            this.varNames.NAZIV = item.NAZIV;
            this.OvlastenaOsobaMjTr.ID = item.ID;
          }
        }
      });
    }
  
    public filterOperateri(text: string): void {
      if (!text) {
        this.refreshOperateri("",false);
        return;
      }
    
      this.offeredOperateri = this.filteredOperateri.filter(
        item => item?.ID.toLowerCase().includes(text.toLowerCase())
      );
  
      if(this.offeredOperateri.length == 0){
        this.refreshOperateri(text,false);
      }
    }
  
    public selectOperateri(Operateri: Operateri): void {
      this.OvlastenaOsobaMjTr.ID = Operateri.ID;
      this.varNames.NAZIV = Operateri.NAZIV;
      document.getElementById("offeredOperateri-dropdown")?.classList.remove("select-dropdown-content-visible");
      this.OperateriDropdownIndex = -1;
    }
  
    public resetOperateri(): void {
      this.OperateriDropdownIndex = -1;
      document.getElementById("offeredOperateri-dropdown")?.classList.remove("select-dropdown-content-visible");
    }
    //ZAPOSLENI END
}
