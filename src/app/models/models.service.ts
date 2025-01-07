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

export interface EvRadnogVremenaHelpRadnici {
  UKUPANBROJSLOGOVA: number;
  RN: number;
  MBR: string;
  PREZIME_IME: string;
  OSOBA: string;
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
  SIFVLAS: string;
  SIF_OJ: string;
  NAZ_OJ: string;
  REG_BR: string;
  BOD_PC: string;
  KOEF_PC: string;
  VR_BOD: string;
  VR_KOEF: string;
  PROS_SAT: string;
  PROS_KOEF: string;
  PROS_BOD: string;
  IND1: string;
  SIF_NAD: string;
  BRO_HZZO: string;
  RSOPC: string;
  IDK: string;
  SYSD: string
}

export interface Operateri {
  UKUPANBROJSLOGOVA: number;
  RN: number;
  ID: string;
  NAZIV: string;
  USERNAME: string;
  PASSWORD: string;
  NAPOMENA: string;
  IDULOGE: string;
  ULOGA: string;
}

export interface OvlastenaOsobaMjTr {
  UKUPANBROJSLOGOVA: number;
  RN: number;
  ID: string;
  NAZIV: string;
  USERNAME: string;
  SIFMJTR: string;
  NAZMJTR: string;
  OD:string;
  DO:string;
  SATI:string;
}

export interface EvidencijaRadVreZag{
  UKUPANBROJSLOGOVA: number;
  RN: number;
  RID: string;
  SIF_STUPCA: string;
  RBROJ: string;
  KNAZIV: string;
  OPIS: string;
  VRSTA_SLOGA: string;
  OPISVRSTE: string;
}

export interface OpisVrste{
  UKUPANBROJSLOGOVA: number;
  RN: number;
  SIF_VLAS: string;
  SIFRA: string;
  OPIS: string;
}

export interface EvidencijaRadVreZagVeze{
  UKUPANBROJSLOGOVA: number;
  RN: number;
  RID: string;
  SIF_STUPCA: string;
  SIF_VP: string;
  KNAZIV: string;
  OPIS: string;
  NAZ_VP: string;
  SI: string;
  XFAKTOR: string;
  SIF_VLAS: string;
}

export interface EvidVezeSifra{
  UKUPANBROJSLOGOVA: number;
  RN: number;
  SIF_STUPCA: string;
  KNAZIV: string;
}

export interface EvidVezeIzracuna{
  UKUPANBROJSLOGOVA: number;
  RN: number;
  SIF_VLAS: string;
  SIFRA: string;
  OPIS: string;
}

export interface EvidencijaRadVreRad{
  UKUPANBROJSLOGOVA: number;
  RN: number;
  SIFRANAZIV: string;
  SIF_MT: string;
  NAZIV_MT: string;
  REDAK: string;
  VRSTA: string;
  POCETAK: string;
  ZAVRSETAK: string;
  SATI_1: string;
  SATI_2: string;
  SATI_3: string;
  SATI_4: string;
  SATI_5: string;
  SATI_6: string;
  SATI_7: string;
  SATI_8: string;
  SATI_9: string;
  SATI_10: string;
  SATI_11: string;
  SATI_12: string;
  SATI_13: string;
  SATI_14: string;
  SATI_15: string;
  SATI_16: string;
  SATI_17: string;
  SATI_18: string;
  SATI_19: string;
  SATI_20: string;
  SATI_21: string;
  SATI_22: string;
  SATI_23: string;
  SATI_24: string;
  SATI_25: string;
  SATI_26: string;
  SATI_27: string;
  SATI_28: string;
  SATI_29: string;
}

export interface EvidencijaRadVre{
  UKUPANBROJSLOGOVA: number;
  RN: number;
  NAZIV_OJ:string;
  SIFRANAZIV: string;
  NAZIVRAD: string;
  SIF_MT: string;
  NAZIV_MT: string;
  REDAK: string;
  VRSTA: string;
  POCETAK: string;
  ZAVRSETAK: string;
  SATI_1: string;
  SATI_2: string;
  SATI_3: string;
  SATI_4: string;
  SATI_5: string;
  SATI_6: string;
  SATI_7: string;
  SATI_8: string;
  SATI_9: string;
  SATI_10: string;
  SATI_11: string;
  SATI_12: string;
  SATI_13: string;
  SATI_14: string;
  SATI_15: string;
  SATI_16: string;
  SATI_17: string;
  SATI_18: string;
  SATI_19: string;
  SATI_20: string;
  SATI_21: string;
  SATI_22: string;
  SATI_23: string;
  SATI_24: string;
  SATI_25: string;
  SATI_26: string;
  SATI_27: string;
  SATI_28: string;
  SATI_29: string;
  BEMPTYROWAFTER: string;
}

export interface EvidencijaRadVreOj{
  UKUPANBROJSLOGOVA: number;
  RN: number;
  SIF_OJ: string;
  NAZMJTR: string;
  VRSTA: string;
}

export enum TodoState {
  Urgent,
  InProgress,
  Next,
  ForLater
}

export interface ReadPostRequestMain {
  action: string;
  method: string;
  sid?: string;
  data: ReadPostRequestBody;
}

export interface ReadPostRequestBody {
  limit?: number;
  pActive?: number;
  pAdminId?: number;
  pAdresa?: string;
  pComment?: string;
  pComputerId?: number;
  pComputerListId?: string;
  pComputerModelId?: number;
  pComputerTypesId?: number;
  pComputerOS?: number;
  pComputerOSVersion?: number;
  pComputerOSArchitecture?: number;
  pComputerOSKernelVersions?: number;
  pContact?: string;
  pCreationDate?: string;
  pModifiedDate?: string;
  pDateCreation?: string;
  pDateMod?: string;
  pDescription?: string;
  pDioAdresa?: string;
  pDioAdresaNOT?: string;
  pDioAktivan?: string;
  pDioAktivanNOT?: string;
  pDioArhitektura?: string;
  pDioArhitekturaNOT?: string;
  pDioDatumInstalacije?: string;
  pDioDatumInstalacijeNOT?: string;
  pDioEmail?: string;
  pDioEmailNOT?: string;
  pDioIDa?: string;
  pDioIDaNOT?: string;
  pDioKategorije?: string;
  pDioKategorijeNOT?: string;
  pDioKomentar?: string;
  pDioKomentarNOT?: string;
  pDioKontakta?: string;
  pDioKontaktaNOT?: string;
  pDioModela?: string;
  pDioModelaNOT?: string;
  pDioNazivRacunala?: string;
  pDioNazivRacunalaNOT?: string;
  pDioNaziva?: string;
  pDioNazivaNOT?: string;
  pDioNazivaProcesora?: string;
  pDioNazivaProcesoraNOT?: string;
  pDioNazivaProizvodjaca?: string;
  pDioNazivaProizvodjacaNOT?: string;
  pDioOperacijskogSustava?: string;
  pDioOperacijskogSustavaNOT?: string;
  pDioPassword?: string;
  pDioPasswordNOT?: string;
  pDioSerijskog?: string;
  pDioSerijskogNOT?: string;
  pDioUloge?: string;
  pDioUlogeNOT?: string;
  pDioUsername?: string;
  pDioUsernameNOT?: string;
  pDioVerzije?: string;
  pDioVerzijeNOT?: string;
  pDioVerzijeSoftvera?: string;
  pDioVerzijeSoftveraNOT?: string;
  pDioVrste?: string;
  pDioVrsteNOT?: string;
  pDioZupanije?: string;
  pDioZupanijeNOT?: string;
  pDueDate?: string;
  pEmail?: string;
  pManufacturersID?: number;
  pName?: string;
  pNapomena?: string;
  pSerial?: string;
  pID?: number;
  pNedozvoljen?: any;
  pID_Korisnika?: string;
  pItemID?: number;
  pItemId?: number;
  pItemType?: string;
  pPassword?: string;
  pPoruka?: string;
  pReceiverId?: number;
  pSenderId?: number;
  pState?: TodoState;
  pTitle?: string;
  pUlogaID?: number;
  pUlogaId?: number;
  pUserID?: number;
  pZupanijaID?: number;
  pZupanijaId?: number;
  pSelectedZupanijaID?: number;
  pSelectedIspostavaID?: number;
  pSoftwareCategoriesId?: number;
  pSqlParams?: string;
  pUloga?: number;
  pUsername?: string;
  pPrioriter?: string;
  pKorisnik?: string;
  pIDObavijesti?: string;
  pIDKorisnika?: string;
  pZaglavlje1?: string;
  pZaglavlje2?: string;
  pZaglavlje3?: string;
  pZaglavlje4?: string;
  pComputerID?: number;
  pStatusID?:number;
  pStatusAktivnostiID?:number;
  pIDNew?:string;
  pUsernameNew?:string;
  pUkupno?: boolean;
  page?: number;
  sort?: ReadPostRequestPropertyAndDirection[];
}

export interface ReadPostRequestPropertyAndDirection {
  property: string;
  direction: string;
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
