import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Grupe } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-details-mjesecna-evidencija',
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
  templateUrl: './details-mjesecna-evidencija.component.html',
  styleUrl: './details-mjesecna-evidencija.component.scss'
})
export class DetailsMjesecnaEvidencijaComponent implements OnInit{

  @Output() messageEvent = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public datasource: Grupe,
    public globalVar: GlobalVariablesService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public http: HttpClient,
    private session: SessionService
  ) {}

  public ngOnInit(): void {
  }

  public filterColumn(key:string){
    const excluded=['RN','UKUPANBROJSLOGOVA','IDKORISNIKA','VATBROJVLASNIKA','SIFVLAS','SIF_MTX','SIF_VPX','IDOHH','IODHH','MBRX','OSOBAX','ODHH','DOHH','ISATI','SATI2','SATI_DAN','OPIS_DAN','ISATI2','DATUM_DAN','RNALOG']; // OVE VRIJEDNOSTI NEBUDU BILE PRIKAZANE 
    return !excluded.includes(key); // AKO HOČEŠ PRIKAZATI SVE PROMIJENI U TRUE
  }
}
