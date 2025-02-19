import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sorting, Zaposleni } from 'src/app/models/models.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { CreateZaposleniComponent } from './create-zaposleni/create-zaposleni.component';
import { DetailsZaposleniComponent } from './details-zaposleni/details-zaposleni.component';
import { EditZaposleniComponent } from './edit-zaposleni/edit-zaposleni.component';
import { DeleteZaposleniComponent } from './delete-zaposleni/delete-zaposleni.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaginationComponent } from '../../elements/pagination/pagination.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatLabel, MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { ZaposleniPdfComponent } from './zaposleni-pdf/zaposleni-pdf.component';
import { ExcelZaposleniComponent } from './excel-zaposleni/excel-zaposleni.component';

@Component({
  selector: 'app-zaposleni',
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
  templateUrl: './zaposleni.component.html',
  styleUrl: './zaposleni.component.scss'
})
export class ZaposleniComponent implements OnInit {
  public displayedColumns: string[] = ['MBR', 'PREZIME_IME', 'NAZ_ZAN', 'SIF_OJ', 'NAZ_OJ', 'options'];

  public zaposleni: Zaposleni[] = [];
  public Zaposleni: Zaposleni = {
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


  public dataSource = this.zaposleni;
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
    public dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.getZaposleni();
  }

  public getZaposleni(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getZaposleni',
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
      this.zaposleni = response.debugData.data;
      this.dataSource = this.zaposleni;
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


  public openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateZaposleniComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => this.refresh(), 1000);
    });
  }

  public openDetailsDialog(item: any): void {
    const dialogRef = this.dialog.open(DetailsZaposleniComponent, {
      data: item,


    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  public openEditDialog(item: any): void {
    const dialogRef = this.dialog.open(EditZaposleniComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => this.refresh(), 1000);
    });
  }

  public openDeleteDialog(item: any): void {
    const dialogRef = this.dialog.open(DeleteZaposleniComponent, {
      data: item.SIFLOKACIJE
    });
    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => this.refresh(), 1000);
    });
  }

  public openPDFDialog(item: any): void {
    const dialogRef = this.dialog.open(ZaposleniPdfComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  public openEXCELDialog(item: any): void {
    const dialogRef = this.dialog.open(ExcelZaposleniComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
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

  public setVisibleColumnsFromEvent(): void {
    this.displayedColumns = [];
    for (let i = 0; i < this.globalVar.ZaposleniDisplayedColumns.length; i++) {
      this.displayedColumns.push(this.globalVar.ZaposleniDisplayedColumns[i].name);
    }
    this.displayedColumns.push('options');
  }
}
