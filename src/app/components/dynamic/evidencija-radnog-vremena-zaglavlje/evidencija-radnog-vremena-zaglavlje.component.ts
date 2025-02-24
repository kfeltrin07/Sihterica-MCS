import { Component, OnInit } from '@angular/core';
import { EvidencijaRadVreZag, Sorting } from 'src/app/models/models.service';
import { DetailsEvidencijaRadnogVremenaZaglavljeComponent } from './details-evidencija-radnog-vremena-zaglavlje/details-evidencija-radnog-vremena-zaglavlje.component';
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
import { DeleteEvidencijaRadnogVremenaZaglavljeComponent } from './delete-evidencija-radnog-vremena-zaglavlje/delete-evidencija-radnog-vremena-zaglavlje.component';
import { EditEvidencijaRadnogVremenaZaglavljeComponent } from './edit-evidencija-radnog-vremena-zaglavlje/edit-evidencija-radnog-vremena-zaglavlje.component';
import { CreateEvidencijaRadnogVremenaZaglavljeComponent } from './create-evidencija-radnog-vremena-zaglavlje/create-evidencija-radnog-vremena-zaglavlje.component';
import { PdfEvidencijaRadnogVremenaZaglavljeComponent } from './pdf-evidencija-radnog-vremena-zaglavlje/pdf-evidencija-radnog-vremena-zaglavlje.component';
import { ExcelEvidencijaRadnogVremenaZaglavljeComponent } from './excel-evidencija-radnog-vremena-zaglavlje/excel-evidencija-radnog-vremena-zaglavlje.component';

@Component({
  selector: 'app-evidencija-radnog-vremena-zaglavlje',
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
  templateUrl: './evidencija-radnog-vremena-zaglavlje.component.html',
  styleUrl: './evidencija-radnog-vremena-zaglavlje.component.scss'
})
export class EvidencijaRadnogVremenaZaglavljeComponent implements OnInit {
  public displayedColumns: string[] = ['KNAZIV', 'OPIS', 'SIF_STUPCA', 'RBROJ', 'options'];

  public evidencijaRadVreZag: EvidencijaRadVreZag[] = [];
  public EvidencijaRadVreZag: EvidencijaRadVreZag = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    RID: "",
    SIF_STUPCA: "",
    RBROJ: "",
    KNAZIV: "",
    OPIS: "",
    VRSTA_SLOGA: "",
    OPISVRSTE: "",
  };


  public dataSource = this.evidencijaRadVreZag;
  public searchParam: string = '';
  public loading: boolean = true;
  public sorting: Sorting = {
    active: 'SIF_STUPCA',
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
    this.getEvRadnogVremenaZag();
  }

  public getEvRadnogVremenaZag(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaZag',
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
      this.evidencijaRadVreZag = response.debugData.data;
      this.dataSource = this.evidencijaRadVreZag;
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

    const dialogRef = this.dialog.open(CreateEvidencijaRadnogVremenaZaglavljeComponent, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result) setTimeout(() => this.refresh(), 1000);
    });
  }

  public openEditDialog(item: any): void {
    const dialogRef = this.dialog.open(EditEvidencijaRadnogVremenaZaglavljeComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result) setTimeout(() => this.refresh(), 1000);
    });
  }

  public openDeleteDialog(item: any): void {
    const dialogRef = this.dialog.open(DeleteEvidencijaRadnogVremenaZaglavljeComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result) setTimeout(() => this.refresh(), 1000);
    });
  }

  public openDetailsDialog(item: any): void {
    const dialogRef = this.dialog.open(DetailsEvidencijaRadnogVremenaZaglavljeComponent, {
      data: item,


    });
    dialogRef.afterClosed().subscribe((result) => { });
  }


  public refresh(): void {
    this.loading = true;
    this.getEvRadnogVremenaZag();
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
    for (let i = 0; i < this.globalVar.EvidencijaRadVreZagDisplayedColumns.length; i++) {
      this.displayedColumns.push(this.globalVar.EvidencijaRadVreZagDisplayedColumns[i].name);
    }
    this.displayedColumns.push('options');
  }

  
  public openPDFDialog(item: any): void {
    const dialogRef = this.dialog.open(PdfEvidencijaRadnogVremenaZaglavljeComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  public openEXCELDialog(item: any): void {
    const dialogRef = this.dialog.open(ExcelEvidencijaRadnogVremenaZaglavljeComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }
}
