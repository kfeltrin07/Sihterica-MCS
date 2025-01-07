import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { EvidencijaRadVreRad, Sorting, Zaposleni } from 'src/app/models/models.service';
import { DetailsEvidencijaRadnogVremenaRadnikaComponent } from './details-evidencija-radnog-vremena-radnika/details-evidencija-radnog-vremena-radnika.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { PickZaposleniComponent } from '../../pickers/pick-zaposleni/pick-zaposleni.component';

@Component({
  selector: 'app-evidencija-radnog-vremena-radnika',
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
  templateUrl: './evidencija-radnog-vremena-radnika.component.html',
  styleUrl: './evidencija-radnog-vremena-radnika.component.scss'
})
export class EvidencijaRadnogVremenaRadnikaComponent implements OnInit {
  public displayedColumns: string[] = ['SIFRANAZIV', 'SIF_MT', 'NAZIV_MT', 'REDAK', 'VRSTA', 'POCETAK', 'ZAVRSETAK', 'SATI_1', 'SATI_2', 'options'];

  public filter: any = {
    MBR: "",
    PREZIME_IME: "",
    NAZ_ZAN: "",
    NAZ_RM: "",
    SIF_OJ: "",
    NAZ_OJ: "",
  }



  public evidencijaRadVreRad: EvidencijaRadVreRad[] = [];
  public EvidencijaRadVreRad: EvidencijaRadVreRad = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIFRANAZIV: "",
    SIF_MT: "",
    NAZIV_MT: "",
    REDAK: "",
    VRSTA: "",
    POCETAK: "",
    ZAVRSETAK: "",
    SATI_1: "",
    SATI_2: "",
    SATI_3: "",
    SATI_4: "",
    SATI_5: "",
    SATI_6: "",
    SATI_7: "",
    SATI_8: "",
    SATI_9: "",
    SATI_10: "",
    SATI_11: "",
    SATI_12: "",
    SATI_13: "",
    SATI_14: "",
    SATI_15: "",
    SATI_16: "",
    SATI_17: "",
    SATI_18: "",
    SATI_19: "",
    SATI_20: "",
    SATI_21: "",
    SATI_22: "",
    SATI_23: "",
    SATI_24: "",
    SATI_25: "",
    SATI_26: "",
    SATI_27: "",
    SATI_28: "",
    SATI_29: "",
  };

    public ZaposleniDropdownIndex: number = -1;
    public offeredZaposleni: Zaposleni[] = [];
    public selectedZaposleni: Zaposleni = {
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

  public dataSource = this.evidencijaRadVreRad;
  public searchParam: string = '';
  public loading: boolean = false;
  public sorting: Sorting = {
    active: 'SIFRANAZIV',
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
    this.filter.GODINA=(new Date()).getFullYear();
    this.filter.MJESEC=new Date().getMonth()+1;

  }

  public getPripremaEvRadnogVremena(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'pripremaGetEvRadnogVremena',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pIdKorisnika: this.session.loggedInUser.ID,
          pSifVlas: this.session.loggedInUser.ownerID,
          pSifRad: this.filter.MBR,
          pZaMjesec: this.filter.MJESEC+'.'+this.filter.GODINA,
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
      this.getEvRadnogVremena();
    });
  }

  public getEvRadnogVremena(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremena',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pIdKorisnika: this.session.loggedInUser.ID,
          pMbr: this.filter.MBR,
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
      this.evidencijaRadVreRad = response.debugData.data;
      this.dataSource = this.evidencijaRadVreRad;
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
    const dialogRef = this.dialog.open(DetailsEvidencijaRadnogVremenaRadnikaComponent, {
      data: item,


    });
    dialogRef.afterClosed().subscribe((result) => { });
  }


  public refresh(): void {
    this.loading = true;
    this.getPripremaEvRadnogVremena();
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
    for (let i = 0; i < this.globalVar.EvidencijaRadVreRadDisplayedColumns.length; i++) {
      this.displayedColumns.push(this.globalVar.EvidencijaRadVreRadDisplayedColumns[i].name);
    }
    this.displayedColumns.push('options');
  }

  /*
  public openPDFDialog(item: any): void {
    const dialogRef = this.dialog.open(OrganizacijskeJedinicePdfComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => this.refresh(), 1000);
    });
  }*/


  //ZAPOSLENI START
  public pickZaposleni(): void {
    const dialogRef = this.dialog.open(PickZaposleniComponent, {});

    dialogRef.afterClosed().subscribe((Zaposleni?: Zaposleni) => {
      this.setZaposleniFromDialog(Zaposleni);
    });
  }

  public setZaposleniFromDialog(Zaposleni?: Zaposleni): void {
    if (Zaposleni) {
      this.filter.MBR = Zaposleni.MBR;
      this.filter.PREZIME_IME = Zaposleni.PREZIME_IME;
      this.filter.NAZ_OJ=Zaposleni.NAZ_OJ;
      this.filter.SIF_OJ=Zaposleni.SIF_OJ;
      this.filter.NAZ_RM=Zaposleni.NAZ_RM;
      this.filter.NAZ_ZAN=Zaposleni.NAZ_ZAN;
      this.filter.OSOBA=Zaposleni
    }
  }

  public removeZaposleni(e: Event): void {
    e.preventDefault();
    this.filter.MBR = "";
    this.filter.PREZIME_IME = "";

  }

  public refreshZaposleni(searchParam: string, isSelected: boolean): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaHelpRadnici',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pMbr: searchParam,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "MBR",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      console.log(response);
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredZaposleni = response.debugData.data;
      if (!isSelected) {
        document.getElementById("offeredZaposleni-dropdown")?.classList.add("select-dropdown-content-visible");
      }
    });
  }

  public OfferedZaposleni(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaHelpRadnici',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pMbr: this.filter.MBR,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "MBR",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {

      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredZaposleni = response.debugData.data;
      for (let item of this.offeredZaposleni) {
        if (item.MBR == this.filter.MBR) {
          this.filter.PREZIME_IME = item.PREZIME_IME;
          this.filter.NAZ_OJ=item.NAZ_OJ;
          this.filter.SIF_OJ=item.SIF_OJ;
          this.filter.NAZ_RM=item.NAZ_RM;
          this.filter.NAZ_ZAN=item.NAZ_ZAN;
        }
      }
    });
  }

  public selectZaposleni(Zaposleni: Zaposleni): void {
    this.filter.MBR = Zaposleni.MBR;
    this.filter.PREZIME_IME = Zaposleni.PREZIME_IME;
    this.filter.NAZ_OJ=Zaposleni.NAZ_OJ;
    this.filter.SIF_OJ=Zaposleni.SIF_OJ;
    this.filter.NAZ_RM=Zaposleni.NAZ_RM;
    this.filter.NAZ_ZAN=Zaposleni.NAZ_ZAN;
    document.getElementById("offeredZaposleni-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.ZaposleniDropdownIndex = -1;
  }

  public resetZaposleniIndex(): void {
    this.ZaposleniDropdownIndex = -1;
    document.getElementById("offeredZaposleni-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //ZAPOSLENI END



}
