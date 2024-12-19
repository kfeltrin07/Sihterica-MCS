import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainContentComponent } from './components/base-layout/main-content/main-content.component';
import { SidenavComponent } from './components/base-layout/sidenav/sidenav.component';
import { ToolbarComponent } from './components/base-layout/toolbar/toolbar.component';
import { LoadingComponent } from './components/elements/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    SidenavComponent,
    ToolbarComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
