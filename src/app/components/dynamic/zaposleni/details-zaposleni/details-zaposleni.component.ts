import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Zaposleni } from 'src/app/models/models.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-details-zaposleni',
    imports: [
        MatListModule,
        MatTooltipModule,
        MatButtonModule,
        TranslationPipe,
        CommonModule,
        CdkDrag,
        CdkDragHandle,
    ],
    templateUrl: './details-zaposleni.component.html',
    styleUrl: './details-zaposleni.component.scss'
})
export class DetailsZaposleniComponent implements OnInit{

  @Output() messageEvent = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public datasource: Zaposleni,
    public globalVar: GlobalVariablesService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public http: HttpClient,
    private session: SessionService
  ) {}

  public ngOnInit(): void {
  }

  public filterColumn(key:string){
    let excluded=['RN','UKUPANBROJSLOGOVA','IDKORISNIKA','VATBROJVLASNIKA','SIFVLAS']; // OVE VRIJEDNOSTI NEBUDU BILE PRIKAZANE 
    for(let item of excluded){
      if(item==key){
        return false; // AKO HOČEŠ PRIKAZATI SVE PROMIJENI U TRUE
      }
    }
    return true;
  }
}
