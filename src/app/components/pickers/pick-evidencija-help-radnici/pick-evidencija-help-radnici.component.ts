import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EvRadnogVremenaHelpRadnici, Sorting } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { PaginationComponent } from '../../elements/pagination/pagination.component';

@Component({
    selector: 'app-pick-evidencija-help-radnici',
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
        CdkDrag,
        CdkDragHandle,
        PaginationComponent,
        CommonModule,
        FormsModule,
        TranslationPipe
    ],
    templateUrl: './pick-evidencija-help-radnici.component.html',
    styleUrl: './pick-evidencija-help-radnici.component.scss'
})
export class PickEvidencijaHelpRadniciComponent implements OnInit {
  public displayedColumns: string[] = ['MBR', 'PREZIME_IME','SIF_OJ', 'NAZ_OJ'];
  public evRadnogVremenaHelpRadnici: EvRadnogVremenaHelpRadnici[] = [];
  public EvRadnogVremenaHelpRadnici: EvRadnogVremenaHelpRadnici = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    MBR: "",
    PREZIME_IME: "",
    OSOBA: "",
    SIF_OJ: "",
    NAZ_OJ: ""
  };

  public dataSource = this.evRadnogVremenaHelpRadnici;

  public searchParam: string = '';
  public loading: boolean = true;
  public sorting: Sorting = {
    active: 'MBR',
    direction: 'ASC'
  };
  public isPaginatorShown: boolean = true;
  public pageIndex: number = 0;
  public pageSize = 20;
  public pageSizeOptions: number[] = [5, 10, 15, 20, 50, 100, 200];
  public length = 0;

  constructor(
    public http: HttpClient,
    public globalVar: GlobalVariablesService,
    private globalFn: GlobalFunctionsService,
    public session: SessionService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PickEvidencijaHelpRadniciComponent>
  ) { }

  public ngOnInit(): void {
    this.setVisibleColumnsFromEvent();
    this.getEvRadnogVremenaHelpRadnici();
  }

  public getEvRadnogVremenaHelpRadnici(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaHelpRadnici',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: '%' + this.searchParam + '%',
          limit: this.pageSize,
          page: (this.pageIndex + 1),
          sort: [
            {
              property: this.sorting.active,
              direction: this.sorting.direction
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.evRadnogVremenaHelpRadnici = response.debugData.data;
      this.dataSource = this.evRadnogVremenaHelpRadnici;
      this.length = +response.debugData?.data[0]?.UKUPANBROJSLOGOVA?(+response.debugData.data[0].UKUPANBROJSLOGOVA):0;
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
    this.getEvRadnogVremenaHelpRadnici();
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
    for (let i = 0; i < this.globalVar.EvRadnogVremenaHelpRadniciDisplayedColumns.length; i++) {
      this.displayedColumns.push(this.globalVar.EvRadnogVremenaHelpRadniciDisplayedColumns[i].name);
    }
  }

  public pickEvRadnogVremenaHelpRadnici(row: EvRadnogVremenaHelpRadnici): void {
    this.dialogRef.close(row);
  }
}

