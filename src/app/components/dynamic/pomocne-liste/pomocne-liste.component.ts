import { Component, OnInit } from '@angular/core';
import { DetailsPomocneListeComponent } from './details-pomocne-liste/details-pomocne-liste.component';
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
import { PomocnaLista, EvidencijaRadVreOj, Sorting, EvRadnogVremenaHelpRadnici, VrstePosla } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { PaginationComponent } from '../../elements/pagination/pagination.component';
import { PickEvidencijaHelpOjComponent } from '../../pickers/pick-evidencija-help-oj/pick-evidencija-help-oj.component';
import { PickEvidencijaHelpRadniciComponent } from '../../pickers/pick-evidencija-help-radnici/pick-evidencija-help-radnici.component';
import { PickOpisVrsteComponent } from '../../pickers/pick-opis-vrste/pick-opis-vrste.component';
import { PickVrstaPoslaComponent } from '../../pickers/pick-vrsta-posla/pick-vrsta-posla.component';
import { PdfPomocneListeComponent } from './pdf-pomocne-liste/pdf-pomocne-liste.component';

@Component({
  selector: 'app-pomocne-liste',
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
  templateUrl: './pomocne-liste.component.html',
  styleUrl: './pomocne-liste.component.scss'
})
export class PomocneListeComponent implements OnInit {
  public displayedColumns: string[] = ['MBR', 'NAZIV', 'SI', 'SIF_VP', 'NAZ_VP', 'SIF_MT', 'MJESEC', 'S1', 'S2', 'UKUPNO', 'VRSTA', 'UKUP', 'options'];

  public filter: any = {
    MBR: "%",
    PREZIME_IME: "",
    NAZ_ZAN: "",
    NAZ_RM: "",
    SIF_OJ: "%",
    NAZ_OJ: "",
    SIF_VP: "%",
  }



  public pomocnaLista: PomocnaLista[] = [];
  public PomocnaLista: PomocnaLista = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    XDUMMY: "",
    SifraNaziv: "",
    NazivVP: "",
    MBR: "",
    NAZIV: "",
    SI: "",
    SIF_VP: "",
    NAZ_VP: "",
    SIF_MT: "",
    SIFVLAS: "",
    MJESEC: "",
    S1: "",
    S2: "",
    S3: "",
    S4: "",
    S5: "",
    S6: "",
    S7: "",
    S8: "",
    S9: "",
    S10: "",
    S11: "",
    S12: "",
    S13: "",
    S14: "",
    S15: "",
    S16: "",
    S17: "",
    S18: "",
    S19: "",
    S20: "",
    S21: "",
    S22: "",
    S23: "",
    S24: "",
    S25: "",
    S26: "",
    S27: "",
    S28: "",
    S29: "",
    S30: "",
    S31: "",
    UKUPNO: "",
    VRSTA: "",
    UKUP: "",
    SatIzn: "",
    SIF_OJ: "",
    NAZ_OJ: "",
    NAZMJTR: "",
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

  public ZaposleniDropdownIndex: number = -1;
  public offeredZaposleni: EvRadnogVremenaHelpRadnici[] = [];
  public filteredZaposleni: EvRadnogVremenaHelpRadnici[] = [];
  public selectedZaposleni: EvRadnogVremenaHelpRadnici = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    MBR: "",
    PREZIME_IME: "",
    OSOBA: "",
    SIF_OJ: "",
    NAZ_OJ: "",
  };

  public VrstePoslaDropdownIndex: number = -1;
  public offeredVrstePosla: VrstePosla[] = [];
  public filteredVrstePosla: VrstePosla[] = [];
  public selectedVrstePosla: VrstePosla = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIF_VP: "",
    NAZ_VP: "",
    SIFVLAS: "",
    SI: "",
  };

  public dataSource = this.pomocnaLista;
  public searchParam: string = '';
  public loading: boolean = false;
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
    public globalFn: GlobalFunctionsService,
    public session: SessionService,
    public dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.setVisibleColumnsFromEvent();
    this.filter.GODINA = (new Date()).getFullYear();
    this.filter.MJESEC = new Date().getMonth() + 1;

  }

  public getEvRadnogVremenaPomocneListe(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaPomocneListe',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pIdKorisnika: this.session.loggedInUser.ID,
          pZaMjesec: this.filter.MJESEC + '.' + this.filter.GODINA,
          pSifMjTr: this.filter.SIF_OJ,
          pMbr: this.filter.MBR,
          pSifVp: this.filter.SIF_VP,
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
      this.pomocnaLista = response.debugData.data;
      this.dataSource = this.pomocnaLista;
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
    const dialogRef = this.dialog.open(DetailsPomocneListeComponent, {
      data: item,


    });
    dialogRef.afterClosed().subscribe((result) => { });
  }


  public refresh(): void {
    this.loading = true;
    this.getEvRadnogVremenaPomocneListe();
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
    for (let i = 0; i < this.globalVar.PomocnaListaDisplayedColumns.length; i++) {
      this.displayedColumns.push(this.globalVar.PomocnaListaDisplayedColumns[i].name);
    }
    this.displayedColumns.push('options');
  }

  public openPDFDialog(): void {
    let data={
      MBR: this.filter.MBR,
      SIF_OJ: this.filter.SIF_OJ,
      SIF_VP: this.filter.SIF_VP,
      GODINA: this.filter.GODINA,
      MJESEC: this.filter.MJESEC
    }
    const dialogRef = this.dialog.open(PdfPomocneListeComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }


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

    }
  }

  public removeEvidencijaRadVreOj(e: Event): void {
    e.preventDefault();
    this.filter.SIF_OJ = "";
    this.filter.NAZMJTR = "";
    this.filter.VRSTA = "";

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

      const { metadata, data } = response.debugData;
      this.globalFn.showSnackbarError(metadata.OPIS);
      this.offeredEvidencijaRadVreOj = data;

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

    document.getElementById("offeredEvidencijaRadVreOj-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.EvidencijaRadVreOjDropdownIndex = -1;
  }

  public resetEvidencijaRadVreOjIndex(): void {
    this.EvidencijaRadVreOjDropdownIndex = -1;
    document.getElementById("offeredEvidencijaRadVreOj-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //EvidencijaRadVreOj END

  //ZAPOSLENI START
  public pickZaposleni(): void {
    const dialogRef = this.dialog.open(PickEvidencijaHelpRadniciComponent, {});

    dialogRef.afterClosed().subscribe((EvRadnogVremenaHelpRadnici?: EvRadnogVremenaHelpRadnici) => {
      this.setZaposleniFromDialog(EvRadnogVremenaHelpRadnici);
    });
  }

  public setZaposleniFromDialog(EvRadnogVremenaHelpRadnici?: EvRadnogVremenaHelpRadnici): void {
    if (EvRadnogVremenaHelpRadnici) {
      this.filter.MBR = EvRadnogVremenaHelpRadnici.MBR;
      this.filter.PREZIME_IME = EvRadnogVremenaHelpRadnici.PREZIME_IME;
      this.filter.OSOBA = EvRadnogVremenaHelpRadnici.OSOBA;

    }
  }

  public removeZaposleni(e: Event): void {
    e.preventDefault();
    this.filter.MBR = "";
    this.filter.PREZIME_IME = "";
    this.filter.OSOBA = "";


  }

  public refreshZaposleni(searchParam: string, isSelected: boolean): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaHelpRadnici',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: searchParam,
          limit: 10,
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
      this.filteredZaposleni = response.debugData.data;
      var dummyEl = document.getElementById('offeredZaposleni-help-span');
      var isFocused = (document.activeElement === dummyEl);
      if (!isSelected && isFocused) {
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
          pDioNaziva: this.filter.MBR,
          limit: 10,
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

      const { metadata, data } = response.debugData;
      this.globalFn.showSnackbarError(metadata.OPIS);
      this.offeredZaposleni = data;

      const matchedItem = this.offeredZaposleni.find(item => item.MBR.toUpperCase() === this.filter.MBR.toUpperCase());
      if (matchedItem) {
        this.filter.MBR = matchedItem.MBR;
        this.filter.PREZIME_IME = matchedItem.PREZIME_IME;
        this.filter.OSOBA = matchedItem.OSOBA;
      }
    });
  }

  public filterZaposleni(text: string): void {
    if (!text) {
      this.refreshZaposleni("", false);
      return;
    }

    this.offeredZaposleni = this.offeredZaposleni.filter(
      item => item?.MBR.toLowerCase().includes(text.toLowerCase())
    );

    if (this.offeredZaposleni.length == 0) {
      this.refreshZaposleni(text, false);
    }
  }

  public selectZaposleni(EvRadnogVremenaHelpRadnici: EvRadnogVremenaHelpRadnici): void {
    this.filter.MBR = EvRadnogVremenaHelpRadnici.MBR;
    this.filter.PREZIME_IME = EvRadnogVremenaHelpRadnici.PREZIME_IME;
    this.filter.OSOBA = EvRadnogVremenaHelpRadnici.OSOBA;

    document.getElementById("offeredZaposleni-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.ZaposleniDropdownIndex = -1;
  }

  public resetZaposleniIndex(): void {
    this.ZaposleniDropdownIndex = -1;
    document.getElementById("offeredZaposleni-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //ZAPOSLENI END


  //VrstaPosla START
  public pickVrstePosla(): void {
    const dialogRef = this.dialog.open(PickVrstaPoslaComponent, {});

    dialogRef.afterClosed().subscribe((VrstePosla?: VrstePosla) => {
      this.setVrstePoslaFromDialog(VrstePosla);
    });
  }

  public setVrstePoslaFromDialog(VrstePosla?: VrstePosla): void {
    if (VrstePosla) {
      this.filter.SIF_VP = VrstePosla.SIF_VP;
      this.filter.NAZ_VP = VrstePosla.NAZ_VP;

    }
  }

  public removeVrstePosla(e: Event): void {
    e.preventDefault();
    this.filter.SIF_VP = "";
    this.filter.NAZ_VP = "";
  }

  public refreshVrstePosla(searchParam: string, isSelected: boolean): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getVrstePosla',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: searchParam,
          limit: 10,
          page: 1,
          sort: [
            {
              property: "SIF_VP",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      console.log(response);
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredVrstePosla = response.debugData.data;
      this.filteredVrstePosla = response.debugData.data;
      var dummyEl = document.getElementById('offeredVrstePosla-help-span');
      var isFocused = (document.activeElement === dummyEl);
      if (!isSelected && isFocused) {
        document.getElementById("offeredVrstePosla-dropdown")?.classList.add("select-dropdown-content-visible");
      }
    });
  }

  public OfferedVrstePosla(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getVrstePosla',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: this.filter.SIF_VP,
          limit: 10,
          page: 1,
          sort: [
            {
              property: "SIF_VP",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {

      const { metadata, data } = response.debugData;
      this.globalFn.showSnackbarError(metadata.OPIS);
      this.offeredVrstePosla = data;

      const matchedItem = this.offeredVrstePosla.find(item => item.SIF_VP.toUpperCase() === this.filter.SIF_VP.toUpperCase());
      if (matchedItem) {
        this.filter.SIF_VP = matchedItem.SIF_VP;
        this.filter.NAZ_VP = matchedItem.NAZ_VP;
      }
    });
  }

  public filterVrstePosla(text: string): void {
    if (!text) {
      this.refreshVrstePosla("", false);
      return;
    }

    this.offeredVrstePosla = this.filteredVrstePosla.filter(
      item => item?.SIF_VP.toLowerCase().includes(text.toLowerCase())
    );

    if (this.offeredVrstePosla.length == 0) {
      this.refreshVrstePosla(text, false);
    }
  }
  
  public selectVrstePosla(VrstePosla: VrstePosla): void {
    this.filter.SIF_VP = VrstePosla.SIF_VP;
    this.filter.NAZ_VP = VrstePosla.NAZ_VP;
    document.getElementById("offeredVrstePosla-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.VrstePoslaDropdownIndex = -1;
  }

  public resetVrstePoslaIndex(): void {
    this.VrstePoslaDropdownIndex = -1;
    document.getElementById("offeredVrstePosla-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //VrstaPosla END

}
