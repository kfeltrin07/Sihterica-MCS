import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaginationComponent } from 'src/app/components/elements/pagination/pagination.component';
import { Grupe, Sorting, ZaposleniPoGrupiIShemi } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { MatTabsModule } from '@angular/material/tabs';
import { SelectionModel } from '@angular/cdk/collections';
import { RadniciGrupeComponent } from '../../grupe/radnici-grupe/radnici-grupe.component';

@Component({
  selector: 'app-event-grupni-unos',
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
    MatTabsModule,

    CdkDrag,
    CdkDragHandle,
    PaginationComponent,
    CommonModule,
    FormsModule,
    TranslationPipe
  ],
  templateUrl: './event-grupni-unos.component.html',
  styleUrl: './event-grupni-unos.component.scss'
})
export class EventGrupniUnosComponent implements OnInit {
  public displayedColumns1: string[] = ['ID_GRUPE', 'NAZ_GRUPE'];
  public displayedColumns2: string[] = ['ID_RADNIKA', 'NAZIV_RADNIKA', 'NAZ_RM', 'OD', 'DO', 'SATI'];

  public grupe: Grupe[] = [];
  public Grupe: Grupe = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    ID_GRUPE: "",
    NAZ_GRUPE: "",
    SIF_SHEME: "",
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

  public varNames: any = {
    OD: "",
    DO: ""
  }

  public dataSource1 = this.grupe;
  public dataSource2 = this.zaposleniPoGrupiIShemi;

  public selection: SelectionModel<Grupe> = new SelectionModel<Grupe>(false, []);

  public searchParam: string = '';
  public loading: boolean = true;
  public sorting1: Sorting = {
    active: 'SIF_SHEME',
    direction: 'ASC'
  };
  public sorting2: Sorting = {
    active: 'NAZIV_RADNIKA',
    direction: 'ASC'
  };
  public isPaginatorShown: boolean = true;
  public pageIndex1: number = 0;
  public pageSize1 = 10;
  public pageSizeOptions1: number[] = [5, 10, 15, 20];
  public length1 = 0;
  public pageIndex2: number = 0;
  public pageSize2 = 10;
  public pageSizeOptions2: number[] = [5, 10, 15, 20];
  public length2 = 0;

  selected = new FormControl(0);

  constructor(
    @Inject(MAT_DIALOG_DATA) public receivedSheme: any,
    public http: HttpClient,
    public globalVar: GlobalVariablesService,
    private globalFn: GlobalFunctionsService,
    public session: SessionService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EventGrupniUnosComponent>
  ) {
    console.log(receivedSheme);
  }

  public ngOnInit(): void {
    this.varNames.OD = new Date(this.receivedSheme.start).toISOString().slice(0, 16);
    this.varNames.DO = new Date(this.receivedSheme.end).toISOString().slice(0, 16);


    this.getGrupe();
  }

  public getGrupe(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getGrupe',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: '%' + this.searchParam + '%',
          pSifSheme: this.receivedSheme.meta.SIF_SHEME,
          pIdKorisnika: this.session.loggedInUser.ID,
          limit: this.pageSize1,
          page: (this.pageIndex1 + 1),
          sort: [
            {
              property: this.sorting1.active,
              direction: this.sorting1.direction
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.grupe = response.debugData.data;
      this.dataSource1 = this.grupe;
      this.length1 = +response.debugData.data[0]?.UKUPANBROJSLOGOVA;
      console.log(this.length1);
      if (!this.length1) {
        this.dataSource1.push({
          UKUPANBROJSLOGOVA: 0,
          RN: 0,
          ID_GRUPE: "0",
          NAZ_GRUPE: "NEMA GRUPA NA OVOJ SHEMI",
          SIF_SHEME: "",
        });
      }
      this.loading = false;
    });
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
          pIdGrupe: this.selection.selected[0].ID_GRUPE,
          limit: this.pageSize2,
          page: (this.pageIndex2 + 1),
          sort: [
            {
              property: this.sorting2.active,
              direction: this.sorting2.direction
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.zaposleniPoGrupiIShemi = response.debugData.data;
      this.dataSource2 = this.zaposleniPoGrupiIShemi;
      this.length2 = +response.debugData.data[0].UKUPANBROJSLOGOVA;
      this.loading = false;
    });
  }

  public receiveMessage($event: any): void {
    if ($event.description == 'PageEvent' && this.selected.value == 0) {
      this.pageIndex1 = $event.value.pageIndex;
      this.pageSize1 = $event.value.pageSize;
      this.refresh();
    }
    if ($event.description == 'PageEvent' && this.selected.value == 1) {
      this.pageIndex2 = $event.value.pageIndex;
      this.pageSize2 = $event.value.pageSize;
      this.refresh();
    }
  }


  public refresh(): void {
    this.loading = true;
    if (this.selected.value == 0) {
      this.getGrupe();
    } else {
      this.getZaposleniGrupe();
    }
  }

  public sort(event: any): void {
    if (this.selected.value == 0) {
      this.sorting1 = {
        active: event.active,
        direction: event.direction.toUpperCase()
      }
    } else {
      this.sorting2 = {
        active: event.active,
        direction: event.direction.toUpperCase()
      }
    }
    setTimeout(() => this.refresh(), 1000);
  }


  public setVisibleColumnsFromEvent(): void {
    if (this.selected.value == 0) {
      this.displayedColumns1 = [];
      for (let i = 0; i < this.globalVar.GrupeDisplayedColumns.length; i++) {
        this.displayedColumns1.push(this.globalVar.GrupeDisplayedColumns[i].name);
      }
    } else {
      this.displayedColumns2 = [];
      for (let i = 0; i < this.globalVar.ZaposleniPoGrupiIShemiDisplayedColumns.length; i++) {
        this.displayedColumns2.push(this.globalVar.ZaposleniPoGrupiIShemiDisplayedColumns[i].name);
      }
    }
  }

  public openZaposleniciDialog(): void {
    const dialogRef = this.dialog.open(RadniciGrupeComponent, {
      data: this.selection.selected[0]
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  public save(): void {
    this.receivedSheme.start = new Date(this.varNames.OD);
    this.receivedSheme.end = new Date(this.varNames.DO);
    this.dialogRef.close(this.receivedSheme);
  }
}
