import { Injectable } from '@angular/core';

// START: types
export type Language = 'en' | 'hr';
export type TodoStateName = 'Urgent' | 'InProgress' | 'Next' | 'ForLater';
// END: types

// START: enums
export enum CRUDAction {
  Delete,
  Insert,
  Update
}

export interface Konekcija {
  value: string;
  viewValue: string;
}

export enum RightsState {
  Invisible,
  Readonly,
  Editable
}
// END: enums

// START: session user
export interface SessionUser {
  ID?: number;
  displayedUsername?: string;
  username?: string;
  password?: string;
  sessionID: string;
  roleID?: number;
  owner?: string;
  ownerID?: number;
  IDVlasnika?: number;
}

export interface LoginBody {
  action: string;
  method: string;
  data: UserMetadata;
}

export interface Owner { 
  UKUPANBROJSLOGOVA: number;
  RN: number;
  ID_KORISNIKA: string;
  ID_VLASNIKA: string;
  NAZIV_VLASNIKA:string;
  USERNAME: string;
}


export interface LogoutBody {
  action: string;
  method: string;
  data: UserMetadata;
}

export interface UserMetadata {
  pOwner: string;
  pUsername: string;
  pPassword: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserInfoBody {
  action: string;
  method: string;
  sid: string;
  data: UserMetadata;
}
// END: session user

// START: dashboard items
export interface DashboardItem {
  name: string;
  icon: string;
  rowHeight:number;
  rightsState: RightsState;
  items: DashboardSubitem[];
  url: string
}

export interface DashboardSubitem {
  name: string;
  icon: string;
  url: string;
  rightsState: RightsState;

}

export interface DynamicMenu {
  UKUPANBROJSLOGOVA: number;
  RN: number;
  ID: number;
  USERNAME: string;
  MENI: string;
  OPIS_MENI: string;
  DBUSER: string;
  MENUPRIKAZI: boolean;
  IDULOGE: number;
  ULOGA: string;
  DOZVOLEMENU: string;
  UPDMOZE: string;
}

export interface DynamicMenuReference {
  componentName: string;
  componentDatabaseName: string;
  url: string;
}
// END: dashboard items

// START: sidebar items
export interface SidebarItem {
  namePrefix?: string;
  name: string;
  icon?: string | null;
  open: boolean;
  rightsState: RightsState;
  url?: string;
  dialogComponent?: any;
  highlighted: boolean;
  children?: SidebarItem[];
}

export interface SidebarItemState {
  name: string;
  icon?: string | null;
  open: boolean;
  children?: SidebarItem[];
}
// END: sidebar items

// START: components

export interface RegisteredPersonMenu {
  UKUPANBROJSLOGOVA: number;
  RN: number;
  ID: number;
  USERNAME: string;
  MENI: string;
  OPIS_MENI: string;
  DBUSER: string;
  DANE: boolean;
}

export interface RegisteredPersonRole {
  APLIKACIJA: string;
  DANE: boolean;
  ID: number;
  IDULOGE: number;
  ID_APLIKACIJE: number;
  RN: number;
  UKUPANBROJSLOGOVA: number;
  ULOGA: string;
  USERNAME: string;
}

export interface RegisteredPersonOwner {
  UKUPANBROJSLOGOVA: number;
  RN: number;
  LOG_ID: number;
  ID: number;
  IDINOUT: number;
  IDKORISNIKA: number;
  ID_VLASNIKA: number;
  VLASNIK: string;
  NAZIV: string;
  RELACIJA: string;
  SYSADMIN: boolean
}

export interface Menu {
  UKUPANBROJSLOGOVA: number;
  RN: number;
  MENI: string;
  OPIS_MENI: string;
  DBUSER: string;
}

export interface PermissionsDescriptions {
  UKUPANBROJSLOGOVA: number;
  RN: number;
  MENU: string;
  OPIS: string;
  DBUSER: string;
}

export interface Permissions {
  UKUPANBROJSLOGOVA: number;
  RN: number;
  IDULOGE: number;
  ULOGA: string;
  MENU_OPIS: string;
  DBUSER: string;
  MENU: string;
  OPIS: string;
  DANE: boolean;
}

export interface Role {
  ID: number;
  ID_APLIKACIJE: number | null;
  LOG_ID: number;
  NAZIVAPP: string;
  UKUPANBROJSLOGOVA: number;
  ULOGA: string;
}

export interface OwnerW3App {
  UKUPANBROJSLOGOVA: number;
  ID: number;
  LOG_ID: number;
  RN: number;
  NAZIV: string;
  SLIKA: string;
  OPIS: string;
  HOMEPAGE: string;
  SIFVLAS: string;
  EMAIL: string;
  ACTKEY16: string;
}

export interface Application {
  UKUPANBROJSLOGOVA: number;
  RN: number;
  LOG_ID: number;
  ID: number;
  NAZIV: string;
  OPIS: string;
  D7EXE: string;
}

export interface ApplicationName {
  ID: number;
  NAZIV: string;
}

export interface ApplicationW3App {
  ID: number;
  IDINOUT: number;
  LOG_ID: number;
  NAZIV: string;
  UKUPANBROJSLOGOVA: number;
  OPIS: string;
}

export interface RegisteredPerson {
  UKUPANBROJSLOGOVA: number;
  RN: number;
  LOG_ID: number;
  IDKORISNIKA: number;
  ID: number;
  IMEOSOBE: string;
  OPIS: string;
  LOZINKA: string;
  LOZINKANEW: string;
  ACTIVE: string;
  ACTIVE_OPIS: string;
  NAPOMENA: string;
  PITANJE: string;
  ODGOVOR: string;
  EMAIL: string;
  ADRESA: string;
  DATUMUPISA: string;
  IDUPISA: number;
  DATUMPROMJENE: string;
  IDPROMJENE: number;
  SYSADMIN: string;
  LOG_UPISA: string;
  LOG_PROMJENE: string;
}

export interface ApplicationOwner {
  UKUPANBROJSLOGOVA: number;
  RN: number;
  ID_APLIKACIJE: number;
  ID_VLASNIKA: number;
  VLASNIK: string;
  NAZIV: string;
  OPIS: string;
  DANE: boolean;
}

export interface DashboardItems {
  UKUPANBROJSLOGOVA: number;
  RN: number;
  NUMBEROFROLES: string;
  NUMBEROFREGISTEREDPERSONS: string;
  NUMBEROFAPPS: string;
  NUMBEROFOWNERS: string;
  NUMBEROFMENUS: string;
  NUMBEROFPERMISSIONS: string;
}
export interface DashboardItemsLinearChart {
  UKUPANBROJSLOGOVA: number;
  RN: number;
  NUMBEROFROLES: string;
  NUMBEROFREGISTEREDPERSONS: string;
  NUMBEROFAPPS: string;
  NUMBEROFOWNERS: string;
  NUMBEROFMENUS: string;
  NUMBEROFPERMISSIONS: string;
}

// MODELI ZA TABELE

export interface Zaposleni {
  UKUPANBROJSLOGOVA: number;
  RN: number;
  SIFVLAS: string;
  MBR: string;
  PREZIME_IME: string;
  SIF_RM: string;
  NAZ_ZAN: string;
  NAZ_RM: string;
  SIF_OJ: string;
  NAZ_OJ: string;
  IND: string;
}

export interface VrstePosla {
  UKUPANBROJSLOGOVA: number;
  RN: number;
  SIFVLAS: string;
  SIF_VP: string;
  NAZ_VP: string;
  SI: string;
}

export interface OrganizacijskeJedinice {
  UKUPANBROJSLOGOVA: number;
  RN: number;
  SIFVLAS: string,
  SIF_OJ: string,
  NAZ_OJ: string,
  REG_BR: string,
  BOD_PC: string,
  KOEF_PC: string,
  VR_BOD: string,
  VR_KOEF: string,
  PROS_SAT: string,
  PROS_KOEF: string,
  PROS_BOD: string,
  IND1: string,
  SIF_NAD: string,
  BRO_HZZO: string,
  RSOPC: string,
  IDK: string,
  SYSD: string
}


// START: app API
export interface ColumnRef {
  displayedName: string;
  name: string;
}

export interface Filter {
  name: string;
  isInclude: boolean;
  parameter: string;
}
export interface Sorting {
  active: string;
  direction: 'ASC' | 'DESC';
}

// END: app API

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  constructor() { }
}
