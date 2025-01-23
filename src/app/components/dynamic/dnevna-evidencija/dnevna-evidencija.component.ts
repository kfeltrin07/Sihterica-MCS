import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { FormsModule, FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
import { debounceTime, Observable, Subject, Subscription } from 'rxjs';
import { EvidencijaMjesecna, EvidencijaRadVreOj, EvRadnogVremenaHelpRadnici, VrstePosla, Sorting, EvidencijaDnevna } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { PaginationComponent } from '../../elements/pagination/pagination.component';
import { PickEvidencijaHelpOjComponent } from '../../pickers/pick-evidencija-help-oj/pick-evidencija-help-oj.component';
import { PickEvidencijaHelpRadniciComponent } from '../../pickers/pick-evidencija-help-radnici/pick-evidencija-help-radnici.component';
import { PickVrstaPoslaComponent } from '../../pickers/pick-vrsta-posla/pick-vrsta-posla.component';
import { DetailsMjesecnaEvidencijaComponent } from '../mjesecna-evidencija/details-mjesecna-evidencija/details-mjesecna-evidencija.component';
import { CopyDnevnaEvidencijaComponent } from './copy-dnevna-evidencija/copy-dnevna-evidencija.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-dnevna-evidencija',
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
  templateUrl: './dnevna-evidencija.component.html',
  styleUrl: './dnevna-evidencija.component.scss'
})
export class DnevnaEvidencijaComponent implements OnInit {
  public displayedColumns: string[] = ['MBR', 'OSOBA', 'SIF_MT_N', 'SIF_VP_N', 'SATI', 'ODHH', 'DOHH', 'IDK_N', 'options'];

  public filter: any = {
    MBR: "%",
    PREZIME_IME2: "",
    PREZIME_IME: "",
    NAZ_ZAN: "",
    NAZ_RM: "",
    SIF_OJ: "%",
    NAZ_OJ: "",
    SIF_VP: "%",
    DATUM: "",
  }

  public varNames: any = {
    NAZ_VP: "",
  }


  public evidencijaDnevna: EvidencijaDnevna[] = [];
  public EvidencijaDnevna: EvidencijaDnevna = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIFVLAS: '',
    MBR: '',
    MBRX: '',
    OSOBA: '',
    SIF_VP: '',
    SIF_VP_N: '',
    ODHH: '',
    DOHH: '',
    RID: '',
    SATI: '',
    IDK: '',
    SYSD: '',
    OD: '',
    DO: '',
    IDK_N: '',
    ISATI: '',
    IODHH: '',
    IDOHH: '',
    SIF_MT: '',
    SIF_MT_N: '',
    DATUM: ''
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


  public dataSource = this.evidencijaDnevna;
  public searchParam: string = '';
  public loading: boolean = false;
  public sorting: Sorting = {
    active: 'OSOBA, MBR, SIF_VP_N, SIF_MT_N',
    direction: 'ASC'
  };
  public isPaginatorShown: boolean = true;
  public pageIndex: number = 0;
  public pageSize = 20;
  public pageSizeOptions: number[] = [5, 10, 15, 20];
  public length = 0;

  public IncomingData: any = {};

  private modelChanged: Subject<string> = new Subject<string>();
  private subscription!: Subscription;

  constructor(
    public http: HttpClient,
    public globalVar: GlobalVariablesService,
    public globalFn: GlobalFunctionsService,
    public session: SessionService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.subscription = this.modelChanged
      .pipe(
        debounceTime(1000),
      )
      .subscribe(() => {
        this.getEvidencijaDnevna();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  inputChanged(event:any) {
    this.modelChanged.next(event);
  }

  public ngOnInit(): void {
    this.route.params.subscribe((params: Params) => { this.IncomingData = params; });
    console.log(this.IncomingData);

    if (this.IncomingData.DATUM) {

      this.filter.DATUM = this.globalFn.formatDateForDateForm(this.IncomingData.DATUM.toLocaleString());
      this.filter.MBR = this.IncomingData.ID_RADNIKA;
      this.filter.SIF_OJ = this.IncomingData.SIFMJTR;
      this.filter.SIF_VP = this.IncomingData.SIF_VP;
      this.OfferedEvidencijaRadVreOj();
      this.OfferedVrstePosla();
      this.OfferedZaposleni();
      this.getEvidencijaDnevna();
    }
    else {
      this.filter.DATUM = new Date().toISOString().slice(0, 10);
      this.getEvidencijaDnevna();
    }

    this.getVrstePosla()
  }

  public getEvidencijaDnevna(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvidencijaDnevna',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pSifVlas: this.session.loggedInUser.ownerID,
          pIdKorisnika: this.session.loggedInUser.ID,
          pMbr: this.filter.MBR,
          pDatum: this.globalFn.formatDate(this.filter.DATUM),
          pSifOj: this.filter.SIF_OJ,
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
      this.evidencijaDnevna = response.debugData.data;
      this.dataSource = this.evidencijaDnevna;
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


  public openCopyDataDialog(): void {
    let data = {
      SIF_OJ: this.filter.SIF_OJ,
      SIF_VP: this.filter.SIF_VP,
      MBR: this.filter.MBR,
      PREZIME_IME: this.filter.PREZIME_IME,
    }
    const dialogRef = this.dialog.open(CopyDnevnaEvidencijaComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  public refresh(): void {
    this.loading = true;
    this.getEvidencijaDnevna();
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

      this.offeredEvidencijaRadVreOj = response.debugData.data;
      for (let item of this.offeredEvidencijaRadVreOj) {
        if (item.SIF_OJ.toUpperCase() == this.filter.SIF_OJ.toUpperCase()) {
          this.filter.NAZMJTR = item.NAZMJTR;
          this.filter.VRSTA = item.VRSTA;
          this.filter.SIF_OJ = item.SIF_OJ;
        }
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

  public refreshZaposleni(searchParam: string, isSelected: boolean,): void {
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

      this.offeredZaposleni = response.debugData.data;
      for (let item of this.offeredZaposleni) {
        if (item.MBR.toUpperCase() == this.filter.MBR.toUpperCase()) {
          this.filter.PREZIME_IME = item.PREZIME_IME;
          this.filter.OSOBA = item.OSOBA;
          this.filter.MBR = item.MBR;
        }
      }

    });
  }

  public filterZaposleni(text: string): void {
    if (!text) {
      this.refreshZaposleni("", false);
      return;
    }

    this.offeredZaposleni = this.filteredZaposleni.filter(
      item => item?.MBR.toLowerCase().includes(text.toLowerCase())
    );


    if (this.offeredZaposleni.length == 0) {
      this.refreshZaposleni(text, false);
    }

  }

  public selectZaposleni(EvRadnogVremenaHelpRadnici: EvRadnogVremenaHelpRadnici,): void {
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

      this.offeredVrstePosla = response.debugData.data;
      for (let item of this.offeredVrstePosla) {
        if (item.SIF_VP.toUpperCase() == this.filter.SIF_VP.toUpperCase()) {
          this.filter.NAZ_VP = item.NAZ_VP;
          this.filter.SIF_VP = item.SIF_VP;
        }
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
      if (!isSelected) {
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

      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredVrstePosla = response.debugData.data;
      for (let item of this.offeredVrstePosla) {
        if (item.SIF_VP.toUpperCase() == this.filter.SIF_VP.toUpperCase()) {
          this.filter.NAZ_VP = item.NAZ_VP;
          this.varNames.SIF_VP = item.SIF_VP;
        }
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

