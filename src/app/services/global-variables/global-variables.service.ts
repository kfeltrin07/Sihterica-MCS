import { Injectable } from '@angular/core';
import { CookiesService } from '../cookies/cookies.service';
import { Konekcija, DynamicMenu, RightsState, DashboardItem, DynamicMenuReference, SidebarItem, ColumnRef } from 'src/app/models/models.service';

type AvailableLanguages = 'en' | 'hr';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  constructor(
    public cookies: CookiesService
  ) { }

  public autoLogin: boolean = false;
  public IzvjestajPokrenut: boolean = false;
  public RequestUrl: any;
  public ProvjerioSam: boolean = false;
  public PrviPut: boolean = true;
  public VrstaUredaja: boolean = false;

  public isPaginatorShown: boolean = true;
  public oldpagination: boolean = true;

  public selectWasClicked: boolean = false;

  public RequestVarijable: any;
  public TrenutniIzvjestaj: any;

  public headerTitle: string = '';
  public headerImage: string = '';
  // END: development helpers

  // START: logging in messages

  public loggingInMessage: string = 'LoggingIn';

  public konekcije: Konekcija[] = [
    { value: 'http://192.168.88.169:8080/', viewValue: 'Šihterica' }, //0
    { value: 'http://192.168.88.169:8080/', viewValue: 'Linux' }, //0
    { value: 'http://192.168.88.169:8080/', viewValue: 'Razvoj' }, //1
    { value: 'http://192.168.88.169:8080/', viewValue: 'Čistoća iz MCS (192.168.88.169)' }, //2
    { value: 'http://172.16.91.70:8000/', viewValue: 'Čistoća iz MCS (172.16.91.70)' }, //3
    { value: 'http://192.168.150.10:8000/', viewValue: 'Čistoća' }, //2
  ]

  public konekcijeAPIFile: Konekcija[] = [
    { value: 'php_angularAPI_oracle_sihterica/router.php', viewValue: 'Šihterica' }, //0
    { value: 'php_angularAPI_oracle_linux/router.php', viewValue: 'Linux' }, //0
    { value: 'php_angularAPI_oracle_razvoj/router.php', viewValue: 'Razvoj' }, //1
    { value: 'php_angularAPI_oracle_cistoca/router.php', viewValue: 'Čistoća iz MCS (192.168.88.169)' }, //2
    { value: 'php_angularAPI_oracle_cistoca/router.php', viewValue: 'Čistoća iz MCS (172.16.91.70)' }, //3
    { value: 'php_angularAPI_oracle_cistoca/router.php', viewValue: 'Čistoća' }, //3

  ]
  public konekcijeAPIReport: Konekcija[] = [
    { value: 'php_angularAPI_oracle_sihterica/classes/pdfs', viewValue: 'Šihterica' }, //0
    { value: 'php_angularAPI_oracle_linux/classes/pdfs', viewValue: 'Linux' }, //0
    { value: 'php_angularAPI_oracle_razvoj/classes/pdfs', viewValue: 'Razvoj' }, //1
    { value: 'php_angularAPI_oracle_cistoca/classes/pdfs', viewValue: 'Čistoća iz MCS (192.168.88.169)' }, //2
    { value: 'php_angularAPI_oracle_cistoca/classes/pdfs', viewValue: 'Čistoća iz MCS (172.16.91.70)' }, //3
    { value: 'php_angularAPI_oracle_cistoca/classes/pdfs', viewValue: 'Čistoća' }, //3

  ]

  private vars1: string = this.cookies.getCookie('connected-database');
  private vars2: string = this.cookies.getCookie('connected-APIFile');
  private vars3: string = this.cookies.getCookie('connected-APIReport');

  public APIHost: string = this.vars1 ? this.vars1 : this.konekcije[0].value;
  public APIFile: string = this.vars2 ? this.vars2 : this.konekcijeAPIFile[0].value;
  public APIReport: string = this.vars3 ? this.vars3 : this.konekcijeAPIReport[0].value;

  public selectedLanguage: AvailableLanguages = 'hr';


  public environment: any = {
    isProduction: false,
    isLoginRequired: true,
    areBetaFeaturesIncluded: false
  }

  public dynamicMenu!: DynamicMenu[];
  public useDynamicMenus: boolean = false;
  public cVRS: RightsState | undefined = RightsState.Readonly;

  //DISPLAYED COLUMNS

  public IDKORISNIKAColumn: ColumnRef = {
    displayedName: 'IDKORISNIKA',
    name: 'IDKORISNIKA'
  };

  public SYSDATETIMEColumn: ColumnRef = {
    displayedName: 'SYSDATETIME',
    name: 'SYSDATETIME'
  };

  public RNColumn: ColumnRef = {
    displayedName: 'RN',
    name: 'RN'
  };

  public SIFVLASColumn: ColumnRef = {
    displayedName: 'SIFVLAS',
    name: 'SIFVLAS'
  }; 
  
  public MBRColumn: ColumnRef = {
    displayedName: 'MBR',
    name: 'MBR'
  };  
  
  public PREZIME_IMEColumn: ColumnRef = {
    displayedName: 'PREZIME_IME',
    name: 'PREZIME_IME'
  }; 
  
  public SIF_RMColumn: ColumnRef = {
    displayedName: 'SIF_RM',
    name: 'SIF_RM'
  };  
  
  public NAZ_ZANColumn: ColumnRef = {
    displayedName: 'NAZ_ZAN',
    name: 'NAZ_ZAN'
  };  
  
  public NAZ_RMColumn: ColumnRef = {
    displayedName: 'NAZ_RM',
    name: 'NAZ_RM'
  }; 
  
  public SIF_OJColumn: ColumnRef = {
    displayedName: 'SIF_OJ',
    name: 'SIF_OJ'
  };  
  
  public NAZ_OJColumn: ColumnRef = {
    displayedName: 'NAZ_OJ',
    name: 'NAZ_OJ'
  };

  public INDColumn: ColumnRef = {
    displayedName: 'IND',
    name: 'IND'
  };

  public ZaposleniDisplayedColumns: ColumnRef[] = [
    this.MBRColumn,
    this.PREZIME_IMEColumn,
    this.NAZ_ZANColumn,
    this.SIF_OJColumn,
    this.NAZ_OJColumn,
    this.INDColumn,

  ];
  public ZaposleniColumnsList: ColumnRef[] = [
    this.RNColumn,
    this.SIFVLASColumn,
    this.MBRColumn,
    this.PREZIME_IMEColumn,
    this.NAZ_ZANColumn,
    this.SIF_RMColumn,
    this.NAZ_RMColumn,
    this.SIF_OJColumn,
    this.NAZ_OJColumn,
    this.INDColumn,

  ];


  public SIF_VPColumn: ColumnRef = {
    displayedName: 'SIF_VP',
    name: 'SIF_VP'
  };
  public NAZ_VPColumn: ColumnRef = {
    displayedName: 'NAZ_VP',
    name: 'NAZ_VP'
  };
  public SIColumn: ColumnRef = {
    displayedName: 'SI',
    name: 'SI'
  };

  public VrstePoslaDisplayedColumns: ColumnRef[] = [
    this.SIF_VPColumn,
    this.NAZ_VPColumn,
    this.SIColumn
  ];

  public VrstePoslaColumnsList: ColumnRef[] = [
    this.RNColumn,
    this.SIFVLASColumn,
    this.SIF_VPColumn,
    this.NAZ_VPColumn,
    this.SIColumn
  ];

  public REG_BRColumn: ColumnRef = {
    displayedName: 'REG_BR',
    name: 'REG_BR'
  };
  public BOD_PCColumn: ColumnRef = {
    displayedName: 'BOD_PC',
    name: 'BOD_PC'
  };
  public KOEF_PCColumn: ColumnRef = {
    displayedName: 'KOEF_PC',
    name: 'KOEF_PC'
  };
  public VR_BODColumn: ColumnRef = {
    displayedName: 'VR_BOD',
    name: 'VR_BOD'
  };
  public VR_KOEFColumn: ColumnRef = {
    displayedName: 'VR_KOEF',
    name: 'VR_KOEF'
  };
  public PROS_SATColumn: ColumnRef = {
    displayedName: 'PROS_SAT',
    name: 'PROS_SAT'
  };
  public PROS_KOEFColumn: ColumnRef = {
    displayedName: 'PROS_KOEF',
    name: 'PROS_KOEF'
  };
  public PROS_BODColumn: ColumnRef = {
    displayedName: 'PROS_BOD',
    name: 'PROS_BOD'
  };
  public IND1Column: ColumnRef = {
    displayedName: 'IND1',
    name: 'IND1'
  };
  public SIF_NADColumn: ColumnRef = {
    displayedName: 'SIF_NAD',
    name: 'SIF_NAD'
  };
  public BRO_HZZOColumn: ColumnRef = {
    displayedName: 'BRO_HZZO',
    name: 'BRO_HZZO'
  };
  public RSOPCColumn: ColumnRef = {
    displayedName: 'RSOPC',
    name: 'RSOPC'
  };
  public IDKColumn: ColumnRef = {
    displayedName: 'IDK',
    name: 'IDK'
  };
  public SYSDColumn: ColumnRef = {
    displayedName: 'SYSD',
    name: 'SYSD'
  };
  

  public OrganizacijskeJediniceDisplayedColumns: ColumnRef[] = [
    this.SIF_OJColumn,
    this.NAZ_OJColumn,
  ];

  public OrganizacijskeJediniceColumnsList: ColumnRef[] = [
    this.RNColumn,
    this.SIFVLASColumn,
    this.SIF_OJColumn,
    this.NAZ_OJColumn,
    this.REG_BRColumn,
    this.BOD_PCColumn,
    this.KOEF_PCColumn,
    this.VR_BODColumn,
    this.VR_KOEFColumn,
    this.PROS_SATColumn,
    this.PROS_KOEFColumn,
    this.PROS_BODColumn,
    this.IND1Column,
    this.SIF_NADColumn,
    this.BRO_HZZOColumn,
    this.RSOPCColumn,
    this.IDKColumn,
    this.SYSDColumn,
  ];


  public IDColumn: ColumnRef = {
    displayedName: 'ID',
    name: 'ID'
  };
  public NAZIVColumn: ColumnRef = {
    displayedName: 'NAZIV',
    name: 'NAZIV'
  };
  public USERNAMEColumn: ColumnRef = {
    displayedName: 'USERNAME',
    name: 'USERNAME'
  };
  public PASSWORDColumn: ColumnRef = {
    displayedName: 'PASSWORD',
    name: 'PASSWORD'
  };
  public NAPOMENAColumn: ColumnRef = {
    displayedName: 'NAPOMENA',
    name: 'NAPOMENA'
  };
  public IDULOGEColumn: ColumnRef = {
    displayedName: 'IDULOGE',
    name: 'IDULOGE'
  };
  public ULOGAColumn: ColumnRef = {
    displayedName: 'ULOGA',
    name: 'ULOGA'
  };

  public OperateriDisplayedColumns: ColumnRef[] = [
    this.IDColumn,
    this.NAZIVColumn,
    this.USERNAMEColumn,
    this.NAPOMENAColumn,
    this.IDULOGEColumn,
    this.ULOGAColumn
  ];

  public OperateriColumnsList: ColumnRef[] = [
    this.RNColumn,
    this.IDColumn,
    this.NAZIVColumn,
    this.USERNAMEColumn,
    this.PASSWORDColumn,
    this.NAPOMENAColumn,
    this.IDULOGEColumn,
    this.ULOGAColumn
  ];

  public SIFMJTRColumn: ColumnRef = {
    displayedName: 'SIFMJTR',
    name: 'SIFMJTR'
  };
  public NAZMJTRColumn: ColumnRef = {
    displayedName: 'NAZMJTR',
    name: 'NAZMJTR'
  };
  public ODColumn: ColumnRef = {
    displayedName: 'OD',
    name: 'OD'
  };
  public DOColumn: ColumnRef = {
    displayedName: 'DO',
    name: 'DO'
  };
  public SATIColumn: ColumnRef = {
    displayedName: 'SATI',
    name: 'SATI'
  };

  public OvlastenaOsobaMjTrDisplayedColumns: ColumnRef[] = [
    this.IDColumn,
    this.NAZIVColumn,
    this.USERNAMEColumn,
    this.SIFMJTRColumn,
    this.NAZMJTRColumn,
    this.SATIColumn
  ];

  public OvlastenaOsobaMjTrColumnsList: ColumnRef[] = [
    this.RNColumn,
    this.IDColumn,
    this.NAZIVColumn,
    this.USERNAMEColumn,
    this.SIFMJTRColumn,
    this.NAZMJTRColumn,
    this.ODColumn,
    this.DOColumn,
    this.SATIColumn
  ];


  public RIDColumn: ColumnRef = {
    displayedName: 'RID',
    name: 'RID'
  };
  public SIF_STUPCAColumn: ColumnRef = {
    displayedName: 'SIF_STUPCA',
    name: 'SIF_STUPCA'
  };
  public RBROJColumn: ColumnRef = {
    displayedName: 'RBROJ',
    name: 'RBROJ'
  };
  public KNAZIVColumn: ColumnRef = {
    displayedName: 'KNAZIV',
    name: 'KNAZIV'
  };
  public OPISColumn: ColumnRef = {
    displayedName: 'OPIS',
    name: 'OPIS'
  };
  public VRSTA_SLOGAColumn: ColumnRef = {
    displayedName: 'VRSTA_SLOGA',
    name: 'VRSTA_SLOGA'
  };
  public OPISVRSTEColumn: ColumnRef = {
    displayedName: 'OPISVRSTE',
    name: 'OPISVRSTE'
  };
  public EvidencijaRadVreZagDisplayedColumns: ColumnRef[] = [
    this.KNAZIVColumn,
    this.OPISColumn,
    this.SIF_STUPCAColumn,
    this.RBROJColumn,
    this.OPISVRSTEColumn
  ];

  public EvidencijaRadVreZagColumnsList: ColumnRef[] = [
    this.RNColumn,
    this.RIDColumn,
    this.KNAZIVColumn,
    this.OPISColumn,
    this.SIF_STUPCAColumn,
    this.RBROJColumn,
    this.OPISVRSTEColumn,
    this.VRSTA_SLOGAColumn
  ];

  public SIFRAColumn: ColumnRef = {
    displayedName: 'SIFRA',
    name: 'SIFRA'
  };

  public SIF_VLASColumn: ColumnRef = {
    displayedName: 'SIF_VLAS',
    name: 'SIF_VLAS'
  };

  public OpisVrsteDisplayedColumns: ColumnRef[] = [
    this.SIFRAColumn,
    this.OPISColumn,
  ];

  public OpisVrsteColumnsList: ColumnRef[] = [
    this.RNColumn,
    this.SIFRAColumn,
    this.OPISColumn,
    this.SIF_VLASColumn
  ];


  public XFAKTORColumn: ColumnRef = {
    displayedName: 'XFAKTOR',
    name: 'XFAKTOR'
  };

  public EvidencijaRadVreZagVezeDisplayedColumns: ColumnRef[] = [
    this.KNAZIVColumn,
    this.OPISColumn,
    this.SIF_STUPCAColumn,
    this.SIF_VPColumn,
    this.NAZ_VPColumn
  ];

  public EvidencijaRadVreZagVezeColumnsList: ColumnRef[] = [
    this.RNColumn,
    this.RIDColumn,
    this.KNAZIVColumn,
    this.OPISColumn,
    this.SIF_STUPCAColumn,
    this.SIF_VPColumn,
    this.NAZ_VPColumn,
    this.XFAKTORColumn,
    this.SIF_VLASColumn,
    this.SIColumn
  ];

  public EvidVezeSifraDisplayedColumns: ColumnRef[] = [
    this.SIF_STUPCAColumn,
    this.KNAZIVColumn,
  ];

  public EvidVezeSifraColumnsList: ColumnRef[] = [
    this.RNColumn,
    this.SIF_STUPCAColumn,
    this.KNAZIVColumn,
  ];
  
  public EvidVezeIzracunaDisplayedColumns: ColumnRef[] = [
    this.SIF_STUPCAColumn,
    this.KNAZIVColumn,
  ];

  public EvidVezeIzracunaColumnsList: ColumnRef[] = [
    this.RNColumn,
    this.SIF_VLASColumn,
    this.SIFRAColumn,
    this.OPISColumn,
  ];

  

  public SIFRANAZIVColumn: ColumnRef = {
    displayedName: 'SIFRANAZIV',
    name: 'SIFRANAZIV'
  };
  public SIF_MTColumn: ColumnRef = {
    displayedName: 'SIF_MT',
    name: 'SIF_MT'
  };
  public NAZIV_MTColumn: ColumnRef = {
    displayedName: 'NAZIV_MT',
    name: 'NAZIV_MT'
  };
  public REDAKColumn: ColumnRef = {
    displayedName: 'REDAK',
    name: 'REDAK'
  };
  public VRSTAColumn: ColumnRef = {
    displayedName: 'VRSTA',
    name: 'VRSTA'
  };
  public POCETAKColumn: ColumnRef = {
    displayedName: 'POCETAK',
    name: 'POCETAK'
  };
  public ZAVRSETAKColumn: ColumnRef = {
    displayedName: 'ZAVRSETAK',
    name: 'ZAVRSETAK'
  };
  public SATI_1Column: ColumnRef = {
    displayedName: 'SATI_1',
    name: 'SATI_1'
  };
  public SATI_2Column: ColumnRef = {
    displayedName: 'SATI_2',
    name: 'SATI_2'
  };
  public SATI_3Column: ColumnRef = {
    displayedName: 'SATI_3',
    name: 'SATI_3'
  };
  public SATI_4Column: ColumnRef = {
    displayedName: 'SATI_4',
    name: 'SATI_4'
  };
  public SATI_5Column: ColumnRef = {
    displayedName: 'SATI_5',
    name: 'SATI_5'
  };
  public SATI_6Column: ColumnRef = {
    displayedName: 'SATI_6',
    name: 'SATI_6'
  };
  public SATI_7Column: ColumnRef = {
    displayedName: 'SATI_7',
    name: 'SATI_7'
  };
  public SATI_8Column: ColumnRef = {
    displayedName: 'SATI_8',
    name: 'SATI_8'
  };
  public SATI_9Column: ColumnRef = {
    displayedName: 'SATI_9',
    name: 'SATI_9'
  };
  public SATI_10Column: ColumnRef = {
    displayedName: 'SATI_10',
    name: 'SATI_10'
  };
  public SATI_11Column: ColumnRef = {
    displayedName: 'SATI_11',
    name: 'SATI_11'
  };
  public SATI_12Column: ColumnRef = {
    displayedName: 'SATI_12',
    name: 'SATI_12'
  };
  public SATI_13Column: ColumnRef = {
    displayedName: 'SATI_13',
    name: 'SATI_13'
  };
  public SATI_14Column: ColumnRef = {
    displayedName: 'SATI_14',
    name: 'SATI_14'
  };
  public SATI_15Column: ColumnRef = {
    displayedName: 'SATI_15',
    name: 'SATI_15'
  };
  public SATI_16Column: ColumnRef = {
    displayedName: 'SATI_16',
    name: 'SATI_16'
  };
  public SATI_17Column: ColumnRef = {
    displayedName: 'SATI_17',
    name: 'SATI_17'
  };
  public SATI_18Column: ColumnRef = {
    displayedName: 'SATI_18',
    name: 'SATI_18'
  };
  public SATI_19Column: ColumnRef = {
    displayedName: 'SATI_19',
    name: 'SATI_19'
  };
  public SATI_20Column: ColumnRef = {
    displayedName: 'SATI_20',
    name: 'SATI_20'
  };
  public SATI_21Column: ColumnRef = {
    displayedName: 'SATI_21',
    name: 'SATI_21'
  };
  public SATI_22Column: ColumnRef = {
    displayedName: 'SATI_22',
    name: 'SATI_22'
  };
  public SATI_23Column: ColumnRef = {
    displayedName: 'SATI_23',
    name: 'SATI_23'
  };
  public SATI_24Column: ColumnRef = {
    displayedName: 'SATI_24',
    name: 'SATI_24'
  };
  public SATI_25Column: ColumnRef = {
    displayedName: 'SATI_25',
    name: 'SATI_25'
  };
  public SATI_26Column: ColumnRef = {
    displayedName: 'SATI_26',
    name: 'SATI_26'
  };
  public SATI_27Column: ColumnRef = {
    displayedName: 'SATI_27',
    name: 'SATI_27'
  };
  public SATI_28Column: ColumnRef = {
    displayedName: 'SATI_28',
    name: 'SATI_28'
  };
  public SATI_29Column: ColumnRef = {
    displayedName: 'SATI_29',
    name: 'SATI_29'
  };
  
  public EvidencijaRadVreRadDisplayedColumns: ColumnRef[] = [
    this.SIFRANAZIVColumn,
    this.SIF_MTColumn,
    this.NAZIV_MTColumn,
    this.REDAKColumn,
    this.VRSTAColumn,
    this.POCETAKColumn,
    this.ZAVRSETAKColumn,
    this.SATI_1Column,
    this.SATI_2Column
  ];

  public EvidencijaRadVreRadColumnsList: ColumnRef[] = [
    this.RNColumn,
    this.SIFRANAZIVColumn,
    this.SIF_MTColumn,
    this.NAZIV_MTColumn,
    this.REDAKColumn,
    this.VRSTAColumn,
    this.POCETAKColumn,
    this.ZAVRSETAKColumn,
    this.SATI_1Column,
    this.SATI_2Column,
    this.SATI_3Column,
    this.SATI_4Column,
    this.SATI_5Column,
    this.SATI_6Column,
    this.SATI_7Column,
    this.SATI_8Column,
    this.SATI_9Column,
    this.SATI_10Column,
    this.SATI_11Column,
    this.SATI_12Column,
    this.SATI_13Column,
    this.SATI_14Column,
    this.SATI_15Column,
    this.SATI_16Column,
    this.SATI_17Column,
    this.SATI_18Column,
    this.SATI_19Column,
    this.SATI_20Column,
    this.SATI_21Column,
    this.SATI_22Column,
    this.SATI_23Column,
    this.SATI_24Column,
    this.SATI_25Column,
    this.SATI_26Column,
    this.SATI_27Column,
    this.SATI_28Column,
    this.SATI_29Column,
  ]
  // END: columns list

  public OSOBAColumn: ColumnRef = {
    displayedName: 'OSOBA',
    name: 'OSOBA'
  };
  

  public EvRadnogVremenaHelpRadniciDisplayedColumns: ColumnRef[] = [
    this.MBRColumn,
    this.PREZIME_IMEColumn,
  ];

  public EvRadnogVremenaHelpRadniciColumnsList: ColumnRef[] = [
    this.RNColumn,
    this.MBRColumn,
    this.PREZIME_IMEColumn,
    this.OSOBAColumn,
  ];


  public NAZIV_OJColumn: ColumnRef = {
    displayedName: 'NAZIV_OJ',
    name: 'NAZIV_OJ'
  };
  public NAZIVRADColumn: ColumnRef = {
    displayedName: 'NAZIVRAD',
    name: 'NAZIVRAD'
  };
  public BEMPTYROWAFTERColumn: ColumnRef = {
    displayedName: 'BEMPTYROWAFTER',
    name: 'BEMPTYROWAFTER'
  };

  public EvidencijaRadVreDisplayedColumns: ColumnRef[] = [
    this.NAZIV_OJColumn,
    this.SIFRANAZIVColumn,
    this.NAZIVRADColumn,
    this.SIF_MTColumn,
    this.NAZIV_MTColumn,
    this.REDAKColumn,
    this.VRSTAColumn,
    this.POCETAKColumn,
    this.ZAVRSETAKColumn,
    this.SATI_1Column,
    this.SATI_2Column
  ];

  public EvidencijaRadVreColumnsList: ColumnRef[] = [
    this.RNColumn,
    this.NAZIV_OJColumn,
    this.SIFRANAZIVColumn,
    this.NAZIVRADColumn,
    this.SIF_MTColumn,
    this.NAZIV_MTColumn,
    this.REDAKColumn,
    this.VRSTAColumn,
    this.POCETAKColumn,
    this.ZAVRSETAKColumn,
    this.SATI_1Column,
    this.SATI_2Column,
    this.SATI_3Column,
    this.SATI_4Column,
    this.SATI_5Column,
    this.SATI_6Column,
    this.SATI_7Column,
    this.SATI_8Column,
    this.SATI_9Column,
    this.SATI_10Column,
    this.SATI_11Column,
    this.SATI_12Column,
    this.SATI_13Column,
    this.SATI_14Column,
    this.SATI_15Column,
    this.SATI_16Column,
    this.SATI_17Column,
    this.SATI_18Column,
    this.SATI_19Column,
    this.SATI_20Column,
    this.SATI_21Column,
    this.SATI_22Column,
    this.SATI_23Column,
    this.SATI_24Column,
    this.SATI_25Column,
    this.SATI_26Column,
    this.SATI_27Column,
    this.SATI_28Column,
    this.SATI_29Column,
    this.BEMPTYROWAFTERColumn
  ];  

  public EvidencijaRadVreOjDisplayedColumns: ColumnRef[] = [
    this.SIF_OJColumn,
    this.NAZMJTRColumn,
  ];

  public EvidencijaRadVreOjColumnsList: ColumnRef[] = [
    this.RNColumn,
    this.SIF_OJColumn,
    this.NAZMJTRColumn,
    this.VRSTAColumn,
  ];

  public sidebarItems: SidebarItem[] = [
    {
      namePrefix: '0',
      name: 'General',
      icon: null,
      highlighted: false,
      rightsState: 1,
      open: true,
      children: [
        {
          namePrefix: '0.1',
          name: 'Dashboard',
          icon: 'dashboard',
          url: '/dashboard',
          highlighted: false,
          rightsState: 1,
          open: false
        },
        {
          namePrefix: '0.2',
          name: 'SelectionScreen',
          icon: 'menu',
          url: '/selection-screen',
          highlighted: false,
          rightsState: 1,
          open: false
        }
      ],
    },
    {
      namePrefix: '1',
      name: 'Šihterica',
      icon: null,
      highlighted: false,
      rightsState: 1,
      open: true,
      children: [
        {
          namePrefix: '1.1',
          name: 'Zaposleni',
          icon: 'person',
          url: '/zaposleni',
          highlighted: false,
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
          open: false
        },
        {
          namePrefix: '1.2',
          name: 'VrstePosla',
          icon: 'work_outline',
          url: '/vrste-posla',
          highlighted: false,
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
          open: false
        },
        {
          namePrefix: '1.3',
          name: 'OrganizationalUnit',
          icon: 'work',
          url: '/oj',
          highlighted: false,
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
          open: false
        }
      ],
    },
    {
      namePrefix: '2',
      name: 'Liste',
      icon: null,
      highlighted: false,
      rightsState: 1,
      open: true,
      children: [
        {
          namePrefix: '2.1',
          name: 'EvidencijaRadnogVremenaRadnika',
          icon: 'perm_contact_cal',
          url: '/evidencija-rad-vrem-rad',
          highlighted: false,
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
          open: false
        },
        {
          namePrefix: '2.2',
          name: 'EvidencijaRadnogVremena',
          icon: 'access_time',
          url: '/evidencija-rad-vrem',
          highlighted: false,
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
          open: false
        },
      ]
    },
    {
      namePrefix: '3',
      name: 'Administracija',
      icon: null,
      highlighted: false,
      rightsState: 1,
      open: true,
      children: [
        {
          namePrefix: '3.1',
          name: 'OvlasteneOsobe',
          icon: 'people_alt',
          url: '/operateri',
          highlighted: false,
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
          open: false
        },
        {
          namePrefix: '3.2',
          name: 'OvlasteneOsobeMjTr',
          icon: 'approval',
          url: '/ovlastene-osobe-mj-tr',
          highlighted: false,
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
          open: false
        },
        {
          namePrefix: '3.3',
          name: 'EvidencijaRadVremZag',
          icon: 'work_history',
          url: '/evidencija-rad-vrem-zag',
          highlighted: false,
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
          open: false
        },
        {
          namePrefix: '3.4',
          name: 'EvidencijaRadVremZagVeze',
          icon: 'connect_without_contact',
          url: '/evidencija-rad-vrem-zag-veze',
          highlighted: false,
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
          open: false
        }
      ],
      
    }
  ];

  public dynamicMenuReferences: DynamicMenuReference[] = [
    {
      componentName: 'dashboard',
      componentDatabaseName: 'bilokojadozvola',
      url: '/dashboard'
    },
    {
      componentName: 'selection-screen',
      componentDatabaseName: 'bilokojadozvola',
      url: '/selection-screen'
    },
    {
      componentName: 'Zaposleni',
      componentDatabaseName: 'hZaposleni_pl',
      url: '/zaposleni'
    },
    {
      componentName: 'VrstePosla',
      componentDatabaseName: 'hVrPosla_pl',
      url: '/vrsta-posla'
    },
    {
      componentName: 'OrganizationalUnit',
      componentDatabaseName: 'hOJ_pl',
      url: '/oj'
    },
    {
      componentName: 'OvlasteneOsobe',
      componentDatabaseName: 'bilokojadozvola',
      url: '/operateri'
    },
    {
      componentName: 'OvlasteneOsobeMjTr',
      componentDatabaseName: 'bilokojadozvola',
      url: '/ovlastene-osobe-mj-tr'
    }

  ];

  public dashboardItems: DashboardItem[] = [
    {
      name: 'General',
      icon: 'featured_play_list',
      rowHeight: 2,
      rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
      items: [
        {
          name: 'Dashboard',
          icon: 'dashboard',
          url: '/dashboard',
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
        },
        {
          name: 'SelectionScreen',
          icon: 'menu',
          url: '/selection-screen',
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
        },
      ],
      url: ''
    },
    {
      name: 'Šihterica',
      icon: 'newspaper',
      rowHeight: 2,
      rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
      items: [
        {
          name: 'Zaposleni',
          icon: 'person',
          url: '/zaposleni',
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
        },
        {
          name: 'VrstePosla',
          icon: 'work_outline',
          url: '/vrsta-posla',
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
        },
        {
          name: 'OrganizationalUnit',
          icon: 'work',
          url: '/oj',
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
        }
      ],
      url: ''
    },
    {
      name: 'Liste',
      icon: 'list',
      rowHeight: 2,
      rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
      items: [
        {
          name: 'EvidencijaRadnogVremenaRadnika',
          icon: 'perm_contact_cal',
          url: '/evidencija-rad-vrem-rad',
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
        },
        {
          name: 'EvidencijaRadnogVremena',
          icon: 'access_time',
          url: '/evidencija-rad-vrem',
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
        },
      ],
      url: ''
    },
    {
      name: 'Administracija',
      icon: 'gpp_good',
      rowHeight: 2,
      rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
      items: [
        {
          name: 'OvlasteneOsobe',
          icon: 'people_alt',
          url: '/operateri',
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
        },
        {
          name: 'OvlasteneOsobeMjTr',
          icon: 'approval',
          url: '/ovlastene-osobe-mj-tr',
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
        },
        {
          name: 'EvidencijaRadVremZag',
          icon: 'work_history',
          url: '/evidencija-rad-vrem-zag',
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
        },
        {
          name: 'EvidencijaRadVremZagVeze',
          icon: 'connect_without_contact',
          url: '/evidencija-rad-vrem-zag-veze',
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
        }
      ],
      url: ''
    },
  ];

}


