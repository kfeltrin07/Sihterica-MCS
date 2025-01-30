import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dynamic/dashboard/dashboard.component';
import { LoginComponent } from './components/dynamic/login/login.component';
import { SelectionScreenComponent } from './components/dynamic/selection-screen/selection-screen.component';
import { authGuard, noLoginGuard, roleGuard } from './guards/auth/auth.guard';
import { ZaposleniComponent } from './components/dynamic/zaposleni/zaposleni.component';
import { VrstePoslaComponent } from './components/dynamic/vrste-posla/vrste-posla.component';
import { OrganizacijskeJediniceComponent } from './components/dynamic/organizacijske-jedinice/organizacijske-jedinice.component';
import { PregledOperateraComponent } from './components/dynamic/pregled-operatera/pregled-operatera.component';
import { OvlasteneOsobeMjTrComponent } from './components/dynamic/ovlastene-osobe-mj-tr/ovlastene-osobe-mj-tr.component';
import { EvidencijaRadnogVremenaZaglavljeComponent } from './components/dynamic/evidencija-radnog-vremena-zaglavlje/evidencija-radnog-vremena-zaglavlje.component';
import { EvidencijaRadnogVremenaZaglavljeVezeComponent } from './components/dynamic/evidencija-radnog-vremena-zaglavlje-veze/evidencija-radnog-vremena-zaglavlje-veze.component';
import { EvidencijaRadnogVremenaRadnikaComponent } from './components/dynamic/evidencija-radnog-vremena-radnika/evidencija-radnog-vremena-radnika.component';
import { EvidencijaRadnogVremenaComponent } from './components/dynamic/evidencija-radnog-vremena/evidencija-radnog-vremena.component';
import { KontrolaFondaSatiComponent } from './components/dynamic/kontrola-fonda-sati/kontrola-fonda-sati.component';
import { PomocneListeComponent } from './components/dynamic/pomocne-liste/pomocne-liste.component';
import { ShemeComponent } from './components/dynamic/sheme/sheme.component';
import { GrupeComponent } from './components/dynamic/grupe/grupe.component';
import { GrupniUnosComponent } from './components/dynamic/grupni-unos/grupni-unos.component';
import { MjesecnaEvidencijaComponent } from './components/dynamic/mjesecna-evidencija/mjesecna-evidencija.component';
import { DnevnaEvidencijaComponent } from './components/dynamic/dnevna-evidencija/dnevna-evidencija.component';

const routes: Routes = [

  { path: 'zaposleni', component: ZaposleniComponent, canActivate: [authGuard()] },
  { path: 'vrste-posla', component: VrstePoslaComponent, canActivate: [authGuard()] },
  { path: 'oj', component: OrganizacijskeJediniceComponent, canActivate: [authGuard()] },
  { path: 'operateri', component: PregledOperateraComponent, canActivate: [authGuard(),roleGuard()] },
  { path: 'ovlastene-osobe-mj-tr', component: OvlasteneOsobeMjTrComponent, canActivate: [authGuard(),roleGuard()] },
  { path: 'evidencija-rad-vrem-zag', component: EvidencijaRadnogVremenaZaglavljeComponent, canActivate: [authGuard(),roleGuard()] },
  { path: 'evidencija-rad-vrem-zag-veze', component: EvidencijaRadnogVremenaZaglavljeVezeComponent, canActivate: [authGuard(),roleGuard()] },
  { path: 'evidencija-rad-vrem-rad', component: EvidencijaRadnogVremenaRadnikaComponent, canActivate: [authGuard()] },
  { path: 'evidencija-rad-vrem', component: EvidencijaRadnogVremenaComponent, canActivate: [authGuard()] },
  { path: 'fond-sati', component: KontrolaFondaSatiComponent, canActivate: [authGuard()] },
  { path: 'pomocne-liste', component: PomocneListeComponent, canActivate: [authGuard()] },
  { path: 'sheme', component: ShemeComponent, canActivate: [authGuard()] },
  { path: 'grupe', component: GrupeComponent, canActivate: [authGuard()] },
  { path: 'grupni-unos', component: GrupniUnosComponent, canActivate: [authGuard()] },
  { path: 'mjesecna-evidencija', component: MjesecnaEvidencijaComponent, canActivate: [authGuard()] },
  { path: 'mjesecna-evidencija/:data', component: MjesecnaEvidencijaComponent, canActivate: [authGuard()] },

  { path: 'dnevna-evidencija', component: DnevnaEvidencijaComponent, canActivate: [authGuard()] },
  { path: 'dnevna-evidencija/:data', component: DnevnaEvidencijaComponent, canActivate: [authGuard()] },

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
