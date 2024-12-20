import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { delay } from 'rxjs';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-loading',
  standalone:true,
  imports:[
    TranslationPipe,
    CommonModule
  ],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  loading: boolean = false;

  constructor(
    private _loading: LoadingService,
    private globalVar:GlobalVariablesService,
  ){ }

  ngOnInit() {
    this.listenToLoading();
  }

  /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */
  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading:any) => {
          this.loading = loading;
          //console.log(loading);
      });
  }
}
