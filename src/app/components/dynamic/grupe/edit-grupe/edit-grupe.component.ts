import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PickShemeComponent } from 'src/app/components/pickers/pick-sheme/pick-sheme.component';
import { Grupe, Sheme, CRUDAction } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-edit-grupe',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,

    CdkDrag,
    CdkDragHandle,
    FormsModule,
    CommonModule,
    TranslationPipe
  ],
  templateUrl: './edit-grupe.component.html',
  styleUrl: './edit-grupe.component.scss'
})
export class EditGrupeComponent {
  public Grupe: Grupe = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    ID_GRUPE: "",
    NAZ_GRUPE: "",
    SIF_SHEME: "",
  };

  public varNames: any = {
    NAZ_OJ: ""
  }


  public ShemeDropdownIndex: number = -1;
  public offeredSheme: Sheme[] = [];
  public filteredSheme: Sheme[] = [];
  public selectedSheme: Sheme = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    SIF_SHEME: "",
    OPIS: "",
    OD: "",
    DO: "",
    PAUZA_OD: "",
    PAUZA_DO: "",
  };
  /*
  public ZaposleniDropdownIndex: number = -1;
  public offeredZaposleni: EvRadnogVremenaHelpRadnici[] = [];
  public selectedZaposleni: EvRadnogVremenaHelpRadnici = {
    UKUPANBROJSLOGOVA: 0,
    RN: 0,
    MBR: "",
    PREZIME_IME: "",
    OSOBA: "",
  };*/

  constructor(
    @Inject(MAT_DIALOG_DATA) public receivedGrupe: Grupe,
    private dialogRef: MatDialogRef<EditGrupeComponent>,
    private http: HttpClient,
    public globalVar: GlobalVariablesService,
    public globalFn: GlobalFunctionsService,
    public t: TranslationService,
    public session: SessionService,
    public dialog: MatDialog
  ) { }

  public ngOnInit(): void { 
    this.Grupe = this.receivedGrupe;
    this.OfferedSheme();
  }

  public validateForm(Grupe: Grupe): boolean {
    if (Grupe.ID_GRUPE != '' && Grupe.NAZ_GRUPE != '') {
      return false;
    } else {
      return true;
    }
  }

  public save(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'updateGrupe',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pAkcija: CRUDAction.Update,
          pSifVlas: this.session.loggedInUser.ownerID,
          pIdGrupe: this.Grupe.ID_GRUPE,
          pNazGrupe: this.Grupe.NAZ_GRUPE,
          pSifSheme: this.Grupe.SIF_SHEME,
        }
      }
    ).subscribe((response: any) => {
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
    });

    this.dialogRef.close();

  }




  //Sheme START
  public pickSheme(): void {
    const dialogRef = this.dialog.open(PickShemeComponent, {});

    dialogRef.afterClosed().subscribe((Sheme?: Sheme) => {
      this.setShemeFromDialog(Sheme);
    });
  }

  public setShemeFromDialog(Sheme?: Sheme): void {
    if (Sheme) {
      this.Grupe.SIF_SHEME = Sheme.SIF_SHEME;
      this.varNames.NAZ_SHEME = Sheme.OPIS;
    }
  }

  public removeSheme(e: Event): void {
    e.preventDefault();
    this.Grupe.SIF_SHEME = "";
    this.varNames.NAZ_SHEME = "";
  }

  public refreshSheme(searchParam: string, isSelected: boolean): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getSheme',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: searchParam,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "SIF_SHEME",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {
      console.log(response);
      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredSheme = response.debugData.data;
      this.filteredSheme = this.offeredSheme;
      if (!isSelected) {
        document.getElementById("offeredSheme-dropdown")?.classList.add("select-dropdown-content-visible");
      }
    });
  }

  public OfferedSheme(): void {
    this.http.post(
      this.globalVar.APIHost + this.globalVar.APIFile,
      {
        action: 'Sihterica',
        method: 'getSheme',
        sid: this.session.loggedInUser.sessionID,
        data: {
          pDioNaziva: this.Grupe.SIF_SHEME,
          limit: 100,
          page: 1,
          sort: [
            {
              property: "SIF_SHEME",
              direction: "ASC"
            }
          ]
        }
      }
    ).subscribe((response: any) => {

      this.globalFn.showSnackbarError(response.debugData.metadata.OPIS);
      this.offeredSheme = response.debugData.data;
      for (let item of this.offeredSheme) {
        if (item.SIF_SHEME.toUpperCase() == this.Grupe.SIF_SHEME.toUpperCase()) {
          this.varNames.NAZ_SHEME = item.OPIS;
          this.Grupe.SIF_SHEME = item.SIF_SHEME;

        }
      }
    });
  }

  public filterSheme(text: string): void {
    if (!text) {
      this.refreshSheme("", false);
      return;
    }

    this.offeredSheme = this.filteredSheme.filter(
      item => item?.SIF_SHEME.toLowerCase().includes(text.toLowerCase())
    );

    if (this.offeredSheme.length == 0) {
      this.refreshSheme(text, false);
    }
  }

  public selectSheme(Sheme: Sheme): void {
    this.Grupe.SIF_SHEME = Sheme.SIF_SHEME;
    this.varNames.NAZ_SHEME = Sheme.OPIS;
    document.getElementById("offeredSheme-dropdown")?.classList.remove("select-dropdown-content-visible");
    this.ShemeDropdownIndex = -1;
  }

  public resetSheme(): void {
    this.ShemeDropdownIndex = -1;
    document.getElementById("offeredSheme-dropdown")?.classList.remove("select-dropdown-content-visible");
  }
}
