import { CommonModule, Location } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SidebarItem, RightsState } from 'src/app/models/models.service';
import { TranslationPipe } from 'src/app/pipes/translation/translation.pipe';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { MainContentComponent } from "../main-content/main-content.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatTooltipModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,

    FormsModule,
    TranslationPipe,
    CommonModule,
    MainContentComponent
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, AfterViewInit {
  @ViewChild('snav') public sidenav!: MatSidenav;
  @ViewChild('spanelement') public spanelement!: ElementRef;

  public sidebarItemsState: SidebarItem[] = [];

  constructor(
    public session: SessionService,
    public globalVar: GlobalVariablesService,
    public globalFn: GlobalFunctionsService,
    public router: Router,
    public dialog: MatDialog,
    public sidenavService: SidenavService,
    public deviceService: DeviceDetectorService,
    public location: Location
  ) {
    this.sidenavMode();
    router.events.subscribe((url) => this.updateHighlightedLink());

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.openSidebarItems(this.sidebarItemsState);
      }
    });
  }

  public ngOnInit(): void {
    this.sidebarItemsState = this.globalVar.sidebarItems;
    this.filterSidebarItems();
    this.openSidebarItems(this.sidebarItemsState);
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  public sidenavMode() {
    if (this.deviceService.isDesktop()) {
      // false for computer
      // false znači da je u pitanju računalo
      this.globalVar.VrstaUredaja = false;

    } else {
      // true for mobile device
      // true znači da je u pitanju mobitel
      this.globalVar.VrstaUredaja = true;
    }
  }

  private openSidebarItems(items: any[]): void {
    for (let item of items) {
      if (item.url === this.location.path() || item.url === window.location.pathname.split(';')[0]) {
        item.open = true;
        item.highlighted = true;
        return;
      }
      if (item.children) {
        this.openSidebarItems(item.children);
        if (item.children.some((child: any) => child.open)) {
          item.open = true;
          item.highlighted = true;
        }
      }
    }
  }

  public toggleSidebarItemOpen(sidebarItem: SidebarItem): void {
    sidebarItem.open = !sidebarItem.open;
  }

  public collapseAll(): void {
    for (let i = 0; i < this.sidebarItemsState.length; i++) {
      this.sidebarItemsState[i].open = false;

      if (this.sidebarItemsState[i].children) {
        for (let j = 0; j < this.sidebarItemsState[i].children!.length; j++) {
          this.sidebarItemsState[i].children![j].open = false;

          if (this.sidebarItemsState[i].children![j].children) {
            for (let k = 0; k < this.sidebarItemsState[i].children![j].children!.length; k++) {
              this.sidebarItemsState[i].children![j].children![k].open = false;
            }
          }

        }
      }

    }
  }

  public expandAll(): void {
    for (let i = 0; i < this.sidebarItemsState.length; i++) {
      this.sidebarItemsState[i].open = true;

      if (this.sidebarItemsState[i].children) {
        for (let j = 0; j < this.sidebarItemsState[i].children!.length; j++) {
          this.sidebarItemsState[i].children![j].open = true;

          if (this.sidebarItemsState[i].children![j].children) {
            for (let k = 0; k < this.sidebarItemsState[i].children![j].children!.length; k++) {
              this.sidebarItemsState[i].children![j].children![k].open = true;
            }
          }

        }
      }

    }
  }

  public goToRoute(sidebarItem: SidebarItem): void {
    if (sidebarItem.url && !(!sidebarItem.open && sidebarItem.children)) {
      if (!sidebarItem.dialogComponent) {
        this.router.navigate([sidebarItem.url]);
        if (this.globalVar.VrstaUredaja) {
          this.sidenav.close();
        }
      }
    }
    else if (sidebarItem.dialogComponent) {
      const dialogRef = this.dialog.open(sidebarItem.dialogComponent, {});
      dialogRef.afterClosed().subscribe((result: any) => { });
    }
  }

  public updateHighlightedLink(): void {

    for (let i = 0; i < this.globalVar.sidebarItems.length; i++) {
      this.globalVar.sidebarItems[i].highlighted = false;
      if (this.globalVar.sidebarItems[i].children != null) {
        for (let j = 0; j < this.globalVar.sidebarItems[i].children!.length; j++) {
          this.globalVar.sidebarItems[i].children![j].highlighted = false;
          if (this.globalVar.sidebarItems[i].children![j].children != null) {
            for (let k = 0; k < this.globalVar.sidebarItems[i].children![j].children!.length; k++) {
              this.globalVar.sidebarItems[i].children![j].children![k].highlighted = false;
            }
          }
        }
      }
    }

    for (let i = 0; i < this.globalVar.sidebarItems.length; i++) {
      if (this.globalVar.sidebarItems[i].url == this.router.url  || this.globalVar.sidebarItems[i].url === window.location.pathname.split(';')[0]) {
        this.globalVar.sidebarItems[i].highlighted = true;
      }
      if (this.globalVar.sidebarItems[i].children != null) {
        for (let j = 0; j < this.globalVar.sidebarItems[i].children!.length; j++) {
          if (this.globalVar.sidebarItems[i].children![j].url == this.router.url || this.globalVar.sidebarItems[i].children![j].url === window.location.pathname.split(';')[0]) {
            this.globalVar.sidebarItems[i].highlighted = true;
            this.globalVar.sidebarItems[i].children![j].highlighted = true;
          }
          if (this.globalVar.sidebarItems[i].children![j].children != null) {
            for (let k = 0; k < this.globalVar.sidebarItems[i].children![j].children!.length; k++) {
              if (this.globalVar.sidebarItems[i].children![j].url == this.router.url || this.globalVar.sidebarItems[i].children![j].url  === window.location.pathname.split(';')[0]) {
                this.globalVar.sidebarItems[i].highlighted = true;
                this.globalVar.sidebarItems[i].children![j].highlighted = true;
                this.globalVar.sidebarItems[i].children![j].children![k].highlighted = true;
              }
            }
          }
        }
      }
    }

  }

  public filterSidebarItems(): void {

    // START: settings all component rights states

    //console.log(this.globalVar.dynamicMenu)
    for (let i = 0; i < this.globalVar.sidebarItems.length; i++) {

      for (let ii = 0; ii < this.globalVar.dynamicMenu?.length; ii++) {
        if (this.globalVar.dynamicMenu[ii].DOZVOLEMENU == this.globalFn.getDBComponentNameFromUrl(this.globalVar.sidebarItems[i].name)) {
          this.globalVar.sidebarItems[i].rightsState = RightsState.Readonly;
          if (this.globalVar.dynamicMenu[ii].DOZVOLEMENU == this.globalFn.getDBComponentNameFromUrl(this.globalVar.sidebarItems[i].name) + 'Upd') {
            this.globalVar.sidebarItems[i].rightsState = RightsState.Editable;
          }
        }
      }

      if (this.globalVar.sidebarItems[i].children != null) {
        for (let j = 0; j < this.globalVar.sidebarItems[i].children!.length; j++) {

          for (let jj = 0; jj < this.globalVar.dynamicMenu?.length; jj++) {
            if (this.globalVar.dynamicMenu[jj].DOZVOLEMENU == this.globalFn.getDBComponentNameFromUrl(this.globalVar.sidebarItems[i].children![j].name)) {
              this.globalVar.sidebarItems[i].children![j].rightsState = RightsState.Readonly;
              if (this.globalVar.dynamicMenu[jj].DOZVOLEMENU == this.globalFn.getDBComponentNameFromUrl(this.globalVar.sidebarItems[i].children![j].name) + 'Upd') {
                this.globalVar.sidebarItems[i].children![j].rightsState = RightsState.Editable;
              }
            }
          }

          if (this.globalVar.sidebarItems[i].children![j].children != null) {
            for (let k = 0; k < this.globalVar.sidebarItems[i].children![j].children!.length; k++) {

              for (let kk = 0; kk < this.globalVar.dynamicMenu?.length; kk++) {
                if (this.globalVar.dynamicMenu[kk].DOZVOLEMENU == this.globalFn.getDBComponentNameFromUrl(this.globalVar.sidebarItems[i].children![j].children![k].name)) {
                  this.globalVar.sidebarItems[i].children![j].children![k].rightsState = RightsState.Readonly;
                  if (this.globalVar.dynamicMenu[kk].DOZVOLEMENU == this.globalFn.getDBComponentNameFromUrl(this.globalVar.sidebarItems[i].children![j].children![k].name) + 'Upd') {
                    this.globalVar.sidebarItems[i].children![j].children![k].rightsState = RightsState.Editable;
                  }
                }
              }

              if (this.globalVar.sidebarItems[i].children![j].children![k].children != null) {
                for (let l = 0; l < this.globalVar.sidebarItems[i].children![j].children![k].children!.length; l++) {

                  for (let ll = 0; ll < this.globalVar.dynamicMenu?.length; ll++) {
                    if (this.globalVar.dynamicMenu[ll].DOZVOLEMENU == this.globalFn.getDBComponentNameFromUrl(this.globalVar.sidebarItems[i].children![j].children![k].children![l].name)) {
                      this.globalVar.sidebarItems[i].children![j].children![k].children![l].rightsState = RightsState.Readonly;
                      if (this.globalVar.dynamicMenu[ll].DOZVOLEMENU == this.globalFn.getDBComponentNameFromUrl(this.globalVar.sidebarItems[i].children![j].children![k].children![l].name) + 'Upd') {
                        this.globalVar.sidebarItems[i].children![j].children![k].children![l].rightsState = RightsState.Editable;
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

    // END: settings all component rights states

  }
}
