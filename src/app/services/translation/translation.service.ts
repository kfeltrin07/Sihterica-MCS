import { Injectable } from '@angular/core';
import { GlobalVariablesService } from '../global-variables/global-variables.service';
import TranslationData from 'src/app/services/translation/translation.json';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  // trenutno se ovdje popisuju svi prevoditeljski slogovi (varijabla translationBase); u produkciji to treba dohvatiti sa servera tokom pokretanja aplikacije

  public translationBase = TranslationData;
  //public translationBase: any;

  constructor(
    private globalVar: GlobalVariablesService
  ) {}

  public getTranslationByValue(value: string): any[] {

    if (this.translationBase != null) {
      return this.translationBase.translation.filter(
        function (data: any) {
          return data.ref == value
        }
      );
    } else {
      return [];
    }

  }

  public translate(key: string): string {
    if (this.getTranslationByValue(key).length == 0) {
      return key;
    } else {
      return this.getTranslationByValue(key)[0][this.globalVar.selectedLanguage];
    }
  }
}
