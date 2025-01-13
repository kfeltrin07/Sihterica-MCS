import { SelectionModel } from '@angular/cdk/collections';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaginationComponent } from 'src/app/components/elements/pagination/pagination.component';
import { ZaposleniGrupe, Sorting, Grupe, OrganizacijskeJedinice, Sheme } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PickOrgJediniceComponent } from 'src/app/components/pickers/pick-org-jedinice/pick-org-jedinice.component';
import { PickShemeComponent } from 'src/app/components/pickers/pick-sheme/pick-sheme.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Component({
  selector: 'app-radnici-grupe',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatCheckboxModule,
    MatAutocompleteModule,

    CdkDrag,
    CdkDragHandle,
    CommonModule,
    FormsModule,
    TranslationPipe
  ],
  templateUrl: './radnici-grupe.component.html',
  styleUrl: './radnici-grupe.component.scss'
})
export class RadniciGrupeComponent {
  public displayedColumns: string[] = ['yes-no', 'MBR', 'PREZIME_IME', 'NAZ_ZAN'];
  public zaposleniGrupe: ZaposleniGrupe[] = [];
  public ZaposleniGrupe: ZaposleniGrupe = {
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
    U_GRUPI: ""
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

  public ShemeDropdownIndex: number = -1;
  public offeredSheme: Sheme[] = [];
  public filteredSheme: Sheme[] = [];
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

  public displayedZaposleniGrupe: ZaposleniGrupe[] = [];

  public selection = new SelectionModel<ZaposleniGrupe>(true, []);
  public oldSelection = new SelectionModel<ZaposleniGrupe>(true, []);

  public dataSource = new MatTableDataSource<ZaposleniGrupe>(this.zaposleniGrupe);

  public searchParam: string = '';
  public loading: boolean = true;
  public sorting: Sorting = {
    active: 'MBR',
    direction: 'ASC'
  };
  public isPaginatorShown: boolean = true;
  public pageIndex: number = 0;
  public pageSize = 15;
  public pageSizeOptions: number[] = [5, 10, 15];
  public length = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public receivedGrupa: Grupe,
    public http: HttpClient,
    public globalVar: GlobalVariablesService,
    private globalFn: GlobalFunctionsService,
    public session: SessionService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RadniciGrupeComponent>
  ) { }

  public ngOnInit(): void {
    this.getZaposleni();
    this.OfferedSheme();
  }

  public getZaposleni(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getZaposleniGrupe',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: this.searchParam,
          pSifSheme: this.receivedGrupa.SIF_SHEME,
          pIdGrupe: this.receivedGrupa.ID_GRUPE,
          pIdOperatera: this.session.loggedInUser.ID,
          pSifOj: this.varNames.SIFMJTR,
          limit: 100000,
          page: 1,
          sort: [
            {
              property: this.sorting.active,
              direction: this.sorting.direction
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      this.zaposleniGrupe = [];
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.zaposleniGrupe = response.debugData.data;
      this.dataSource.data = this.zaposleniGrupe;
      for (let zaposlenik of this.zaposleniGrupe) {
        (zaposlenik.U_GRUPI == "true") ? this.selection.select(zaposlenik) : ""
      }
      this.length = +response.debugData.data[0].UKUPANBROJSLOGOVA;
      this.loading = false;
      this.setDisplayedZaposleniGrupe();
    });
  }

  public startingRecord(): number {
    return Math.max(1, this.pageIndex * this.pageSize + 1);
  }

  public endingRecord(): number {
    return Math.min((this.pageIndex + 1) * this.pageSize, this.length);
  }

  public pageUp(): void {
    this.pageIndex++;
    this.setDisplayedZaposleniGrupe();
  }

  public pageDown(): void {
    this.pageIndex--;
    this.setDisplayedZaposleniGrupe();
  }

  public pageFirst(): void {
    this.pageIndex = 0;
    this.setDisplayedZaposleniGrupe();
  }

  public pageLast(): void {
    this.pageIndex = this.numberOfPages() - 1;
    this.setDisplayedZaposleniGrupe();
  }

  public numberOfPages(): number {
    if (this.length / this.pageSize % 1 == 0) {
      return this.length / this.pageSize;
    } else {
      return this.length / this.pageSize - (this.length / this.pageSize % 1) + 1;
    }
  }

  public setDisplayedZaposleniGrupe(): void {

    this.displayedZaposleniGrupe = [];
    for (let i = this.startingRecord() - 1; i < this.endingRecord(); i++) {
      this.displayedZaposleniGrupe.push(this.zaposleniGrupe[i]);
    }
    this.dataSource.data = this.displayedZaposleniGrupe;
  }

  public getRadniciGrupe(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getPopisRadnikaGrupe',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: this.searchParam,
          pSifVlas: this.session.loggedInUser.ownerID,
          pIdOperatera: this.session.loggedInUser.ID,
          pIdGrupe: this.receivedGrupa.ID_GRUPE,
          limit: 10000,
          page: 1,
          sort: [
            {
              property: 'NAZIV_RADNIKA',
              direction: 'ASC'
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      for (let zaposlenik of response.debugData.data) {
        this.selection.select(zaposlenik);
        this.oldSelection.select(zaposlenik)
      }
    });
  }

  public receiveMessage($event: any): void {
    if ($event.description == 'PageEvent') {
      this.pageIndex = $event.value.pageIndex;
      this.pageSize = $event.value.pageSize;
      this.refresh();
    }
  }


  public refresh(): void {
    this.loading = true;
    this.getZaposleni();
  }

  public sort(event: any): void {
    this.sorting = {
      active: event.active,
      direction: event.direction.toUpperCase()
    }
    setTimeout(() => this.refresh(), 1000);
  }

  public selectAll(): void {
    for (let i = 0; i < this.zaposleniGrupe.length; i++) {
      this.selection.select(this.zaposleniGrupe[i])
    }
  }

  public deselectAll(): void {
    this.selection.clear();
  }

  public save(): void {
    for(let zaposlenik of this.zaposleniGrupe){
      if(this.selection.isSelected(zaposlenik) && !this.oldSelection.isSelected(zaposlenik)){
        this.http.post(
          this.globalVar.APIHost + this.globalVar.APIFile,
          {
            action: 'Sihterica',
            method: 'dodajRadnikeUGrupu',
            sid: this.session.loggedInUser.sessionID,
            data: {
              pAkcija: 1,
              pSifVlas: this.session.loggedInUser.ownerID,
              pIdOperatera: this.session.loggedInUser.ID,
              pSifSheme: this.receivedGrupa.SIF_SHEME,
              pIdRadnika: zaposlenik.MBR,
              pIdGrupe: this.receivedGrupa.ID_GRUPE
            }
          }
        ).subscribe((response: any) => {
          this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
          
        });
      }
      if(!this.selection.isSelected(zaposlenik) && this.oldSelection.isSelected(zaposlenik)){
        this.http.post(
          this.globalVar.APIHost + this.globalVar.APIFile,
          {
            action: 'Sihterica',
            method: 'dodajRadnikeUGrupu',
            sid: this.session.loggedInUser.sessionID,
            data: {
              pAkcija: 0,
              pSifVlas: this.session.loggedInUser.ownerID,
              pIdOperatera: this.session.loggedInUser.ID,
              pSifSheme: this.receivedGrupa.SIF_SHEME,
              pIdRadnika: zaposlenik.MBR,
              pIdGrupe: this.receivedGrupa.ID_GRUPE
            }
          }
        ).subscribe((response: any) => {
          this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
          
        });
      }
    }
    
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
      this.varNames.SIFMJTR = OrganizacijskeJedinice.SIF_OJ;
      this.varNames.NAZ_OJ = OrganizacijskeJedinice.NAZ_OJ;
      this.refresh();
    }
  }

  public removeOrganizationalUnits(e: Event): void {
    e.preventDefault();
    this.varNames.SIFMJTR = "";
    this.varNames.NAZ_OJ = "";
    this.refresh();

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
      this.filteredOrganizacijskeJedinice = this.offeredOrganizacijskeJedinice;
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
          pDioNaziva: this.varNames.SIFMJTR,
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

      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredOrganizacijskeJedinice = response.debugData.data;
      for (let item of this.offeredOrganizacijskeJedinice) {
        if (item.SIF_OJ.toUpperCase() == this.varNames.SIFMJTR.toUpperCase()) {
          this.varNames.SIFMJTR = item.SIF_OJ;
          this.varNames.NAZ_OJ = item.NAZ_OJ;
          this.refresh();
        }
      }
    });
  }

  public filterOrganizationalUnits(text: string): void {
    if (!text) {
      this.refreshOrganizationalUnits("",false);
      return;
    }
  
    this.offeredOrganizacijskeJedinice = this.filteredOrganizacijskeJedinice.filter(
      item => item?.SIF_OJ.toLowerCase().includes(text.toLowerCase())
    );

    if(this.offeredOrganizacijskeJedinice.length == 0){
      this.refreshOrganizationalUnits(text,false);
    }
  }


  public selectOrganizationalUnits(OrganizacijskeJedinice: OrganizacijskeJedinice): void {
    this.varNames.SIFMJTR = OrganizacijskeJedinice.SIF_OJ;
    this.varNames.NAZ_OJ = OrganizacijskeJedinice.NAZ_OJ;
    this.refresh();
    document.getElementById("offeredOrganizacijskeJedinice-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.OrganizacijskeJediniceDropdownIndex = -1;
  }

  public resetOrganizationalUnits(): void {
    this.OrganizacijskeJediniceDropdownIndex = -1;
    document.getElementById("offeredOrganizacijskeJedinice-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //Organizacijska jedinica  END


  //Sheme START
  public pickSheme(): void {
    const dialogRef = this.dialog.open(PickShemeComponent, {});

    dialogRef.afterClosed().subscribe((Sheme?: Sheme) => {
      this.setShemeFromDialog(Sheme);
    });
  }

  public setShemeFromDialog(Sheme?: Sheme): void {
    if (Sheme) {
      this.receivedGrupa.SIF_SHEME = Sheme.SIF_SHEME;
      this.varNames.NAZ_SHEME = Sheme.OPIS;
    }
  }

  public removeSheme(e: Event): void {
    e.preventDefault();
    this.receivedGrupa.SIF_SHEME = "";
    this.varNames.NAZ_SHEME = "";
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
      this.filteredSheme = this.offeredSheme;
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
          pDioNaziva: this.receivedGrupa.SIF_SHEME,
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
        if (item.SIF_SHEME.toUpperCase() == this.receivedGrupa.SIF_SHEME.toUpperCase()) {
          this.varNames.NAZ_SHEME = item.OPIS;
          this.receivedGrupa.SIF_SHEME = item.SIF_SHEME;

        }
      }
    });
  }

  public filterSheme(text: string): void {
    if (!text) {
      this.refreshSheme("",false);
      return;
    }
  
    this.offeredSheme = this.filteredSheme.filter(
      item => item?.SIF_SHEME.toLowerCase().includes(text.toLowerCase())
    );

    if(this.offeredSheme.length == 0){
      this.refreshSheme(text,false);
    }
  }

  public selectSheme(Sheme: Sheme): void {
    this.receivedGrupa.SIF_SHEME = Sheme.SIF_SHEME;
    this.varNames.NAZ_SHEME = Sheme.OPIS;
    document.getElementById("offeredSheme-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.ShemeDropdownIndex = -1;
  }

  public resetSheme(): void {
    this.ShemeDropdownIndex = -1;
    document.getElementById("offeredSheme-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //Sheme END
}
