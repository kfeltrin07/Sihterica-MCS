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
import { EvidencijaMjesecna, EvidencijaRadVreOj, EvRadnogVremenaHelpRadnici, VrstePosla, Sorting, EvidencijaDnevna, Zaposleni, OrganizacijskeJedinice, CRUDAction } from 'src/app/models/models.service';
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
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PdfDnevnaEvidencijaComponent } from './pdf-dnevna-evidencija/pdf-dnevna-evidencija.component';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteDnevnaEvidencijaComponent } from './delete-dnevna-evidencija/delete-dnevna-evidencija.component';
import { CreateDnevnaEvidencijaComponent } from './create-dnevna-evidencija/create-dnevna-evidencija.component';
import { DetailsDnevnaEvidencijaComponent } from './details-dnevna-evidencija/details-dnevna-evidencija.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    MatCheckboxModule,

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
    DATUM: '',
    OSOBAX: '',
    SIF_VPX: '',
    SIF_MTX: '',
  };

  public newEvidencijaDnevna: EvidencijaDnevna = {
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
    DATUM: '',
    OSOBAX: '',
    SIF_VPX: '',
    SIF_MTX: '',
  }

  public newVarNames: any = {};

  public pripremaGotova: boolean = false;

  public EvidencijaRadVreOjDropdownIndex: number = -1;
  public EvidencijaRadVreOjDropdownIndexNew: number = -1;

  public offeredEvidencijaRadVreOj: EvidencijaRadVreOj[] = [];
  public offeredEvidencijaRadVreOjNew: EvidencijaRadVreOj[] = [];
  public offeredEvidencijaRadVreOjRow: EvidencijaRadVreOj[] = [];

  public filteredEvidencijaRadVreOj: EvidencijaRadVreOj[] = [];
  public filteredEvidencijaRadVreOjNew: EvidencijaRadVreOj[] = [];
  public filteredEvidencijaRadVreOjRow: EvidencijaRadVreOj[] = [];
  public listEvidencijaRadVreOj: EvidencijaRadVreOj[] = [];

  public selectedEvidencijaRadVreOj: EvidencijaRadVreOj = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIF_OJ: "",
    NAZMJTR: "",
    VRSTA: "",
  };

  public ZaposleniDropdownIndex: number = -1;
  public ZaposleniKopijaDropdownIndex: number = -1;
  public NewZaposleniDropdownIndex: number = -1;

  public offeredZaposleni: EvRadnogVremenaHelpRadnici[] = [];
  public offeredZaposleniKopija: EvRadnogVremenaHelpRadnici[] = [];
  public NewOfferedZaposleni: EvRadnogVremenaHelpRadnici[] = [];
  public offeredZaposleniRow: EvRadnogVremenaHelpRadnici[] = [];


  public filteredZaposleni: EvRadnogVremenaHelpRadnici[] = [];
  public filteredZaposleniKopija: EvRadnogVremenaHelpRadnici[] = [];
  public NewFilteredZaposleni: EvRadnogVremenaHelpRadnici[] = [];
  public listZaposleni: EvRadnogVremenaHelpRadnici[] = [];
  public filteredZaposleniRow: EvRadnogVremenaHelpRadnici[] = [];

  public selectedZaposleni: EvRadnogVremenaHelpRadnici = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    MBR: "",
    PREZIME_IME: "",
    OSOBA: "",
    SIF_OJ: "",
    NAZ_OJ: "",
  };
  public ArrayPodatakaZaUnos: any = [];

  public VrstePoslaDropdownIndex: number = -1;
  public VrstePoslaDropdownIndexNew: number = -1;

  public offeredVrstePosla: VrstePosla[] = [];
  public offeredVrstePoslaNew: VrstePosla[] = [];
  public offeredVrstePoslaRow: VrstePosla[] = [];

  public filteredVrstePosla: VrstePosla[] = [];
  public filteredVrstePoslaNew: VrstePosla[] = [];
  public filteredVrstePoslaRow: VrstePosla[] = [];

  public listVrstePosla: VrstePosla[] = [];

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

  public selection = new SelectionModel<EvidencijaDnevna>(true, []);
  public deleteSelection = new SelectionModel<EvidencijaDnevna>(true, []);

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
    private route: ActivatedRoute,
    public router: Router
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

  inputChanged(event: any) {
    this.modelChanged.next(event);
  }

  public ngOnInit(): void {

    if (this.globalVar.filterZaDnevnaEvidencija.DATUM) {
      this.filter.DATUM = this.globalFn.formatDateForDateForm(this.globalVar.filterZaDnevnaEvidencija.DATUM ? this.globalVar.filterZaDnevnaEvidencija.DATUM : new Date());
      this.filter.MBR = this.globalVar.filterZaDnevnaEvidencija.MBR ? this.globalVar.filterZaDnevnaEvidencija.MBR : "%";
      this.filter.SIF_OJ = this.globalVar.filterZaDnevnaEvidencija.SIF_OJ ? this.globalVar.filterZaDnevnaEvidencija.SIF_OJ : "%";
      this.filter.SIF_VP = this.globalVar.filterZaDnevnaEvidencija.SIF_VP ? this.globalVar.filterZaDnevnaEvidencija.SIF_VP : "%";
      this.OfferedEvidencijaRadVreOj();
      this.OfferedVrstePosla();
      this.OfferedZaposleni();
      this.getEvidencijaDnevna();
    }
    else {
      this.filter.DATUM = this.globalFn.formatDateForDateForm(new Date());
      this.getEvidencijaDnevna();
    }

    this.getVrstePosla();
    this.getZaposleni();
    this.getOJ();
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
          pMbr: this.filter.MBR ? this.filter.MBR : "%",
          pDatum: this.globalFn.formatDate(this.filter.DATUM),
          pSifOj: this.filter.SIF_OJ ? this.filter.SIF_OJ : "%",
          pZSifMt: this.filter.SIF_OJ ? this.filter.SIF_OJ : "%",
          pZSifVp: this.filter.SIF_VP ? this.filter.SIF_VP : "%",
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
      this.loading = false;

      this.evidencijaDnevna = response.debugData.data;
      this.dataSource = this.evidencijaDnevna;
      this.length = +response.debugData?.data[0]?.UKUPANBROJSLOGOVA ? (+response.debugData.data[0].UKUPANBROJSLOGOVA) : 0;

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

    const dialogRef = this.dialog.open(CreateDnevnaEvidencijaComponent, {
      data: this.filter
    });
    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => this.refresh(), 3000);
    });
  }
  /*

  public openEditDialog(item: any): void {
    const dialogRef = this.dialog.open(EditEvidencijaRadnogVremenaZaglavljeComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => this.refresh(), 1000);
    });
  }


*/
  public openDeleteDialog(item: any): void {
    const dialogRef = this.dialog.open(DeleteDnevnaEvidencijaComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => this.refresh(), 1000);
    });
  }

  public openDetailsDialog(item: any): void {
    const dialogRef = this.dialog.open(DetailsDnevnaEvidencijaComponent, {
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
    for (let i = 0; i < this.globalVar.EvidencijaDnevnaDisplayedColumns.length; i++) {
      this.displayedColumns.push(this.globalVar.EvidencijaDnevnaDisplayedColumns[i].name);
    }
    this.displayedColumns.push('options');
  }

  public openPDFDialog(): void {
    let data = {
      DATUM: this.filter.DATUM,
      MBR: this.filter.MBR,
      SIF_OJ: this.filter.SIF_OJ,
      SIF_VP: this.filter.SIF_VP,
    }
    const dialogRef = this.dialog.open(PdfDnevnaEvidencijaComponent, {
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
    this.filter.SIF_OJ = "%";
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
    this.filter.MBR = "%";
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
    this.filter.SIF_VP = "%";
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
      this.listVrstePosla = response.debugData.data;
    });
  }

  public getZaposleni(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaHelpRadnici',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: '%',
          limit: 1000,
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
      this.listZaposleni = response.debugData.data;
    });
  }

  public getOJ(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaSviRadniciHelpOj',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pIdKorisnika: this.session.loggedInUser.ID,
          limit: 1000,
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
      this.listEvidencijaRadVreOj = response.debugData.data;
    });
  }


  //ZAPOSLENI START
  public pickNewZaposleni(): void {
    const dialogRef = this.dialog.open(PickEvidencijaHelpRadniciComponent, {});

    dialogRef.afterClosed().subscribe((EvRadnogVremenaHelpRadnici?: EvRadnogVremenaHelpRadnici) => {
      this.setNewZaposleniFromDialog(EvRadnogVremenaHelpRadnici);
    });
  }

  public setNewZaposleniFromDialog(EvRadnogVremenaHelpRadnici?: EvRadnogVremenaHelpRadnici): void {
    if (EvRadnogVremenaHelpRadnici) {
      this.newEvidencijaDnevna.MBR = EvRadnogVremenaHelpRadnici.MBR;
      this.newVarNames.PREZIME_IME = EvRadnogVremenaHelpRadnici.PREZIME_IME;
      this.newVarNames.OSOBA = EvRadnogVremenaHelpRadnici.OSOBA;

    }
  }

  public removeNewZaposleni(e: Event): void {
    e.preventDefault();
    this.newEvidencijaDnevna.MBR = "";
    this.newVarNames.PREZIME_IME = "";
    this.newVarNames.OSOBA = "";

  }

  public refreshNewZaposleni(searchParam: string, isSelected: boolean,): void {
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
      this.NewOfferedZaposleni = response.debugData.data;
      this.NewFilteredZaposleni = response.debugData.data;

      var dummyEl = document.getElementById('NewOfferedZaposleni-help-span');
      var isFocused = (document.activeElement === dummyEl);
      if (!isSelected && isFocused) {
        document.getElementById("NewOfferedZaposleni-dropdown")?.classList.add("select-dropdown-content-visible");
      }

    });
  }

  public OfferedNewZaposleni(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaHelpRadnici',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: this.newEvidencijaDnevna.MBR,
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
      this.NewOfferedZaposleni = data;

      const matchedItem = this.NewOfferedZaposleni.find(item => item.MBR.toUpperCase() === this.newEvidencijaDnevna.MBR.toUpperCase());
      if (matchedItem) {
        this.newVarNames.PREZIME_IME = matchedItem.PREZIME_IME;
        this.newVarNames.OSOBA = matchedItem.OSOBA;
        this.newEvidencijaDnevna.MBR = matchedItem.MBR;
      }

    });
  }

  public filterNewZaposleni(text: string): void {
    if (!text) {
      this.refreshNewZaposleni("", false);
      return;
    }

    this.NewOfferedZaposleni = this.NewFilteredZaposleni.filter(
      item => item?.MBR.toLowerCase().includes(text.toLowerCase())
    );


    if (this.NewOfferedZaposleni.length == 0) {
      this.refreshNewZaposleni(text, false);
    }

  }

  public selectNewZaposleni(EvRadnogVremenaHelpRadnici: EvRadnogVremenaHelpRadnici,): void {
    this.newEvidencijaDnevna.MBR = EvRadnogVremenaHelpRadnici.MBR;
    this.newVarNames.PREZIME_IME = EvRadnogVremenaHelpRadnici.PREZIME_IME;
    this.newVarNames.OSOBA = EvRadnogVremenaHelpRadnici.OSOBA;

    document.getElementById("NewOfferedZaposleni-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.NewZaposleniDropdownIndex = -1;

  }

  public resetNewZaposleniIndex(): void {
    this.NewZaposleniDropdownIndex = -1;
    document.getElementById("NewOfferedZaposleni-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //ZAPOSLENI END


  //VrstaPosla NEW START
  public pickVrstePoslaNew(): void {
    const dialogRef = this.dialog.open(PickVrstaPoslaComponent, {});

    dialogRef.afterClosed().subscribe((VrstePosla?: VrstePosla) => {
      this.setVrstePoslaNewDialog(VrstePosla);
    });
  }

  public setVrstePoslaNewDialog(VrstePosla?: VrstePosla): void {
    if (VrstePosla) {
      this.newEvidencijaDnevna.SIF_VP = VrstePosla.SIF_VP;
      this.newVarNames.NAZ_VP = VrstePosla.NAZ_VP;

    }
  }

  public removeVrstePoslaNew(e: Event): void {
    e.preventDefault();
    this.newEvidencijaDnevna.SIF_VP = "";
    this.newVarNames.NAZ_VP = "";
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
      this.offeredVrstePoslaNew = response.debugData.data;
      this.filteredVrstePoslaNew = response.debugData.data;
      var dummyEl = document.getElementById('offeredVrstePoslaNew-help-span');
      var isFocused = (document.activeElement === dummyEl);
      if (!isSelected && isFocused) {
        document.getElementById("offeredVrstePoslaNew-dropdown")?.classList.add("select-dropdown-content-visible");
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
          pDioNaziva: this.newEvidencijaDnevna.SIF_VP,
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
      this.offeredVrstePoslaNew = data;

      const matchedItem = this.offeredVrstePoslaNew.find(item => item.SIF_VP.toUpperCase() === this.newEvidencijaDnevna.SIF_VP.toUpperCase());
      if (matchedItem) {
        this.newEvidencijaDnevna.SIF_VP = matchedItem.SIF_VP;
        this.newVarNames.NAZ_VP = matchedItem.NAZ_VP;
      }
    });
  }

  public filterVrstePoslaNew(text: string): void {
    if (!text) {
      this.refreshVrstePoslaNew("", false);
      return;
    }

    this.offeredVrstePoslaNew = this.filteredVrstePoslaNew.filter(
      item => item?.SIF_VP.toLowerCase().includes(text.toLowerCase())
    );

    if (this.offeredVrstePoslaNew.length == 0) {
      this.refreshVrstePoslaNew(text, false);
    }
  }

  public selectVrstePoslaNew(VrstePosla: VrstePosla): void {
    this.newEvidencijaDnevna.SIF_VP = VrstePosla.SIF_VP;
    this.newVarNames.NAZ_VP = VrstePosla.NAZ_VP;
    document.getElementById("offeredVrstePoslaNew-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.VrstePoslaDropdownIndexNew = -1;
  }

  public resetVrstePoslaNewIndex(): void {
    this.VrstePoslaDropdownIndexNew = -1;
    document.getElementById("offeredVrstePoslaNew-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //VrstaPosla NEW END

  //EvidencijaRadVreOj START
  public pickEvidencijaRadVreOjNew(): void {
    const dialogRef = this.dialog.open(PickEvidencijaHelpOjComponent, {});

    dialogRef.afterClosed().subscribe((EvidencijaRadVreOj?: EvidencijaRadVreOj) => {
      this.setEvidencijaRadVreNewOjFromDialog(EvidencijaRadVreOj);
    });
  }

  public setEvidencijaRadVreNewOjFromDialog(EvidencijaRadVreOj?: EvidencijaRadVreOj): void {
    if (EvidencijaRadVreOj) {
      this.newEvidencijaDnevna.SIF_MT = EvidencijaRadVreOj.SIF_OJ;
      this.newVarNames.NAZMJTR = EvidencijaRadVreOj.NAZMJTR;

    }
  }

  public removeEvidencijaRadVreOjNew(e: Event): void {
    e.preventDefault();
    this.newEvidencijaDnevna.SIF_MT = "";
    this.newVarNames.NAZMJTR = "";

  }

  public refreshEvidencijaRadVreOjNew(searchParam: string, isSelected: boolean): void {
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
      this.offeredEvidencijaRadVreOjNew = response.debugData.data;
      this.filteredEvidencijaRadVreOjNew = response.debugData.data;
      var dummyEl = document.getElementById('offeredEvidencijaRadVreOjNew-help-span');
      var isFocused = (document.activeElement === dummyEl);
      if (!isSelected && isFocused) {
        document.getElementById("offeredEvidencijaRadVreOjNew-dropdown")?.classList.add("select-dropdown-content-visible");
      }
    });
  }

  public OfferedEvidencijaRadVreOjNew(): void {
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

      this.offeredEvidencijaRadVreOjNew = response.debugData.data;
      for (let item of this.offeredEvidencijaRadVreOjNew) {
        if (item.SIF_OJ.toUpperCase() == this.newEvidencijaDnevna.SIF_MT.toUpperCase()) {
          this.newEvidencijaDnevna.SIF_MT = item.SIF_OJ;
          this.newVarNames.NAZMJTR = item.NAZMJTR;
        }
      }
    });
  }

  public filterEvidencijaRadVreOjNew(text: string): void {
    if (!text) {
      this.refreshEvidencijaRadVreOjNew("", false);
      return;
    }

    this.offeredEvidencijaRadVreOjNew = this.filteredEvidencijaRadVreOjNew.filter(
      item => item?.SIF_OJ.toLowerCase().includes(text.toLowerCase())
    );

    if (this.offeredEvidencijaRadVreOjNew.length == 0) {
      this.refreshEvidencijaRadVreOjNew(text, false);
    }
  }

  public selectEvidencijaRadVreOjNew(EvidencijaRadVreOj: EvidencijaRadVreOj): void {
    this.newEvidencijaDnevna.SIF_MT = EvidencijaRadVreOj.SIF_OJ;
    this.newVarNames.NAZMJTR = EvidencijaRadVreOj.NAZMJTR;

    document.getElementById("offeredEvidencijaRadVreOjNew-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.EvidencijaRadVreOjDropdownIndexNew = -1;
  }

  public resetEvidencijaRadVreOjNewIndex(): void {
    this.EvidencijaRadVreOjDropdownIndexNew = -1;
    document.getElementById("offeredEvidencijaRadVreOjNew-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
  //EvidencijaRadVreOj END

  public Save(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'upisSihterice',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pAkcija: CRUDAction.Insert,
          pSifVlas: this.session.loggedInUser.ownerID,
          pDatum: this.globalFn.formatDate(this.filter.DATUM),
          pMbr: this.newEvidencijaDnevna.MBR,
          pSifOj: this.newEvidencijaDnevna.SIF_MT,
          pSifVP: this.newEvidencijaDnevna.SIF_VP,
          pSati: this.newEvidencijaDnevna.SATI,
          pOd: this.newEvidencijaDnevna.ODHH,
          pDo: this.newEvidencijaDnevna.DOHH,
          pIdOperatera: this.session.loggedInUser.ID,
          pRid: ""
        }
      }
    ).subscribe((response: any) => {
      this.loading = false;
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.refresh();
    });
  }

  public Update(item: any): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'upisSihterice',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pAkcija: CRUDAction.Update,
          pSifVlas: this.session.loggedInUser.ownerID,
          pDatum: this.globalFn.formatDate(this.filter.DATUM),
          pMbr: item.MBR,
          pSifOj: item.SIF_MT,
          pSifVP: item.SIF_VP,
          pSati: item.SATI,
          pOd: item.ODHH,
          pDo: item.DOHH,
          pIdOperatera: this.session.loggedInUser.ID,
          pRid: item.RID
        }
      }
    ).subscribe((response: any) => {
      this.loading = false;
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.selection.deselect(item);

    });
  }











  //EvidencijaRadVreOj START
  public pickEvidencijaRadVreOjRow(row: EvidencijaDnevna) {
    const dialogRef = this.dialog.open(PickEvidencijaHelpOjComponent, {});

    dialogRef.afterClosed().subscribe((EvidencijaRadVreOj?: EvidencijaRadVreOj) => {
      return this.setEvidencijaRadVreOjRowFromDialog(row, EvidencijaRadVreOj);
    });
  }

  public setEvidencijaRadVreOjRowFromDialog(row: EvidencijaDnevna, EvidencijaRadVreOj?: EvidencijaRadVreOj) {
    if (EvidencijaRadVreOj) {
      row.SIF_MT = EvidencijaRadVreOj.SIF_OJ;
      row.SIF_MTX = EvidencijaRadVreOj.NAZMJTR;
      this.selection.select(row);
    }
    return "";
  }

  public removeEvidencijaRadVreOjRow(e: Event, row: EvidencijaDnevna): void {
    e.preventDefault();
    row.SIF_MT = "";
    row.SIF_MTX = "";
    this.selection.select(row);

  }

  public refreshEvidencijaRadVreOjRow(searchParam: string, isSelected: boolean): void {
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
      this.loading = false;
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredEvidencijaRadVreOjRow = response.debugData.data;
      this.filteredEvidencijaRadVreOjRow = response.debugData.data;
    });
  }

  public OfferedEvidencijaRadVreOjRow(row: EvidencijaDnevna): void {
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

      this.offeredEvidencijaRadVreOjRow = response.debugData.data;
      for (let item of this.offeredEvidencijaRadVreOjRow) {
        if (item.SIF_OJ.toUpperCase() == row.SIF_MT.toUpperCase()) {
          row.SIF_MT = item.SIF_OJ;
          row.SIF_MTX = item.NAZMJTR;
        }
      }
    });
  }

  public filterEvidencijaRadVreOjRow(row: EvidencijaDnevna): void {
    if (row.SIF_MT==''||!row.SIF_MT) {
      row.SIF_MTX='';
      this.refreshEvidencijaRadVreOjRow("", false);
      return;
    }

    this.offeredEvidencijaRadVreOjRow = this.filteredEvidencijaRadVreOjRow.filter(
      item => item?.SIF_OJ.toLowerCase().includes(row.SIF_MT.toLowerCase())
    );

    if (this.offeredEvidencijaRadVreOjRow.length == 0) {
      row.SIF_MTX='';
      this.refreshEvidencijaRadVreOjRow(row.SIF_MT, false);
    }
  }

  //EvidencijaRadVreOj END


  //VrstaPosla NEW START
  public pickVrstePoslaRow(row: EvidencijaDnevna): void {
    const dialogRef = this.dialog.open(PickVrstaPoslaComponent, {});

    dialogRef.afterClosed().subscribe((VrstePosla?: VrstePosla) => {
      this.setVrstePoslaRowDialog(row, VrstePosla);
    });
  }

  public setVrstePoslaRowDialog(row: EvidencijaDnevna, VrstePosla?: VrstePosla): void {
    if (VrstePosla) {
      row.SIF_VP = VrstePosla.SIF_VP;
      row.SIF_VP_N = VrstePosla.NAZ_VP;
      this.selection.select(row);
    }
  }

  public removeVrstePoslaRow(e: Event, row: EvidencijaDnevna): void {
    e.preventDefault();
    row.SIF_VP = "";
    row.SIF_VP_N = "";
    this.selection.select(row);

  }

  public refreshVrstePoslaRow(searchParam: string, isSelected: boolean): void {
    if (this.offeredVrstePosla.length == 0) {

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
        this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
        this.offeredVrstePoslaRow = response.debugData.data;
        this.filteredVrstePoslaRow = response.debugData.data;

      });
    }
  }

  public OfferedVrstePoslaRow(row: EvidencijaDnevna): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getVrstePosla',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: row.SIF_VP,
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
      this.offeredVrstePoslaRow = data;

      const matchedItem = this.offeredVrstePoslaRow.find(item => item.SIF_VP.toUpperCase() === row.SIF_VP.toUpperCase());
      if (matchedItem) {
        row.SIF_VP = matchedItem.SIF_VP;
        row.SIF_VP_N = matchedItem.NAZ_VP;
      }
    });
  }

  public filterVrstePoslaRow(text: string,row:EvidencijaDnevna): void {
    if (text==''||!text) {
      row.SIF_VP_N='';
      this.refreshVrstePoslaRow("", false);
      return;
    }

    this.offeredVrstePoslaRow = this.filteredVrstePoslaRow.filter(
      item => item?.SIF_VP.toLowerCase().includes(text.toLowerCase())
    );

    if (this.offeredVrstePoslaRow.length == 0) {
      row.SIF_VP_N='';
      this.refreshVrstePoslaRow(text, false);
    }
  }

  //ZAPOSLENI START
  public pickZaposleniRow(row: EvidencijaDnevna): void {
    const dialogRef = this.dialog.open(PickEvidencijaHelpRadniciComponent, {});

    dialogRef.afterClosed().subscribe((EvRadnogVremenaHelpRadnici?: EvRadnogVremenaHelpRadnici) => {
      this.setZaposleniRowFromDialog(row, EvRadnogVremenaHelpRadnici);
    });
  }

  public setZaposleniRowFromDialog(row: EvidencijaDnevna, EvRadnogVremenaHelpRadnici?: EvRadnogVremenaHelpRadnici): void {
    if (EvRadnogVremenaHelpRadnici) {
      row.MBR = EvRadnogVremenaHelpRadnici.MBR;
      row.OSOBAX = EvRadnogVremenaHelpRadnici.PREZIME_IME;
      this.selection.select(row);

    }
  }

  public removeZaposleniRow(e: Event, row: EvidencijaDnevna): void {
    e.preventDefault();
    row.MBR = "";
    row.OSOBAX = "";
    this.selection.select(row);
  }

  public refreshZaposleniRow(searchParam: string, isSelected: boolean,): void {

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
      this.loading = false;
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredZaposleniRow = response.debugData.data;
      this.filteredZaposleniRow = response.debugData.data;


    });

  }

  public OfferedZaposleniRow(row: EvidencijaDnevna): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getEvRadnogVremenaHelpRadnici',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: row.MBR,
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
      this.offeredZaposleniRow = data;

      const matchedItem = this.offeredZaposleniRow.find(item => item.MBR.toUpperCase() === row.MBR.toUpperCase());
      if (matchedItem) {
        row.MBR = matchedItem.MBR;
        row.OSOBAX = matchedItem.PREZIME_IME;
      }

    });
  }

  public filterZaposleniRow(text: any): void {
    if (!text.MBR) {
      this.refreshZaposleniRow("", false);
      return;
    }

    this.offeredZaposleniRow = this.filteredZaposleniRow.filter(
      item => item?.MBR.toLowerCase().includes(text.MBR.toLowerCase())
    );

    if (this.offeredZaposleniRow.length == 0) {
      this.refreshZaposleniRow(text.MBR, false);
    }

  }

  public goToMjesecnaEvidencija(event: any): void {

    console.log(event);

    let GODINA = this.filter.DATUM.substring(0, 4);

    let MJESEC = +this.filter.DATUM.substring(5, 7);

    let data = { MBR: event.MBR, SIF_OJ: this.filter.SIF_OJ, SIF_VP: event.SIF_VP, GODINA: GODINA, MJESEC: MJESEC };

    this.router.navigate(["mjesecna-evidencija", data]);


  }


  public saveAll(): void {
    for (let item of this.selection.selected) {
      this.Update(item);
    }
    this.refresh();
    if (this.selection.selected.length > 0) {
      this.selection.clear();
    }
  }

  public deleteSelected(): void {
    if (this.deleteSelection.selected.length > 1) {
      this.ArrayPodatakaZaUnos.length = 0;
      for (let zaposleni of this.deleteSelection.selected) {
        this.ArrayPodatakaZaUnos = [...this.ArrayPodatakaZaUnos, {
          pAkcija: CRUDAction.Delete,
          pMbr: zaposleni.MBR,
          pSifVlas: this.session.loggedInUser.ownerID,
          pSifOj: zaposleni.SIF_MT,
          pSifVP: zaposleni.SIF_VP,
          pDatum: zaposleni.DATUM,
          pSati: zaposleni.SATI,
          pOd: zaposleni.ODHH,
          pDo: zaposleni.DOHH,
          pIdOperatera: this.session.loggedInUser.ID,
          pRid: zaposleni.RID
        }];
      }
      this.http.post(
        this.globalVar.APIHost + this.globalVar.APIFile,
        {
          action: 'Sihterica',
          method: 'upisSihtericeGrupni',
          sid: this.session.loggedInUser.sessionID,
          data: {
            pPodaci: JSON.stringify(this.ArrayPodatakaZaUnos)
          }
        }
      ).subscribe((response: any) => {
        this.ArrayPodatakaZaUnos.length = 0;
        this.deleteSelection.clear();
        this.refresh();
        if (response.debugData.data.length != 0) {
          this.globalVar.snackBarTableData = response.debugData.data;
          this.globalFn.showSnackbarCostum(response.debugData.data.length);
        }
        else {
          this.globalFn.showSnackbarError("Dogodila se neka greška kod unosa");
        }

      });

    } else {
      this.http.post(
        this.globalVar.APIHost + this.globalVar.APIFile,
        {
          action: 'Sihterica',
          method: 'upisSihterice',
          sid: this.session.loggedInUser.sessionID,
          data: {
            pAkcija: CRUDAction.Delete,
            pSifVlas: this.session.loggedInUser.ownerID,
            pDatum: this.deleteSelection.selected[0].DATUM,
            pMbr: this.deleteSelection.selected[0].MBR,
            pSifOj: this.deleteSelection.selected[0].SIF_MT,
            pSifVP: this.deleteSelection.selected[0].SIF_VP,
            pSati: this.deleteSelection.selected[0].SATI,
            pOd: this.deleteSelection.selected[0].ODHH,
            pDo: this.deleteSelection.selected[0].DOHH,
            pIdOperatera: this.session.loggedInUser.ID,
            pRid: this.deleteSelection.selected[0].RID
          }
        }
      ).subscribe((response: any) => {
        this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
        this.deleteSelection.clear();
        this.refresh();
        this.getPorukeUpisaSihterica();
      });
    }
  }

  public getPorukeUpisaSihterica(): void {

    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getPorukeUpisaSihterica',
        sid: this.session.loggedInUser.sessionID,
        data: {
          limit: 1000000,
        }
      }
    ).subscribe((response: any) => {
      console.log(response);
      if (response.debugData.data.length != 0) {
        this.globalVar.snackBarTableData = response.debugData.data;
        this.globalFn.showSnackbarCostum(response.debugData.data.length);
      }
      else {
        this.globalFn.showSnackbarError("Dogodila se neka greška kod unosa");
      }
    });
  }

  public getRekapitulacija():void{
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getRekapitulacijaSatiDnevna',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pSifVlas: this.session.loggedInUser.ownerID,
          pIdKorisnika: this.session.loggedInUser.ID,
          pMbr: this.filter.MBR,
          pDatum: this.globalFn.formatDate(this.filter.DATUM),
          pSifOj: this.filter.SIF_OJ ? this.filter.SIF_OJ : "%",
          pZSifMt: this.filter.SIF_OJ ? this.filter.SIF_OJ : "%",
          pZSifVp: this.filter.SIF_VP ? this.filter.SIF_VP : "%"
        }
      }
    ).subscribe((response: any) => {
      this.globalVar.snackBarRekaitulacijaDnevna=[];
      console.log(response);
      if (response.debugData.data.length != 0) {
        this.globalVar.snackBarRekaitulacijaDnevna = response.debugData.data;
        this.globalFn.showSnackbarRekapitulacijaDenavna(response.debugData.data.length);
      }
      else {
        this.globalFn.showSnackbarError("Dogodila se neka greška kod unosa");
      }
    });
  }

  public selectAll(): void {
    this.deleteSelection.clear();
    this.dataSource.forEach(row => this.deleteSelection.select(row));
  }

  public validateForm(EvidencijaDnevna: EvidencijaDnevna): boolean {
    if (EvidencijaDnevna.MBR==''||EvidencijaDnevna.SIF_VP==''||EvidencijaDnevna.SIF_MT==''||(EvidencijaDnevna.MBR && EvidencijaDnevna.OSOBAX == '') ||(EvidencijaDnevna.SIF_VP && EvidencijaDnevna.SIF_VP_N == '') || (EvidencijaDnevna.SIF_MT && EvidencijaDnevna.SIF_MTX == '') || EvidencijaDnevna.SATI == '' || EvidencijaDnevna.ODHH == '' ||EvidencijaDnevna.DOHH == '') {
      return false;
    } else {
      return true;
    }
  }

  public validateNewForm(EvidencijaDnevna: EvidencijaDnevna): boolean {
    if (EvidencijaDnevna.MBR==''||EvidencijaDnevna.SIF_VP==''||EvidencijaDnevna.SIF_MT==''||(EvidencijaDnevna.MBR && this.newVarNames.PREZIME_IME == '') ||(EvidencijaDnevna.SIF_VP && this.newVarNames.NAZ_VP == '') || (EvidencijaDnevna.SIF_MT && this.newVarNames.NAZMJTR == '') || EvidencijaDnevna.SATI == '' || EvidencijaDnevna.ODHH == '' ||EvidencijaDnevna.DOHH == '') {
      return false;
    } else {
      return true;
    }
  }

}

