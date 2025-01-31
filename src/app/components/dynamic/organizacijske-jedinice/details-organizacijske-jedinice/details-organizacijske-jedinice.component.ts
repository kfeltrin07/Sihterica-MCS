import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OrganizacijskeJedinice } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-details-organizacijske-jedinice',
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
  templateUrl: './details-organizacijske-jedinice.component.html',
  styleUrl: './details-organizacijske-jedinice.component.scss'
})
export class DetailsOrganizacijskeJediniceComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public datasource: OrganizacijskeJedinice,
    public globalVar: GlobalVariablesService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public http: HttpClient,
    private session: SessionService
  ) { }

  public ngOnInit(): void {
  }

  public filterColumn(key: string) {
    let excluded = [    'UKUPANBROJSLOGOVA',
      'RN',
      'REG_BR',
      'BOD_PC',
      'KOEF_PC',
      'VR_BOD',
      'VR_KOEF',
      'PROS_SAT',
      'PROS_KOEF',
      'PROS_BOD',
      'IND1',
      'SIF_NAD',
      'BRO_HZZO',
      'RSOPC',
      'IDK',
      'SYSD']; // OVE VRIJEDNOSTI NEBUDU BILE PRIKAZANE 
    for (let item of excluded) {
      if (item == key) {
        return false; // AKO HOČEŠ PRIKAZATI SVE PROMIJENI U TRUE
      }
    }
    return true;
  }
}
