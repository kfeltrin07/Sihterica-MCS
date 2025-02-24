import { Component, OnInit } from '@angular/core';
import { EvidencijaRadVreZagVeze, Sorting } from 'src/app/models/models.service';
import { CreateEvidencijaRadnogVremenaZaglavljeVezeComponent } from './create-evidencija-radnog-vremena-zaglavlje-veze/create-evidencija-radnog-vremena-zaglavlje-veze.component';
import { EditEvidencijaRadnogVremenaZaglavljeVezeComponent } from './edit-evidencija-radnog-vremena-zaglavlje-veze/edit-evidencija-radnog-vremena-zaglavlje-veze.component';
import { DeleteEvidencijaRadnogVremenaZaglavljeVezeComponent } from './delete-evidencija-radnog-vremena-zaglavlje-veze/delete-evidencija-radnog-vremena-zaglavlje-veze.component';
import { DetailsEvidencijaRadnogVremenaZaglavljeVezeComponent } from './details-evidencija-radnog-vremena-zaglavlje-veze/details-evidencija-radnog-vremena-zaglavlje-veze.component';
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
import { PdfEvidencijaRadnogVremenaZaglavljeVezeComponent } from './pdf-evidencija-radnog-vremena-zaglavlje-veze/pdf-evidencija-radnog-vremena-zaglavlje-veze.component';
import { ExcelEvidencijaRadnogVremenaZaglavljeVezeComponent } from './excel-evidencija-radnog-vremena-zaglavlje-veze/excel-evidencija-radnog-vremena-zaglavlje-veze.component';

@Component({
  selector: 'app-evidencija-radnog-vremena-zaglavlje-veze',
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
  templateUrl: './evidencija-radnog-vremena-zaglavlje-veze.component.html',
  styleUrl: './evidencija-radnog-vremena-zaglavlje-veze.component.scss'
})
export class EvidencijaRadnogVremenaZaglavljeVezeComponent implements OnInit {
  public displayedColumns: string[] = ['KNAZIV', 'OPIS', 'SIF_STUPCA', 'XFAKTOR', 'NAZ_VP', 'options'];

  public evidencijaRadVreZagVeze: EvidencijaRadVreZagVeze[] = [];
  public EvidencijaRadVreZagVeze: EvidencijaRadVreZagVeze = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    RID: "",
    SIF_STUPCA: "",
    SIF_VP: "",
    KNAZIV: "",
    OPIS: "",
    NAZ_VP: "",
    SI: "",
    XFAKTOR: "",
    SIF_VLAS: "",
  };


  public dataSource = this.evidencijaRadVreZagVeze;
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
    this.getEvRadnogVremenaZagVeze();
  }

  public getEvRadnogVremenaZagVeze(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaZagVeze',
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
      this.evidencijaRadVreZagVeze = response.debugData.data;
      this.dataSource = this.evidencijaRadVreZagVeze;
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

    const dialogRef = this.dialog.open(CreateEvidencijaRadnogVremenaZaglavljeVezeComponent, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result) setTimeout(() => this.refresh(), 1000);
    });
  }

  public openEditDialog(item: any): void {
    const dialogRef = this.dialog.open(EditEvidencijaRadnogVremenaZaglavljeVezeComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result) setTimeout(() => this.refresh(), 1000);
    });
  }

  public openDeleteDialog(item: any): void {
    const dialogRef = this.dialog.open(DeleteEvidencijaRadnogVremenaZaglavljeVezeComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result) setTimeout(() => this.refresh(), 1000);
    });
  }

  public openDetailsDialog(item: any): void {
    const dialogRef = this.dialog.open(DetailsEvidencijaRadnogVremenaZaglavljeVezeComponent, {
      data: item,


    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  public openPDFDialog(item: any): void {
    const dialogRef = this.dialog.open(PdfEvidencijaRadnogVremenaZaglavljeVezeComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  public openEXCELDialog(item: any): void {
    const dialogRef = this.dialog.open(ExcelEvidencijaRadnogVremenaZaglavljeVezeComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  public refresh(): void {
    this.loading = true;
    this.getEvRadnogVremenaZagVeze();
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
    for (let i = 0; i < this.globalVar.EvidencijaRadVreZagVezeDisplayedColumns.length; i++) {
      this.displayedColumns.push(this.globalVar.EvidencijaRadVreZagVezeDisplayedColumns[i].name);
    }
    this.displayedColumns.push('options');
  }

}
