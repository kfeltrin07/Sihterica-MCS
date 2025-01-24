import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
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
import { EvidencijaMjesecna, EvidencijaRadVreOj, EvRadnogVremenaHelpRadnici, Sorting, VrstePosla } from 'src/app/models/models.service';
import { DetailsMjesecnaEvidencijaComponent } from './details-mjesecna-evidencija/details-mjesecna-evidencija.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { PickEvidencijaHelpOjComponent } from '../../pickers/pick-evidencija-help-oj/pick-evidencija-help-oj.component';
import { PickEvidencijaHelpRadniciComponent } from '../../pickers/pick-evidencija-help-radnici/pick-evidencija-help-radnici.component';
import { PickVrstaPoslaComponent } from '../../pickers/pick-vrsta-posla/pick-vrsta-posla.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { PdfMjesecnaEvidencijaComponent } from './pdf-mjesecna-evidencija/pdf-mjesecna-evidencija.component';

@Component({
  selector: 'app-mjesecna-evidencija',
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
    MatAutocompleteModule,

    FormsModule,
    CommonModule,
    TranslationPipe,
    PaginationComponent
  ],
  templateUrl: './mjesecna-evidencija.component.html',
  styleUrl: './mjesecna-evidencija.component.scss'
})
export class MjesecnaEvidencijaComponent implements OnInit {
  public displayedColumns: string[] = ['D1', 'DAN', 'SIF_MT_N', 'SIF_VP', 'SATI', 'ODHH', 'DOHH', 'IDK_N', 'options'];

  public filter: any = {
    MBR: "",
    MBR2: "",
    PREZIME_IME2: "",
    PREZIME_IME: "",
    NAZ_ZAN: "",
    NAZ_RM: "",
    SIF_OJ: "%",
    NAZ_OJ: "",
    SIF_VP: "",
  }

  public varNames: any = {
    NAZ_VP: "",
  }


  public evidencijaMjesecna: EvidencijaMjesecna[] = [];
  public EvidencijaMjesecna: EvidencijaMjesecna = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SATI2: "",
    ISATI2: "",
    IODHH: "",
    IDOHH: "",
    DAN: "",
    IDK_N: "",
    ODHH: "",
    DOHH: "",
    D1: "",
    RID: "",
    SIFVLAS: "",
    DATUM: "",
    MBR: "",
    SIF_MT: "",
    SIF_VP: "",
    SATI: "",
    IDK: "",
    SYSD: "",
    OD: "",
    DO: "",
    RNALOG: "",
    DATUM_DAN: "",
    SATI_DAN: "",
    OPIS_DAN: "",
    SIF_VP_N: "",
    SIF_MT_N: "",
    NAZIV: "",
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
  public ZaposleniKopijaDropdownIndex: number = -1;

  public offeredZaposleni: EvRadnogVremenaHelpRadnici[] = [];
  public offeredZaposleniKopija: EvRadnogVremenaHelpRadnici[] = [];

  public filteredZaposleni: EvRadnogVremenaHelpRadnici[] = [];
  public filteredZaposleniKopija: EvRadnogVremenaHelpRadnici[] = [];

  public selectedZaposleni: EvRadnogVremenaHelpRadnici = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    MBR: "",
    PREZIME_IME: "",
    OSOBA: "",
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
  public filteredOptions!: Observable<VrstePosla[]>;
  public myControl = new FormControl('');
  public filteredVrstePoslaNew: VrstePosla[] = [];


  public dataSource = this.evidencijaMjesecna;
  public searchParam: string = '';
  public loading: boolean = false;
  public sorting: Sorting = {
    active: 'D1',
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
    public globalFn: GlobalFunctionsService,
    public session: SessionService,
    public dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.filter.GODINA = (new Date()).getFullYear();
    this.filter.MJESEC = new Date().getMonth() + 1;
    this.OfferedEvidencijaRadVreOj();
    this.OfferedVrstePosla();
    this.OfferedZaposleni('1');
    this.OfferedZaposleni('2');
    this.getVrstePosla()
  }

  public getEvidencijaMjesecna(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvidencijaMjesecna',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pIdKorisnika: this.session.loggedInUser.ID,
          pMbr: this.filter.MBR,
          pZaMjesec: this.filter.MJESEC + '.' + this.filter.GODINA,
          pSifMjTr: this.filter.SIF_OJ,
          pZSifMt: this.filter.SIF_OJ,
          pZSifVp: this.filter.SIF_VP,
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
      this.evidencijaMjesecna = response.debugData.data;
      this.dataSource = this.evidencijaMjesecna;
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
    const dialogRef = this.dialog.open(DetailsMjesecnaEvidencijaComponent, {
      data: item,


    });
    dialogRef.afterClosed().subscribe((result) => { });
  }


  public refresh(): void {
    this.loading = true;
    this.getEvidencijaMjesecna();
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
    for (let i = 0; i < this.globalVar.EvidencijaMjesecnaDisplayedColumns.length; i++) {
      this.displayedColumns.push(this.globalVar.EvidencijaMjesecnaDisplayedColumns[i].name);
    }
    this.displayedColumns.push('options');
  }


  public openPDFDialog(): void {
    let data = {
      DATUM: this.filter.MJESEC + '.' + this.filter.GODINA,
      MBR: this.filter.MBR,
      SIF_OJ: this.filter.SIF_OJ,
      SIF_VP: this.filter.SIF_VP,
    }
    const dialogRef = this.dialog.open(PdfMjesecnaEvidencijaComponent, {
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
      const { metadata, data } = response.debugData;
      this.globalFn.showSnackbarError(metadata.OPIS);
      this.offeredEvidencijaRadVreOj = data;

      const matchedItem = this.offeredEvidencijaRadVreOj.find(item => item.SIF_OJ.toUpperCase() === this.filter.SIF_OJ.toUpperCase());
      if (matchedItem) {
        this.filter.NAZMJTR = matchedItem.NAZMJTR;
        this.filter.VRSTA = matchedItem.VRSTA;
        this.filter.SIF_OJ = matchedItem.SIF_OJ;
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
  public pickZaposleni(odabir: string): void {
    const dialogRef = this.dialog.open(PickEvidencijaHelpRadniciComponent, {});

    dialogRef.afterClosed().subscribe((EvRadnogVremenaHelpRadnici?: EvRadnogVremenaHelpRadnici) => {
      this.setZaposleniFromDialog(EvRadnogVremenaHelpRadnici, odabir);
    });
  }

  public setZaposleniFromDialog(EvRadnogVremenaHelpRadnici?: EvRadnogVremenaHelpRadnici, odabir?: string): void {
    if (EvRadnogVremenaHelpRadnici) {
      if (odabir == '1') {
        this.filter.MBR = EvRadnogVremenaHelpRadnici.MBR;
        this.filter.PREZIME_IME = EvRadnogVremenaHelpRadnici.PREZIME_IME;
        this.filter.OSOBA = EvRadnogVremenaHelpRadnici.OSOBA;
      } else {
        this.filter.MBR2 = EvRadnogVremenaHelpRadnici.MBR;
        this.filter.PREZIME_IME2 = EvRadnogVremenaHelpRadnici.PREZIME_IME;
        this.filter.OSOBA2 = EvRadnogVremenaHelpRadnici.OSOBA;
      }
    }
  }

  public removeZaposleni(e: Event, odabir: string): void {
    e.preventDefault();
    if (odabir == '1') {
      this.filter.MBR = "";
      this.filter.PREZIME_IME = "";
      this.filter.OSOBA = "";
    } else {
      this.filter.MBR2 = "";
      this.filter.PREZIME_IME2 = "";
      this.filter.OSOBA2 = "";
    }
  }

  public refreshZaposleni(searchParam: string, isSelected: boolean, odabir: string): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaHelpRadnici',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: searchParam,
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
      if (odabir == '1') {
        this.offeredZaposleni = response.debugData.data;
        this.filteredZaposleni = response.debugData.data;
        var dummyEl = document.getElementById('offeredZaposleni-help-span');
        var isFocused = (document.activeElement === dummyEl);
        if (!isSelected && isFocused) {
          document.getElementById("offeredZaposleni-dropdown")?.classList.add("select-dropdown-content-visible");
        }
      } else {
        this.offeredZaposleniKopija = response.debugData.data;
        this.filteredZaposleniKopija = response.debugData.data;
        var dummyEl = document.getElementById('offeredZaposleniKopija-help-span');
        var isFocused = (document.activeElement === dummyEl);
        if (!isSelected && isFocused) {
          document.getElementById("offeredZaposleniKopija-dropdown")?.classList.add("select-dropdown-content-visible");
        }
      }
    });
  }

  public OfferedZaposleni(odabir: string): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaHelpRadnici',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: odabir == '1' ? this.filter.MBR : this.filter.MBR2,
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

      const { metadata, data } = response.debugData;
      this.globalFn.showSnackbarError(metadata.OPIS);

      if (odabir == '1') {
        this.offeredZaposleni = data;
        const matchedItem = this.offeredZaposleni.find(item => item.MBR.toUpperCase() === this.filter.MBR.toUpperCase());
        if (matchedItem) {
          this.filter.PREZIME_IME = matchedItem.PREZIME_IME;
          this.filter.OSOBA = matchedItem.OSOBA;
          this.filter.MBR = matchedItem.MBR;
        }
      }
      else {
        this.offeredZaposleniKopija = data;
        const matchedItem = this.offeredZaposleniKopija.find(item => item.MBR.toUpperCase() === this.filter.MBR2.toUpperCase());
        if (matchedItem) {
          this.filter.PREZIME_IME2 = matchedItem.PREZIME_IME;
          this.filter.OSOBA2 = matchedItem.OSOBA;
          this.filter.MBR2 = matchedItem.MBR;
        }
      }
    });
  }

  public filterZaposleni(text: string, odabir: string): void {
    if (!text) {
      this.refreshZaposleni("", false, odabir);
      return;
    }

    if (odabir == '1') {
      this.offeredZaposleni = this.filteredZaposleni.filter(
        item => item?.MBR.toLowerCase().includes(text.toLowerCase())
      );
    } else {
      this.offeredZaposleniKopija = this.filteredZaposleniKopija.filter(
        item => item?.PREZIME_IME.toLowerCase().includes(text.toLowerCase())
      );
    }

    if (odabir == '1') {
      if (this.offeredZaposleni.length == 0) {
        this.refreshZaposleni(text, false, odabir);
      }
    } else {
      if (this.offeredZaposleniKopija.length == 0) {
        this.refreshZaposleni(text, false, odabir);
      }
    }
  }

  public selectZaposleni(EvRadnogVremenaHelpRadnici: EvRadnogVremenaHelpRadnici, odabir: string): void {
    if (odabir == '1') {
      this.filter.MBR = EvRadnogVremenaHelpRadnici.MBR;
      this.filter.PREZIME_IME = EvRadnogVremenaHelpRadnici.PREZIME_IME;
      this.filter.OSOBA = EvRadnogVremenaHelpRadnici.OSOBA;

      document.getElementById("offeredZaposleni-dropdown")?.classList.remove("select-dropdown-content-visible");
      this.ZaposleniDropdownIndex = -1;
    } else {

      this.filter.MBR2 = EvRadnogVremenaHelpRadnici.MBR;
      this.filter.PREZIME_IME2 = EvRadnogVremenaHelpRadnici.PREZIME_IME;
      this.filter.OSOBA2 = EvRadnogVremenaHelpRadnici.OSOBA;

      document.getElementById("offeredZaposleniKopija-dropdown")?.classList.remove("select-dropdown-content-visible");
      this.ZaposleniKopijaDropdownIndex = -1;
    }
  }

  public resetZaposleniIndex(odabir: string): void {
    if (odabir == '1') {
      this.ZaposleniDropdownIndex = -1;
      document.getElementById("offeredZaposleni-dropdown")?.classList.remove("select-dropdown-content-visible");
    } else {
      this.ZaposleniKopijaDropdownIndex = -1;
      document.getElementById("offeredZaposleniKopija-dropdown")?.classList.remove("select-dropdown-content-visible");
    }
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
          limit: 100,
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
          limit: 100,
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
        this.filter.NAZ_VP = matchedItem.NAZ_VP;
        this.filter.SIF_VP = matchedItem.SIF_VP;
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



  //VrstaPosla START
  public pickVrstePoslaNew(): void {
    const dialogRef = this.dialog.open(PickVrstaPoslaComponent, {});

    dialogRef.afterClosed().subscribe((VrstePosla?: VrstePosla) => {
      this.setVrstePoslaFromDialog(VrstePosla);
    });
  }

  public setVrstePoslaFromDialogNew(VrstePosla?: VrstePosla): void {
    if (VrstePosla) {
      this.filter.SIF_VP = VrstePosla.SIF_VP;
      this.varNames.NAZ_VP = VrstePosla.NAZ_VP;

    }
  }

  public removeVrstePoslaNew(e: Event): void {
    e.preventDefault();
    this.filter.SIF_VP = "";
    this.varNames.NAZ_VP = "";
  }

  public refreshVrstePoslaNew(searchParam: string, isSelected: boolean): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getVrstePosla',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: searchParam,
          limit: 100,
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

  public OfferedVrstePoslaNew(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getVrstePosla',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: this.filter.SIF_VP,
          limit: 100,
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
        this.filter.NAZ_VP = matchedItem.NAZ_VP;
        this.filter.SIF_VP = matchedItem.SIF_VP;
      }
    });
  }

  public filterVrstePoslaNew(text: string): void {
    if (!text) {
      this.refreshVrstePoslaNew("", false);
      return;
    }

    this.offeredVrstePosla = this.filteredVrstePosla.filter(
      item => item?.SIF_VP.toLowerCase().includes(text.toLowerCase())
    );

    if (this.offeredVrstePosla.length == 0) {
      this.refreshVrstePoslaNew(text, false);
    }
  }

  public selectVrstePoslaNew(VrstePosla: VrstePosla): void {
    this.filter.SIF_VP = VrstePosla.SIF_VP;
    this.varNames.NAZ_VP = VrstePosla.NAZ_VP;
    document.getElementById("offeredVrstePoslaNew-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.VrstePoslaDropdownIndex = -1;
  }

  public resetVrstePoslaNewIndex(): void {
    this.VrstePoslaDropdownIndex = -1;
    document.getElementById("offeredVrstePoslaNew-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //VrstaPosla END


  public getVrstePosla(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getVrstePosla',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: '%',
          limit: 1000,
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
      this.filteredVrstePoslaNew = response.debugData.data;
    });
  }
}
