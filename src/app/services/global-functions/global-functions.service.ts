import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Language, SidebarItem, RightsState } from 'src/app/models/models.service';
import { CookiesService } from '../cookies/cookies.service';
import { GlobalVariablesService } from '../global-variables/global-variables.service';
import { TranslationService } from '../translation/translation.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GlobalFunctionsService {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private t: TranslationService,
    private globalVar: GlobalVariablesService,
    private cookies: CookiesService,
    public translator:TranslationService
  ) { }

  public paginatorLabels(paginator:MatPaginator):void{
    paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      if( this.globalVar.VrstaUredaja==false){
        paginator._intl.itemsPerPageLabel = this.translator.translate('NumberOfRecordsPerPage');
        return `${this.translator.translate('RecordsBeingDisplayed')} ${start} - ${end} ${this.translator.translate('of')} ${length}`;

      }
      else{
        paginator._intl.itemsPerPageLabel = this.translator.translate('MaxSlogova');
        return `${start} - ${end} ${this.translator.translate('of')} ${length}`;
      }
    };
    paginator._intl.firstPageLabel = this.translator.translate('FirstPage');
    paginator._intl.lastPageLabel = this.translator.translate('LastPage');
    paginator._intl.nextPageLabel = this.translator.translate('NextPage');
    paginator._intl.previousPageLabel = this.translator.translate('PreviousPage');
  }

  public goToRoute(route: string) {
    this.router.navigateByUrl(route);
  }

  public openSnackBar(message: string, action: string): void {
    if(message==""){
      var duration=3000;
    }
    else{
      var duration = message.length * 1000
    }
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  public showSnackbarError(errorDesc: string) {
    if (errorDesc != 'SQL:OK') {
      this.openSnackBar(errorDesc, this.t.translate('Okay'));
    }
  }

  public changeLanguage(language: Language) {
    this.globalVar.selectedLanguage = language;
    this.cookies.setCookie('selected-language', this.globalVar.selectedLanguage);
    window.location.reload();
  }

  public getMonthNameFromNumber(monthNumber: number): string {
    switch (monthNumber) {
      case 1: return 'JAN';
      case 2: return 'FEB';
      case 3: return 'MAR';
      case 4: return 'APR';
      case 5: return 'MAY';
      case 6: return 'JUN';
      case 7: return 'JUL';
      case 8: return 'AUG';
      case 9: return 'SEP';
      case 10: return 'OCT';
      case 11: return 'NOV';
      default: return 'DEC';
    }
  }

  public checkValidity(value: any): boolean {
    if (value) {
      if (value.toString().trim() != '') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public deleteNonNumericCharacters(number: any): string {
    let allowedChars: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];
    let newvalue: string = '';
    let commaNoticed: boolean = false;
    number.replace('.', ',');
    if (number.length > 0) {
      if (number[0] == ',') {
        number = '0' + number;
      }
    }
    for (let i = 0; i < number.length; i++) {
      if (allowedChars.includes(number[i]) && !(commaNoticed && number[i] == ',')) {
        newvalue += number[i];
      }
      if (number[i] == ',') commaNoticed = true;
    }
    let numericValue = +newvalue.replace(',', '.');
    number = numericValue;
    return number;
  }

  public formatNumber(number: any): string {
    number = number.replace('.', ',');
    for (let i = 0; number.substring(0, 1) == '0' && number.substring(0, 2) != '0,' && number.length > 1; i++) {
      number = number.substring(1, number.length);
    }
    let numericValue: number = +number.replace(',', '.');
    let isCommaLast: boolean = false;
    if (number.substring(number.length - 2, number.length - 1) == ',') {
      isCommaLast = true;
    }
    if (Math.floor(numericValue) == numericValue && !number.includes(',')) {
      if (isCommaLast) {
        number += '00';
      } else {
        number += ',00';
      }
    } else if (Math.floor(numericValue * 10) == numericValue * 10 && number.indexOf(',') == number.length - 2) {
      number += '0';
    } else if (Math.floor(numericValue * 10) == numericValue * 10 && number.indexOf(',') == number.length - 1) {
      number += '00';
    }
    if (number.indexOf(',') < number.length - 2) {
      number = number.substring(0, number.indexOf(',') + 3);
    }
    if (number.substring(0, 1) == ",") {
      number = "0" + number;
    }
    return number.replace(',','.');
  }


  public formatCurrency(value: string): string {
    let initialValue: string = value;
    let newValue: string = value;
    let dotCount: number = 0;
    for (let i = value.length; i > 0; i--) {
      if ((initialValue.length - i - 2) % 3 === 1 && i + 4 < value.length) {
        dotCount++;
        newValue = newValue.substring(0, i) + "." + newValue.substring(i, value.length + dotCount);
      }
    }
    return newValue;
  }

  public removePercent(value: string): string {
    let newValue: string = value;
    newValue = value.replace('%', '')
    return newValue
  }

  public getDBComponentNameFromUrl(url: string | undefined): string {
    if (url) {
      for (let i = 0; i < this.globalVar.dynamicMenuReferences.length; i++) {
        if (this.globalVar.dynamicMenuReferences[i].url == url) {
          return this.globalVar.dynamicMenuReferences[i].componentDatabaseName;
        }
      }
    }
    return '';
  }

  public filterSidebarItems(sidebarItems: SidebarItem[]): SidebarItem[] {

    // START: setting all component rights states

    for (let i = 0; i < sidebarItems.length; i++) {

      //console.log(this.globalVar.dynamicMenu)
      for (let ii = 0; ii < this.globalVar.dynamicMenu.length; ii++) {
        if (this.globalVar.dynamicMenu[ii].DOZVOLEMENU == this.getDBComponentNameFromUrl(sidebarItems[i].url)
          || this.globalVar.dynamicMenu[ii].DOZVOLEMENU == this.getDBComponentNameFromUrl(sidebarItems[i].url) + 'Upd') {
          sidebarItems[i].rightsState = RightsState.Readonly;
          if (this.globalVar.dynamicMenu[ii].DOZVOLEMENU == this.getDBComponentNameFromUrl(sidebarItems[i].url) + 'Upd'
            || this.globalVar.dynamicMenu[ii].UPDMOZE == 'true') {
            sidebarItems[i].rightsState = RightsState.Editable;
          }
        }
      }

      if (sidebarItems[i].children != null) {
        for (let j = 0; j < sidebarItems[i].children!.length; j++) {

          for (let jj = 0; jj < this.globalVar.dynamicMenu.length; jj++) {
            if (this.globalVar.dynamicMenu[jj].DOZVOLEMENU == this.getDBComponentNameFromUrl(sidebarItems[i].children![j].url)
              || this.globalVar.dynamicMenu[jj].DOZVOLEMENU == this.getDBComponentNameFromUrl(sidebarItems[i].children![j].url) + 'Upd') {
              sidebarItems[i].children![j].rightsState = RightsState.Readonly;
              sidebarItems[i].rightsState = RightsState.Readonly;
              //console.log(this.globalVar.dynamicMenu[jj].UPDMOZE)
              if (this.globalVar.dynamicMenu[jj].DOZVOLEMENU == this.getDBComponentNameFromUrl(sidebarItems[i].children![j].url) + 'Upd'
                || this.globalVar.dynamicMenu[jj].UPDMOZE == 'true') {
                sidebarItems[i].children![j].rightsState = RightsState.Editable;
                //console.log('editable')
              }
            }
          }

          if (sidebarItems[i].children![j].children != null) {
            for (let k = 0; k < sidebarItems[i].children![j].children!.length; k++) {

              for (let kk = 0; kk < this.globalVar.dynamicMenu.length; kk++) {
                if (this.globalVar.dynamicMenu[kk].DOZVOLEMENU == this.getDBComponentNameFromUrl(sidebarItems[i].children![j].children![k].url)
                  || this.globalVar.dynamicMenu[kk].DOZVOLEMENU == this.getDBComponentNameFromUrl(sidebarItems[i].children![j].children![k].url) + 'Upd') {
                  sidebarItems[i].children![j].children![k].rightsState = RightsState.Readonly;
                  sidebarItems[i].children![j].rightsState = RightsState.Readonly;
                  sidebarItems[i].rightsState = RightsState.Readonly;
                  if (this.globalVar.dynamicMenu[kk].DOZVOLEMENU == this.getDBComponentNameFromUrl(sidebarItems[i].children![j].children![k].url) + 'Upd'
                    || this.globalVar.dynamicMenu[kk].UPDMOZE == 'true') {
                    sidebarItems[i].children![j].children![k].rightsState = RightsState.Editable;
                    //console.log('editable')
                  }
                }
              }

              if (sidebarItems[i].children![j].children![k].children != null) {
                for (let l = 0; l < sidebarItems[i].children![j].children![k].children!.length; l++) {

                  for (let ll = 0; ll < this.globalVar.dynamicMenu.length; ll++) {
                    if (this.globalVar.dynamicMenu[ll].DOZVOLEMENU == this.getDBComponentNameFromUrl(sidebarItems[i].children![j].children![k].children![l].url)
                      || this.globalVar.dynamicMenu[ll].DOZVOLEMENU == this.getDBComponentNameFromUrl(sidebarItems[i].children![j].children![k].children![l].url) + 'Upd') {
                      sidebarItems[i].children![j].children![k].children![l].rightsState = RightsState.Readonly;
                      sidebarItems[i].children![j].children![k].rightsState = RightsState.Readonly;
                      sidebarItems[i].children![j].rightsState = RightsState.Readonly;
                      sidebarItems[i].rightsState = RightsState.Readonly;
                      if (this.globalVar.dynamicMenu[ll].DOZVOLEMENU == this.getDBComponentNameFromUrl(sidebarItems[i].children![j].children![k].children![l].url) + 'Upd'
                        || this.globalVar.dynamicMenu[ll].UPDMOZE == 'true') {
                        sidebarItems[i].children![j].children![k].children![l].rightsState = RightsState.Editable;
                        //console.log('editable')
                      }
                    }
                  }

                }
              }

            }
          }

        }
      }

    }

    return sidebarItems;

    // END: setting all component rights states

  }


  public getComponentFromUrl(url: string): SidebarItem | null {
    for (let i = 0; i < this.globalVar.sidebarItems.length; i++) {
      if (this.globalVar.sidebarItems[i].url == url) return this.globalVar.sidebarItems[i];
      if (this.globalVar.sidebarItems[i].children != null) {
        for (let j = 0; j < this.globalVar.sidebarItems[i].children!.length; j++) {
          if (this.globalVar.sidebarItems[i].children![j].url == url) return this.globalVar.sidebarItems[i].children![j];
          if (this.globalVar.sidebarItems[i].children![j].children != null) {
            for (let k = 0; k < this.globalVar.sidebarItems[i].children![j].children!.length; k++) {
              if (this.globalVar.sidebarItems[i].children![j].children![k].url == url) return this.globalVar.sidebarItems[i].children![j].children![k];
            }
          }
        }
      }
    }
    return null;
  }

  public resetSidebarItems(sidebarItems: SidebarItem[]): SidebarItem[] {

    // START: resetting all component rights states

    for (let i = 0; i < sidebarItems.length; i++) {

      for (let ii = 0; ii < this.globalVar.dynamicMenu.length; ii++) {
        sidebarItems[i].rightsState = RightsState.Invisible;
      }

      if (sidebarItems[i].children != null) {
        for (let j = 0; j < sidebarItems[i].children!.length; j++) {

          for (let jj = 0; jj < this.globalVar.dynamicMenu.length; jj++) {
            sidebarItems[i].children![j].rightsState = RightsState.Invisible;
          }

          if (sidebarItems[i].children![j].children != null) {
            for (let k = 0; k < sidebarItems[i].children![j].children!.length; k++) {

              for (let kk = 0; kk < this.globalVar.dynamicMenu.length; kk++) {
                sidebarItems[i].children![j].children![k].rightsState = RightsState.Invisible;
              }

              if (sidebarItems[i].children![j].children![k].children != null) {
                for (let l = 0; l < sidebarItems[i].children![j].children![k].children!.length; l++) {

                  for (let ll = 0; ll < this.globalVar.dynamicMenu.length; ll++) {
                    sidebarItems[i].children![j].children![k].children![l].rightsState = RightsState.Invisible;
                  }

                }
              }

            }
          }

        }
      }

    }

    return sidebarItems;

    // END: resetting all component rights states

  }

  public conditionalZeroPrefix(value: number): string {
    if (value < 10) {
      return '0' + value.toString();
    } else {
      return value.toString();
    }
  }
  
  public formatDate(date: string): string {
    let day: number = +date.substring(8, 10);
    let month: number = +date.substring(5, 7);
    let year: number = +date.substring(0, 4);
    return this.conditionalZeroPrefix(day) + '.' + this.conditionalZeroPrefix(month) + '.' + year.toString();
  }
}
