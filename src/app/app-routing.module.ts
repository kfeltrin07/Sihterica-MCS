import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dynamic/dashboard/dashboard.component';
import { LoginComponent } from './components/dynamic/login/login.component';
import { SelectionScreenComponent } from './components/dynamic/selection-screen/selection-screen.component';
import { authGuard, noLoginGuard } from './guards/auth/auth.guard';
import { ZaposleniComponent } from './components/dynamic/zaposleni/zaposleni.component';
import { VrstePoslaComponent } from './components/dynamic/vrste-posla/vrste-posla.component';
import { OrganizacijskeJediniceComponent } from './components/dynamic/organizacijske-jedinice/organizacijske-jedinice.component';
import { PregledOperateraComponent } from './components/dynamic/pregled-operatera/pregled-operatera.component';
import { OvlasteneOsobeMjTrComponent } from './components/dynamic/ovlastene-osobe-mj-tr/ovlastene-osobe-mj-tr.component';
import { EvidencijaRadnogVremenaZaglavljeComponent } from './components/dynamic/evidencija-radnog-vremena-zaglavlje/evidencija-radnog-vremena-zaglavlje.component';

const routes: Routes = [

  { path: 'zaposleni', component: ZaposleniComponent, canActivate: [authGuard()] },
  { path: 'vrste-posla', component: VrstePoslaComponent, canActivate: [authGuard()] },
  { path: 'oj', component: OrganizacijskeJediniceComponent, canActivate: [authGuard()] },
  { path: 'operateri', component: PregledOperateraComponent, canActivate: [authGuard()] },
  { path: 'ovlastene-osobe-mj-tr', component: OvlasteneOsobeMjTrComponent, canActivate: [authGuard()] },
  { path: 'evidencija-rad-vrem-zag', component: EvidencijaRadnogVremenaZaglavljeComponent, canActivate: [authGuard()] },


  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard()] },
  { path: 'login', component: LoginComponent, canActivate: [noLoginGuard()] },
  { path: 'selection-screen', component: SelectionScreenComponent, canActivate: [authGuard()] },
  { path: '', redirectTo: '/selection-screen', pathMatch: 'full' },
  { path: '**', redirectTo: '/selection-screen' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
