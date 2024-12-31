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

  
  // END: columns list

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
      name: 'Administracija',
      icon: null,
      highlighted: false,
      rightsState: 1,
      open: true,
      children: [
        {
          namePrefix: '2.1',
          name: 'OvlasteneOsobe',
          icon: 'people_alt',
          url: '/operateri',
          highlighted: false,
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
          open: false
        },
        {
          namePrefix: '2.2',
          name: 'OvlasteneOsobeMjTr',
          icon: 'approval',
          url: '/ovlastene-osobe-mj-tr',
          highlighted: false,
          rightsState: this.useDynamicMenus ? RightsState.Invisible : RightsState.Editable,
          open: false
        },
        {
          namePrefix: '2.3',
          name: 'EvidencijaRadVremZag',
          icon: 'work_history',
          url: '/evidencija-rad-vrem-zag',
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
        }
      ],
      url: ''
    },
  ];

}


