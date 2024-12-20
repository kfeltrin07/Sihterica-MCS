import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OvlastenaOsobaMjTr } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-details-ovlastene-osobe-mj-tr',
  standalone: true,
  imports: [
    MatListModule,
    MatTooltipModule,
    MatButtonModule,

    TranslationPipe,
    CommonModule,
    CdkDrag,
    CdkDragHandle,
  ],
  templateUrl: './details-ovlastene-osobe-mj-tr.component.html',
  styleUrl: './details-ovlastene-osobe-mj-tr.component.scss'
})
export class DetailsOvlasteneOsobeMjTrComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public datasource: OvlastenaOsobaMjTr,
    public globalVar: GlobalVariablesService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public http: HttpClient,
    private session: SessionService
  ) { }

  public ngOnInit(): void {
  }

  public filterColumn(key: string) {
    let excluded = ['RN', 'UKUPANBROJSLOGOVA', 'IDKORISNIKA', 'VATBROJVLASNIKA', 'SIFVLAS']; // OVE VRIJEDNOSTI NEBUDU BILE PRIKAZANE 
    for (let item of excluded) {
      if (item == key) {
        return false; // AKO HOČEŠ PRIKAZATI SVE PROMIJENI U TRUE
      }
    }
    return true;
  }
}
