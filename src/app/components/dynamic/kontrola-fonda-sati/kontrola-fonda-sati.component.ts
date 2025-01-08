import { Component, OnInit } from '@angular/core';
import { DetailsKontrolaFondaSatiComponent } from './details-kontrola-fonda-sati/details-kontrola-fonda-sati.component';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { PickKontrolaFondaOjComponent } from '../../pickers/pick-kontrola-fonda-oj/pick-kontrola-fonda-oj.component';
import { FondSati, FondSatiHelpOJ, Sorting } from 'src/app/models/models.service';
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
import { MatRadioModule } from '@angular/material/radio';
import { PdfKontrolaFondaSatiComponent } from './pdf-kontrola-fonda-sati/pdf-kontrola-fonda-sati.component';
import { ExcelKontrolaFondaSatiComponent } from './excel-kontrola-fonda-sati/excel-kontrola-fonda-sati.component';

@Component({
  selector: 'app-kontrola-fonda-sati',
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
    MatRadioModule,

    FormsModule,
    CommonModule,
    TranslationPipe,
    PaginationComponent
  ],
  templateUrl: './kontrola-fonda-sati.component.html',
  styleUrl: './kontrola-fonda-sati.component.scss'
})
export class KontrolaFondaSatiComponent implements OnInit {
  public displayedColumns: string[] = ['MBR', 'OSOBA', 'NAZ_OJ', 'SATI', 'DATUM', 'options'];

  public filter: any = {
    MBR: "",
    PREZIME_IME: "",
    NAZ_ZAN: "",
    NAZ_RM: "",
    SIF_OJ: "%",
    NAZ_OJ: "",
    DanMjesec: "M",
    SATI: "182",
    DATUM: "",
  }



  public fondSati: FondSati[] = [];
  public FondSati: FondSati = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    MBR: "",
    SATI: "",
    DATUM: "",
    OSOBA: "",
    NAZ_OJ: "",
  };

  public pripremaGotova: boolean = false;

  public FondSatiHelpOJDropdownIndex: number = -1;
  public offeredFondSatiHelpOJ: FondSatiHelpOJ[] = [];
  public selectedFondSatiHelpOJ: FondSatiHelpOJ = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIF_OJ: "",
    NAZ_OJ: "",
    VRSTA: "",
  };

  public dataSource = this.fondSati;
  public searchParam: string = '';
  public loading: boolean = false;
  public sorting: Sorting = {
    active: 'MBR',
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
    this.filter.DATUM = new Date().toISOString().slice(0, 10);
  }

  public getFondSati(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getKontrolaFondaSati',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDanMjesec: this.filter.DanMjesec,
          pDatum: this.globalFn.formatDate(this.filter.DATUM),
          pSifOj: this.filter.SIF_OJ,
          pZaSati: this.filter.SATI,
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
      this.fondSati = response.debugData.data;
      this.dataSource = this.fondSati;
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

  /*
  public openCreateDialog(): void {

    const dialogRef = this.dialog.open(CreateEvidencijaRadnogVremenaZaglavljeComponent, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => this.refresh(), 1000);
    });
  }

  public openEditDialog(item: any): void {
    const dialogRef = this.dialog.open(EditEvidencijaRadnogVremenaZaglavljeComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => this.refresh(), 1000);
    });
  }

  public openDeleteDialog(item: any): void {
    const dialogRef = this.dialog.open(DeleteEvidencijaRadnogVremenaZaglavljeComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => this.refresh(), 1000);
    });
  }
*/
  public openDetailsDialog(item: any): void {
    const dialogRef = this.dialog.open(DetailsKontrolaFondaSatiComponent, {
      data: item,


    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  public openPDFDialog(item: any): void {
    const dialogRef = this.dialog.open(PdfKontrolaFondaSatiComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  public openEXCELDialog(item: any): void {
    const dialogRef = this.dialog.open(ExcelKontrolaFondaSatiComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  public refresh(): void {
    this.loading = true;
    this.getFondSati();
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
    for (let i = 0; i < this.globalVar.FondSatiDisplayedColumns.length; i++) {
      this.displayedColumns.push(this.globalVar.FondSatiDisplayedColumns[i].name);
    }
    this.displayedColumns.push('options');
  }

  //FondSatiHelpOJ START
  public pickFondSatiHelpOJ(): void {
    const dialogRef = this.dialog.open(PickKontrolaFondaOjComponent, {});

    dialogRef.afterClosed().subscribe((FondSatiHelpOJ?: FondSatiHelpOJ) => {
      this.setFondSatiHelpOJFromDialog(FondSatiHelpOJ);
    });
  }

  public setFondSatiHelpOJFromDialog(FondSatiHelpOJ?: FondSatiHelpOJ): void {
    if (FondSatiHelpOJ) {
      this.filter.SIF_OJ = FondSatiHelpOJ.SIF_OJ;
      this.filter.NAZ_OJ = FondSatiHelpOJ.NAZ_OJ;
      this.filter.VRSTA = FondSatiHelpOJ.VRSTA;
    }
  }

  public removeFondSatiHelpOJ(e: Event): void {
    e.preventDefault();
    this.filter.SIF_OJ = "";
    this.filter.NAZ_OJ = "";
    this.filter.VRSTA = "";
  }

  public refreshFondSatiHelpOJ(searchParam: string, isSelected: boolean): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getKontrolaFondaSatiHelpOj',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pIdKorisnika: this.session.loggedInUser.ID,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "SIF_OJ",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      console.log(response);
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredFondSatiHelpOJ = response.debugData.data;
      if (!isSelected) {
        document.getElementById("offeredFondSatiHelpOJ-dropdown")?.classList.add("select-dropdown-content-visible");
      }
    });
  }

  public OfferedFondSatiHelpOJ(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getKontrolaFondaSatiHelpOj',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pIdKorisnika: this.session.loggedInUser.ID,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "SIF_OJ",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {

      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredFondSatiHelpOJ = response.debugData.data;
      for (let item of this.offeredFondSatiHelpOJ) {
        if (item.SIF_OJ == this.filter.SIF_OJ) {
          this.filter.NAZ_OJ = item.NAZ_OJ;
          this.filter.VRSTA = item.VRSTA;
        }
      }
    });
  }

  public selectFondSatiHelpOJ(FondSatiHelpOJ: FondSatiHelpOJ): void {
    this.filter.SIF_OJ = FondSatiHelpOJ.SIF_OJ;
    this.filter.NAZ_OJ = FondSatiHelpOJ.NAZ_OJ;
    this.filter.VRSTA = FondSatiHelpOJ.VRSTA;
    document.getElementById("offeredFondSatiHelpOJ-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.FondSatiHelpOJDropdownIndex = -1;
  }

  public resetFondSatiHelpOJIndex(): void {
    this.FondSatiHelpOJDropdownIndex = -1;
    document.getElementById("offeredFondSatiHelpOJ-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //FondSatiHelpOJ END

}
