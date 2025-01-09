import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { registerLocaleData } from '@angular/common';
import localeHr from '@angular/common/locales/hr';
registerLocaleData(localeHr,'hr');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
