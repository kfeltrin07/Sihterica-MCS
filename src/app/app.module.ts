import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainContentComponent } from './components/base-layout/main-content/main-content.component';
import { SidenavComponent } from './components/base-layout/sidenav/sidenav.component';
import { ToolbarComponent } from './components/base-layout/toolbar/toolbar.component';
import { LoadingComponent } from './components/elements/loading/loading.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoggingInterceptor } from './services/intercept/logging.interceptor';
import { ErrorInterceptor } from './services/intercept/error.interceptor';
import { LoadingInterceptor } from './services/intercept/loading.interceptor';
import { SidenavService } from './services/sidenav/sidenav.service';
import { TranslationPipe } from './pipes/translation/translation.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    CommonModule,
    LoadingComponent,
    AppRoutingModule,
    MainContentComponent,
    SidenavComponent,
    ToolbarComponent,
    TranslationPipe,
    
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    SidenavService,
    { provide: LOCALE_ID, useValue: 'hr-HR' },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
