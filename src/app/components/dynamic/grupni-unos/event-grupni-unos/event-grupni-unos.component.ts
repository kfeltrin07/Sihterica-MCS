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
  public displayedColumns: string[] = ['ID_RADNIKA', 'NAZIV_RADNIKA','SIF_OJ', 'NAZ_OJ', 'OD', 'DO', 'SATI'];

  public grupe: Grupe[] = [];
  public Grupe: Grupe = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    ID_GRUPE: "",
    NAZ_GRUPE: "",
    SIF_SHEME: "",
    SIF_OJ: "",
    NAZ_OJ: "",
    NAZ_SHEME: ""
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
  public pageSizeOptions: number[] = [5, 10, 15, 20];
  public length = 0;

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
    const Od= new Date(this.receivedSheme.start);
    const Do= new Date(this.receivedSheme.end)
    this.varNames.OD = this.globalFn.formatDateForDateTimeForm(Od);
    console.log(this.varNames.OD);
    this.varNames.DO = this.globalFn.formatDateForDateTimeForm(Do);

    this.getZaposleniGrupe();
    this.setVisibleColumnsFromEvent();
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
          pIdGrupe: this.receivedSheme.meta.ID_GRUPE,
          pDioNaziva: this.searchParam,
          limit: this.pageSize,
          page: (this.pageIndex + 1),
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.zaposleniPoGrupiIShemi = response.debugData.data;
      this.dataSource = this.zaposleniPoGrupiIShemi;
      this.length = +response.debugData.data[0]?.UKUPANBROJSLOGOVA?+response.debugData.data[0]?.UKUPANBROJSLOGOVA:0;
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
      data: this.receivedSheme.meta
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
    });
  }

  public save(): void {
    this.receivedSheme.start = new Date(this.varNames.OD);
    this.receivedSheme.end = new Date(this.varNames.DO);
    this.dialogRef.close(this.receivedSheme);
  }
}
