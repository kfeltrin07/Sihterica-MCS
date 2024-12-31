import { Component, OnInit } from '@angular/core';
import { OvlastenaOsobaMjTr, Sorting } from 'src/app/models/models.service';
import { DetailsOvlasteneOsobeMjTrComponent } from './details-ovlastene-osobe-mj-tr/details-ovlastene-osobe-mj-tr.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { PaginationComponent } from '../../elements/pagination/pagination.component';
import { CreateOvlasteneOsobeMjTrComponent } from './create-ovlastene-osobe-mj-tr/create-ovlastene-osobe-mj-tr.component';
import { EditOvlasteneOsobeMjTrComponent } from './edit-ovlastene-osobe-mj-tr/edit-ovlastene-osobe-mj-tr.component';
import { DeleteOvlasteneOsobeMjTrComponent } from './delete-ovlastene-osobe-mj-tr/delete-ovlastene-osobe-mj-tr.component';

@Component({
  selector: 'app-ovlastene-osobe-mj-tr',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSortModule,
    MatTableModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatLabel,
    MatToolbarModule,
    MatInputModule,

    FormsModule,
    CommonModule,
    TranslationPipe,
    PaginationComponent
  ],
  templateUrl: './ovlastene-osobe-mj-tr.component.html',
  styleUrl: './ovlastene-osobe-mj-tr.component.scss'
})
export class OvlasteneOsobeMjTrComponent implements OnInit {
public displayedColumns: string[] = ['ID', 'NAZIV','USERNAME','SIFMJTR', 'NAZMJTR','options'];

  public ovlastenaOsobaMjTr: OvlastenaOsobaMjTr[] = [];
  public OvlastenaOsobaMjTr: OvlastenaOsobaMjTr = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    ID: "",
    NAZIV: "",
    USERNAME: "",
    SIFMJTR: "",
    NAZMJTR: "",
    OD:"",
    DO:"",
    SATI:"",
  };


  public dataSource = this.ovlastenaOsobaMjTr;
  public searchParam: string = '';
  public loading: boolean = true;
  public sorting: Sorting = {
    active: 'NAZIV',
    direction: 'ASC'
  };
  public isPaginatorShown: boolean = true;
  public pageIndex: number = 0;
  public pageSize = 20;
  public pageSizeOptions: number[] = [5, 10, 15, 20];
  public length = 0;

  constructor(
    public http: HttpClient,
    public globalVar: GlobalVariablesService,
    private globalFn: GlobalFunctionsService,
    public session: SessionService,
    public dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.getOvlOsobeMjTr();
  }

  public getOvlOsobeMjTr(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getOvlOsobeMjTr',
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
      this.ovlastenaOsobaMjTr = response.debugData.data;
      this.dataSource = this.ovlastenaOsobaMjTr;
      this.length = +response.debugData.data[0].UKUPANBROJSLOGOVA;
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

  public openCreateDialog(): void {

    const dialogRef = this.dialog.open(CreateOvlasteneOsobeMjTrComponent, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => this.refresh(), 1000);
    });
  }

  public openDetailsDialog(item: any): void {
    const dialogRef = this.dialog.open(DetailsOvlasteneOsobeMjTrComponent, {
      data: item,
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  public openEditDialog(item: any): void {
    const dialogRef = this.dialog.open(EditOvlasteneOsobeMjTrComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => this.refresh(), 1000);
    });
  }

  public openDeleteDialog(item: any): void {
    const dialogRef = this.dialog.open(DeleteOvlasteneOsobeMjTrComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => this.refresh(), 1000);
    });
  }

  public refresh(): void {
    this.loading = true;
    this.getOvlOsobeMjTr();
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
    for (let i = 0; i < this.globalVar.OvlastenaOsobaMjTrDisplayedColumns.length; i++) {
      this.displayedColumns.push(this.globalVar.OvlastenaOsobaMjTrDisplayedColumns[i].name);
    }
    this.displayedColumns.push('options');
  }


}
