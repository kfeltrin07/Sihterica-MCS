import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Operateri, Sorting } from 'src/app/models/models.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { DetailsPregledOperateraComponent } from './details-pregled-operatera/details-pregled-operatera.component';
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
import { PdfPregledOperateraComponent } from './pdf-pregled-operatera/pdf-pregled-operatera.component';
import { ExcelPregledOperateraComponent } from './excel-pregled-operatera/excel-pregled-operatera.component';

@Component({
  selector: 'app-pregled-operatera',
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
  templateUrl: './pregled-operatera.component.html',
  styleUrl: './pregled-operatera.component.scss'
})
export class PregledOperateraComponent implements OnInit {
  public displayedColumns: string[] = ['ID', 'NAZIV', 'USERNAME', 'NAPOMENA', 'IDULOGE', 'ULOGA', 'options'];

  public operateri: Operateri[] = [];
  public Operateri: Operateri = {
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


  public dataSource = this.operateri;
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
    this.getPregledOperatera();
  }

  public getPregledOperatera(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getPregledOperatera',
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
      this.operateri = response.debugData.data;
      this.dataSource = this.operateri;
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



  public openDetailsDialog(item: any): void {
    const dialogRef = this.dialog.open(DetailsPregledOperateraComponent, {
      data: item,


    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  public openPDFDialog(item: any): void {
    const dialogRef = this.dialog.open(PdfPregledOperateraComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  public openEXCELDialog(item: any): void {
    const dialogRef = this.dialog.open(ExcelPregledOperateraComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  public refresh(): void {
    this.loading = true;
    this.getPregledOperatera();
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
    for (let i = 0; i < this.globalVar.OperateriDisplayedColumns.length; i++) {
      this.displayedColumns.push(this.globalVar.OperateriDisplayedColumns[i].name);
    }
    this.displayedColumns.push('options');
  }
}
