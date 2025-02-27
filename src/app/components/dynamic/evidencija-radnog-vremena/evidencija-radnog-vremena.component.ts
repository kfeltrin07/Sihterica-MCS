import { Component, OnInit } from '@angular/core';
import { EvidencijaRadVre, EvidencijaRadVreOj, Sorting } from 'src/app/models/models.service';
import { DetailsEvidencijaRadnogVremenaComponent } from './details-evidencija-radnog-vremena/details-evidencija-radnog-vremena.component';
import { PickEvidencijaHelpOjComponent } from '../../pickers/pick-evidencija-help-oj/pick-evidencija-help-oj.component';
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
import { PdfEvidencijaRadnogVremenaComponent } from './pdf-evidencija-radnog-vremena/pdf-evidencija-radnog-vremena.component';

@Component({
  selector: 'app-evidencija-radnog-vremena',
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
  templateUrl: './evidencija-radnog-vremena.component.html',
  styleUrl: './evidencija-radnog-vremena.component.scss'
})
export class EvidencijaRadnogVremenaComponent implements OnInit {
  public displayedColumns: string[] = ['REDAK','NAZIVRAD', 'SIFRANAZIV', 'NAZIV_OJ', 'SIF_MT', 'NAZIV_MT',  'POCETAK', 'ZAVRSETAK', 'SATI_1', 'SATI_2', 'options'];

  public filter: any = {
    MBR: "",
    PREZIME_IME: "",
    NAZ_ZAN: "",
    NAZ_RM: "",
    SIF_OJ: "%",
    NAZ_OJ: "",
  }



  public evidencijaRadVre: EvidencijaRadVre[] = [];
  public EvidencijaRadVre: EvidencijaRadVre = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    NAZIV_OJ: "",
    SIFRANAZIV: "",
    NAZIVRAD: "",
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
    BEMPTYROWAFTER: "",
  };

  public pripremaGotova: boolean = false;

  public EvidencijaRadVreOjDropdownIndex: number = -1;
  public offeredEvidencijaRadVreOj: EvidencijaRadVreOj[] = [];
  public filteredEvidencijaRadVreOj: EvidencijaRadVreOj[] = [];
  public selectedEvidencijaRadVreOj: EvidencijaRadVreOj = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIF_OJ: "",
    NAZMJTR: "",
    VRSTA: "",
  };

  public dataSource = this.evidencijaRadVre;
  public searchParam: string = '';
  public loading: boolean = false;
  public sorting: Sorting = {
    active: 'VRSTA',
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
    public globalFn: GlobalFunctionsService,
    public session: SessionService,
    public dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.setVisibleColumnsFromEvent();
    this.filter.GODINA = (new Date()).getFullYear();
    this.filter.MJESEC = new Date().getMonth() + 1;

  }

  public getPripremaEvRadnogVremena(): void {
      this.http.post(
        this.globalVar.APIHost + this.globalVar.APIFile,
        {
          action: 'Sihterica',
          method: 'pripremaGetEvRadnogVremenaSviRadnici',
          sid: this.session.loggedInUser.sessionID,
          data: {
            pIdKorisnika: this.session.loggedInUser.ID,
            pSifVlas: this.session.loggedInUser.ownerID,
            pSifOj: this.filter.SIF_OJ,
            pZaMjesec: this.filter.MJESEC + '.' + this.filter.GODINA,
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
        method: 'getEvRadnogVremenaSviRadnici',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pIdKorisnika: this.session.loggedInUser.ID,
          pSifOj: this.filter.SIF_OJ,
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
      this.evidencijaRadVre = response.debugData.data;
      this.dataSource = this.evidencijaRadVre;
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

  public openPDFDialog(item: any): void {
    let data = {
      FONDSATI: this.filter.FONDSATI,
      DATUM: this.filter.MJESEC + '.' + this.filter.GODINA,
      SIF_OJ: this.filter.SIF_OJ
    }
    const dialogRef = this.dialog.open(PdfEvidencijaRadnogVremenaComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }


  public openDetailsDialog(item: any): void {
    const dialogRef = this.dialog.open(DetailsEvidencijaRadnogVremenaComponent, {
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
    });
  }*/


  //EvidencijaRadVreOj START
  public pickEvidencijaRadVreOj(): void {
    const dialogRef = this.dialog.open(PickEvidencijaHelpOjComponent, {});

    dialogRef.afterClosed().subscribe((EvidencijaRadVreOj?: EvidencijaRadVreOj) => {
      this.setEvidencijaRadVreOjFromDialog(EvidencijaRadVreOj);
    });
  }

  public setEvidencijaRadVreOjFromDialog(EvidencijaRadVreOj?: EvidencijaRadVreOj): void {
    if (EvidencijaRadVreOj) {
      this.filter.SIF_OJ = EvidencijaRadVreOj.SIF_OJ;
      this.filter.NAZMJTR = EvidencijaRadVreOj.NAZMJTR;
      this.filter.VRSTA = EvidencijaRadVreOj.VRSTA;
      this.pripremaGotova = false;
    }
  }

  public removeEvidencijaRadVreOj(e: Event): void {
    e.preventDefault();
    this.filter.SIF_OJ = "";
    this.filter.NAZMJTR = "";
    this.filter.VRSTA = "";
    this.pripremaGotova = false;
  }

  public refreshEvidencijaRadVreOj(searchParam: string, isSelected: boolean): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaSviRadniciHelpOj',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pIdKorisnika: this.session.loggedInUser.ID,
          limit: 10,
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
      this.offeredEvidencijaRadVreOj = response.debugData.data;
      this.filteredEvidencijaRadVreOj = response.debugData.data;
      var dummyEl = document.getElementById('offeredEvidencijaRadVreOj-help-span');
      var isFocused = (document.activeElement === dummyEl);
      if (!isSelected && isFocused) {
        document.getElementById("offeredEvidencijaRadVreOj-dropdown")?.classList.add("select-dropdown-content-visible");
      }
    });
  }

  public OfferedEvidencijaRadVreOj(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaSviRadniciHelpOj',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pIdKorisnika: this.session.loggedInUser.ID,
          limit: 10,
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
      this.offeredEvidencijaRadVreOj = response.debugData.data;

      const matchedItem = this.offeredEvidencijaRadVreOj.find(item => item.SIF_OJ.toUpperCase() === this.filter.SIF_OJ.toUpperCase());
      if (matchedItem) {
        this.filter.SIF_OJ = matchedItem.SIF_OJ;
        this.filter.NAZMJTR = matchedItem.NAZMJTR;
        this.filter.VRSTA = matchedItem.VRSTA;
      }

    });
  }

  public filterEvidencijaRadVreOj(text: string): void {
    if (!text) {
      this.refreshEvidencijaRadVreOj("", false);
      return;
    }

    this.offeredEvidencijaRadVreOj = this.filteredEvidencijaRadVreOj.filter(
      item => item?.SIF_OJ.toLowerCase().includes(text.toLowerCase())
    );

    if (this.offeredEvidencijaRadVreOj.length == 0) {
      this.refreshEvidencijaRadVreOj(text, false);
    }
  }

  public selectEvidencijaRadVreOj(EvidencijaRadVreOj: EvidencijaRadVreOj): void {
    this.filter.SIF_OJ = EvidencijaRadVreOj.SIF_OJ;
    this.filter.NAZMJTR = EvidencijaRadVreOj.NAZMJTR;
    this.filter.VRSTA = EvidencijaRadVreOj.VRSTA;
    this.pripremaGotova = false;
    document.getElementById("offeredEvidencijaRadVreOj-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.EvidencijaRadVreOjDropdownIndex = -1;
  }

  public resetEvidencijaRadVreOjIndex(): void {
    this.EvidencijaRadVreOjDropdownIndex = -1;
    document.getElementById("offeredEvidencijaRadVreOj-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //ZAPOSLENI END

}
