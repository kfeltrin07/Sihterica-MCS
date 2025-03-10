import { Component, OnInit } from '@angular/core';
import { Sheme, Sorting } from 'src/app/models/models.service';
import { DetailsShemeComponent } from './details-sheme/details-sheme.component';
import { PdfShemeComponent } from './pdf-sheme/pdf-sheme.component';
import { ExcelShemeComponent } from './excel-sheme/excel-sheme.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
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
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { PaginationComponent } from '../../elements/pagination/pagination.component';
import { CreateShemeComponent } from './create-sheme/create-sheme.component';
import { EditShemeComponent } from './edit-sheme/edit-sheme.component';
import { DeleteShemeComponent } from './delete-sheme/delete-sheme.component';

@Component({
    selector: 'app-sheme',
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
    templateUrl: './sheme.component.html',
    styleUrl: './sheme.component.scss'
})
export class ShemeComponent implements OnInit {
  public displayedColumns: string[] = ['SIF_SHEME', 'OPIS', 'OD', 'DO', 'PAUZA_OD', 'PAUZA_DO', 'options'];

  public sheme: Sheme[] = [];
  public Sheme: Sheme = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIF_SHEME: "",
    OPIS: "",
    OD: "",
    DO: "",
    PAUZA_OD: "",
    PAUZA_DO: "",
  };


  public dataSource = this.sheme;
  public searchParam: string = '';
  public loading: boolean = true;
  public sorting: Sorting = {
    active: 'SIF_SHEME',
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
    this.setVisibleColumnsFromEvent();
    this.getSheme();
  }

  public getSheme(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getSheme',
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
      this.sheme = response.debugData.data;
      this.dataSource = this.sheme;
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
  
      const dialogRef = this.dialog.open(CreateShemeComponent, {
      });
      dialogRef.afterClosed().subscribe((result) => {
        if(result)setTimeout(() => this.refresh(), 1000);
      });
    }
  
    public openEditDialog(item: any): void {
      const dialogRef = this.dialog.open(EditShemeComponent, {
        data: item
      });
      dialogRef.afterClosed().subscribe((result) => {
        if(result)setTimeout(() => this.refresh(), 1000);
      });
    }
  
    public openDeleteDialog(item: any): void {
      const dialogRef = this.dialog.open(DeleteShemeComponent, {
        data: item
      });
      dialogRef.afterClosed().subscribe((result) => {
        if(result)setTimeout(() => this.refresh(), 1000);
      });
    }

  public openDetailsDialog(item: any): void {
    const dialogRef = this.dialog.open(DetailsShemeComponent, {
      data: item,


    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  public openPDFDialog(item: any): void {
    const dialogRef = this.dialog.open(PdfShemeComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  public openEXCELDialog(item: any): void {
    const dialogRef = this.dialog.open(ExcelShemeComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  public refresh(): void {
    this.loading = true;
    this.getSheme();
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
    for (let i = 0; i < this.globalVar.ShemeDisplayedColumns.length; i++) {
      this.displayedColumns.push(this.globalVar.ShemeDisplayedColumns[i].name);
    }
    this.displayedColumns.push('options');
  }
}
