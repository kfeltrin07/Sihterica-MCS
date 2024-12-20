import { Pipe, PipeTransform } from '@angular/core';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Pipe({
  name: 'translate',
  standalone: true
})
export class TranslationPipe implements PipeTransform {

  constructor(
    private globalVar: GlobalVariablesService,
    private t: TranslationService
  ) {}

  transform(
    //value: keyof typeof this.t.translationBase.translation
    value: string
  ): string {
    if (this.t.getTranslationByValue(value).length == 0) {
      return value;
    } else {
      return this.t.getTranslationByValue(value)[0][this.globalVar.selectedLanguage];
    }

  }
}
