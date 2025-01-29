import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies/cookies.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions/global-functions.service';
import { GlobalVariablesService } from 'src/app/services/global-variables/global-variables.service';
import { SessionService } from 'src/app/services/session/session.service';

export function authGuard(): CanActivateFn {

  return (): boolean => {
    const session: SessionService = inject(SessionService);
    const cookies: CookiesService = inject(CookiesService);
    const globalFn: GlobalFunctionsService = inject(GlobalFunctionsService);
    const globalVar: GlobalVariablesService = inject(GlobalVariablesService);

    cookies.getCookie('logged-in-user-session-id')

    if (cookies.getCookie('logged-in-user-session-id') != '' || !globalVar.environment.isLoginRequired) {
      return true;
    }
    globalFn.goToRoute('/login');
    return false;
  };

}

export function roleGuard(): CanActivateFn {

  return (): boolean => {
    const session: SessionService = inject(SessionService);
    const cookies: CookiesService = inject(CookiesService);
    const globalFn: GlobalFunctionsService = inject(GlobalFunctionsService);
    const globalVar: GlobalVariablesService = inject(GlobalVariablesService);

    cookies.getCookie('ULOGA')

    if (cookies.getCookie('ULOGA') == '0' || !globalVar.environment.isLoginRequired) {
      return true;
    }
    globalFn.goToRoute('/selection-screen');
    return false;
  };

}

export function noLoginGuard(): CanActivateFn {

  return (): boolean => {
    const session: SessionService = inject(SessionService);
    const cookies: CookiesService = inject(CookiesService);
    const globalFn: GlobalFunctionsService = inject(GlobalFunctionsService);

    if (cookies.getCookie('logged-in-user-session-id') == '') {
      return true;
    }
    globalFn.goToRoute('/dashboard');
    return false;
  };

}
