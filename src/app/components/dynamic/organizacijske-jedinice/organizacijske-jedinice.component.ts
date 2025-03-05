import { Component } from '@angular/core';
import { OrganizacijskeJedinice, Sorting } from 'src/app/models/models.service';
import { DetailsOrganizacijskeJediniceComponent } from './details-organizacijske-jedinice/details-organizacijske-jedinice.component';
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
import { OrganizacijskeJedinicePdfComponent } from './organizacijske-jedinice-pdf/organizacijske-jedinice-pdf.component';
import { ExcelOrganizacijskeJediniceComponent } from './excel-organizacijske-jedinice/excel-organizacijske-jedinice.component';

@Component({
    selector: 'app-organizacijske-jedinice',
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
    templateUrl: './organizacijske-jedinice.component.html',
    styleUrl: './organizacijske-jedinice.component.scss'
})
export class OrganizacijskeJediniceComponent {
  public displayedColumns: string[] = ['SIF_OJ', 'NAZ_OJ', 'options'];

  public organizacijskeJedinice: OrganizacijskeJedinice[] = [];
  public OrganizacijskeJedinice: OrganizacijskeJedinice = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIFVLAS: "",
    SIF_OJ: "",
    NAZ_OJ: "",
    REG_BR: "",
    BOD_PC: "",
    KOEF_PC: "",
    VR_BOD: "",
    VR_KOEF: "",
    PROS_SAT: "",
    PROS_KOEF: "",
    PROS_BOD: "",
    IND1: "",
    SIF_NAD: "",
    BRO_HZZO: "",
    RSOPC: "",
    IDK: "",
    SYSD: "",
  };


  public dataSource = this.organizacijskeJedinice;
  public searchParam: string = '';
  public loading: boolean = true;
  public sorting: Sorting = {
    active: 'SIF_OJ',
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
    this.getOJ();
  }

  public getOJ(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getOJ',
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
      this.organizacijskeJedinice = response.debugData.data;
      this.dataSource = this.organizacijskeJedinice;
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



  public openDetailsDialog(item: any): void {
    const dialogRef = this.dialog.open(DetailsOrganizacijskeJediniceComponent, {
      data: item,


    });
    dialogRef.afterClosed().subscribe((result) => { });
  }


  public refresh(): void {
    this.loading = true;
    this.getOJ();
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
    for (let i = 0; i < this.globalVar.OrganizacijskeJediniceDisplayedColumns.length; i++) {
      this.displayedColumns.push(this.globalVar.OrganizacijskeJediniceDisplayedColumns[i].name);
    }
    this.displayedColumns.push('options');
  }

  public openPDFDialog(item: any): void {
    const dialogRef = this.dialog.open(OrganizacijskeJedinicePdfComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }
    public openEXCELDialog(item: any): void {
      const dialogRef = this.dialog.open(ExcelOrganizacijskeJediniceComponent, {
        data: item
      });
      dialogRef.afterClosed().subscribe((result) => {
      });
    }
}
