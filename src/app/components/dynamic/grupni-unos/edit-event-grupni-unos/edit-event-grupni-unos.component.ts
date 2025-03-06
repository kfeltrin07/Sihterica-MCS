import { SelectionModel } from '@angular/cdk/collections';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaginationComponent } from 'src/app/components/elements/pagination/pagination.component';
import { CRUDAction, EvidencijaRadVreOj, Grupe, Sheme, Sorting, ZaposleniPoGrupiIShemi } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { EditGrupeComponent } from "../../grupe/edit-grupe/edit-grupe.component";
import { RadniciGrupeComponent } from '../../grupe/radnici-grupe/radnici-grupe.component';
import { EventGrupniUnosComponent } from '../event-grupni-unos/event-grupni-unos.component';
import { PickEvidencijaHelpOjComponent } from 'src/app/components/pickers/pick-evidencija-help-oj/pick-evidencija-help-oj.component';
import { PickShemeComponent } from 'src/app/components/pickers/pick-sheme/pick-sheme.component';

@Component({
  selector: 'app-edit-event-grupni-unos',
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
    MatTabsModule,
    CdkDrag,
    CdkDragHandle,
    PaginationComponent,
    CommonModule,
    FormsModule,
    TranslationPipe,
  ],
  templateUrl: './edit-event-grupni-unos.component.html',
  styleUrl: './edit-event-grupni-unos.component.scss'
})
export class EditEventGrupniUnosComponent implements OnInit {
  public displayedColumns: string[] = ['ID_RADNIKA', 'NAZIV_RADNIKA', 'SIF_OJ', 'NAZ_OJ', 'OD', 'DO', 'SATI'];

  public grupe: Grupe[] = [];
  public Grupe: Grupe = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    ID_GRUPE: "",
    NAZ_GRUPE: "",
    SIF_SHEME: "",
    SIF_OJ: "",
    NAZ_OJ: "",
    NAZ_SHEME: "",
    OD: "",
    DO: "",
    PAUZA_DO: '',
    PAUZA_OD: ''
  };
  public GrupaToSend: Grupe = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    ID_GRUPE: "",
    NAZ_GRUPE: "",
    SIF_SHEME: "",
    SIF_OJ: "",
    NAZ_OJ: "",
    NAZ_SHEME: "",
    OD: "",
    DO: "",
    PAUZA_DO: '',
    PAUZA_OD: ''
  };

  public zaposleniPoGrupiIShemi: ZaposleniPoGrupiIShemi[] = [];
  public ZaposleniPoGrupiIShemi: ZaposleniPoGrupiIShemi = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIFVLAS: "",
    ID_GRUPE: "",
    SIF_SHEME: "",
    NAZ_SHEME: "",
    OD: "",
    DO: "",
    SATI: "",
    ID_RADNIKA: "",
    NAZIV_RADNIKA: "",
    SIF_RM: "",
    NAZ_RM: "",
    SIF_OJ: "",
    NAZ_OJ: ""

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

  public EvidencijaRadVreOjDropdownIndex: number = -1;
  public offeredEvidencijaRadVreOj: EvidencijaRadVreOj[] = [];
  public filteredEvidencijaRadVreOj: EvidencijaRadVreOj[] = [];
  public selectedEvidencijaRadVreOj: EvidencijaRadVreOj = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIF_OJ: "",
    NAZMJTR: "",
    VRSTA: "",
  };

  public varNames: any = {
    OD: "",
    DO: ""
  }

  public dataSource = this.zaposleniPoGrupiIShemi;

  public selection: SelectionModel<Grupe> = new SelectionModel<Grupe>(false, []);

  public searchParam: string = '';
  public loading: boolean = true;
  public sorting: Sorting = {
    active: 'NAZIV_RADNIKA',
    direction: 'ASC'
  };
  public isPaginatorShown: boolean = true;

  public pageIndex: number = 0;
  public pageSize = 10;
  public pageSizeOptions: number[] = [5, 10, 15, 20, 50, 100, 200];
  public length = 0;

  selected = new FormControl(0);

  constructor(
    @Inject(MAT_DIALOG_DATA) public receivedSheme: any,
    public http: HttpClient,
    public globalVar: GlobalVariablesService,
    public globalFn: GlobalFunctionsService,
    public session: SessionService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EventGrupniUnosComponent>
  ) {
    console.log(receivedSheme);
  }

  public ngOnInit(): void {

    this.getZaposleniGrupe();
    this.setVisibleColumnsFromEvent();

    this.Grupe = {
      UKUPANBROJSLOGOVA: 0,
      RN: 0,
      ID_GRUPE: this.receivedSheme.ID_GRUPE,
      NAZ_GRUPE: this.receivedSheme.NAZ_GRUPE,
      SIF_SHEME: this.receivedSheme.SIF_SHEME,
      SIF_OJ: this.receivedSheme.SIF_OJ,
      NAZ_OJ: this.receivedSheme.NAZ_OJ,
      NAZ_SHEME: this.receivedSheme.NAZ_SHEME,
      OD: this.receivedSheme.OD,
      DO: this.receivedSheme.DO,
      PAUZA_DO: this.receivedSheme.PAUZA_DO,
      PAUZA_OD: this.receivedSheme.PAUZA_OD

    }
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
          pIdGrupe: this.receivedSheme.ID_GRUPE,
          pDioNaziva: this.searchParam,
          limit: this.pageSize,
          page: (this.pageIndex + 1),
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.zaposleniPoGrupiIShemi = response.debugData.data;
      this.dataSource = this.zaposleniPoGrupiIShemi;
      this.length = +response.debugData.data[0]?.UKUPANBROJSLOGOVA ? +response.debugData.data[0]?.UKUPANBROJSLOGOVA : 0;
      this.loading = false;
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
    this.getZaposleniGrupe();
  }

  public sort(event: any): void {
    this.sorting = {
      active: event.active,
      direction: event.direction.toUpperCase()
    }
    setTimeout(() => this.refresh(), 1000);
  }


  public setVisibleColumnsFromEvent(): void {

    this.displayedColumns = [];
    for (let i = 0; i < this.globalVar.ZaposleniPoGrupiIShemiDisplayedColumns.length; i++) {
      this.displayedColumns.push(this.globalVar.ZaposleniPoGrupiIShemiDisplayedColumns[i].name);
    }

  }

  public openZaposleniciDialog(): void {
    const dialogRef = this.dialog.open(RadniciGrupeComponent, {
      data: this.receivedSheme
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (this.globalVar.isEventEdited) {
        this.refresh();
      }
    });
  }

  public validateForm(Grupe: Grupe): boolean {
    if (Grupe.ID_GRUPE != '' && Grupe.NAZ_GRUPE != '') {
      return false;
    } else {
      return true;
    }
  }

  public save(): void {
    this.globalVar.isEventEdited = true;
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'updateGrupe',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pAkcija: CRUDAction.Update,
          pSifVlas: this.session.loggedInUser.ownerID,
          pIdGrupe: this.Grupe.ID_GRUPE,
          pNazGrupe: this.Grupe.NAZ_GRUPE,
          pSifSheme: this.Grupe.SIF_SHEME,
          pSifOj: this.Grupe.SIF_OJ
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
    });

    this.dialogRef.close();

  }




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
          limit: 10,
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
          pDioNaziva: this.Grupe.SIF_SHEME,
          limit: 10,
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
        if (item.SIF_SHEME.toUpperCase() == this.Grupe.SIF_SHEME.toUpperCase()) {
          this.Grupe.NAZ_SHEME = item.OPIS;
          this.Grupe.SIF_SHEME = item.SIF_SHEME;

        }
      }
    });
  }

  public filterSheme(text: string): void {
    if (!text) {
      this.refreshSheme("", false);
      return;
    }

    this.offeredSheme = this.filteredSheme.filter(
      item => item?.SIF_SHEME.toLowerCase().includes(text.toLowerCase())
    );

    if (this.offeredSheme.length == 0) {
      this.refreshSheme(text, false);
    }
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

  //EvidencijaRadVreOj START
  public pickEvidencijaRadVreOj(): void {
    const dialogRef = this.dialog.open(PickEvidencijaHelpOjComponent, {});

    dialogRef.afterClosed().subscribe((EvidencijaRadVreOj?: EvidencijaRadVreOj) => {
      this.setEvidencijaRadVreOjFromDialog(EvidencijaRadVreOj);
    });
  }

  public setEvidencijaRadVreOjFromDialog(EvidencijaRadVreOj?: EvidencijaRadVreOj): void {
    if (EvidencijaRadVreOj) {
      this.Grupe.SIF_OJ = EvidencijaRadVreOj.SIF_OJ;
      this.Grupe.NAZ_OJ = EvidencijaRadVreOj.NAZMJTR;

    }
  }

  public removeEvidencijaRadVreOj(e: Event): void {
    e.preventDefault();
    this.Grupe.SIF_OJ = "";
    this.Grupe.NAZ_OJ = "";

  }

  public refreshEvidencijaRadVreOj(searchParam: string, isSelected: boolean): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaSviRadniciHelpOj',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pIdKorisnika: this.session.loggedInUser.ID,
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
      this.offeredEvidencijaRadVreOj = response.debugData.data;
      this.filteredEvidencijaRadVreOj = response.debugData.data;
      var dummyEl = document.getElementById('offeredEvidencijaRadVreOj-help-span');
      var isFocused = (document.activeElement === dummyEl);
      if (!isSelected && isFocused) {
        document.getElementById("offeredEvidencijaRadVreOj-dropdown")?.classList.add("select-dropdown-content-visible");
      }
    });
  }

  public OfferedEvidencijaRadVreOj(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaSviRadniciHelpOj',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pIdKorisnika: this.session.loggedInUser.ID,
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

      this.offeredEvidencijaRadVreOj = response.debugData.data;
      for (let item of this.offeredEvidencijaRadVreOj) {
        if (item.SIF_OJ.toUpperCase() == this.Grupe.SIF_OJ.toUpperCase()) {
          this.Grupe.NAZ_OJ = item.NAZMJTR;
          this.Grupe.SIF_OJ = item.SIF_OJ;
        }
      }
    });
  }

  public filterEvidencijaRadVreOj(text: string): void {
    if (!text) {
      this.refreshEvidencijaRadVreOj("", false);
      return;
    }

    this.offeredEvidencijaRadVreOj = this.filteredEvidencijaRadVreOj.filter(
      item => item?.SIF_OJ.toLowerCase().includes(text.toLowerCase())
    );

    if (this.offeredEvidencijaRadVreOj.length == 0) {
      this.refreshEvidencijaRadVreOj(text, false);
    }
  }

  public selectEvidencijaRadVreOj(EvidencijaRadVreOj: EvidencijaRadVreOj): void {
    this.Grupe.SIF_OJ = EvidencijaRadVreOj.SIF_OJ;
    this.Grupe.NAZ_OJ = EvidencijaRadVreOj.NAZMJTR;

    document.getElementById("offeredEvidencijaRadVreOj-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.EvidencijaRadVreOjDropdownIndex = -1;
  }

  public resetEvidencijaRadVreOjIndex(): void {
    this.EvidencijaRadVreOjDropdownIndex = -1;
    document.getElementById("offeredEvidencijaRadVreOj-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //EvidencijaRadVreOj END
}
