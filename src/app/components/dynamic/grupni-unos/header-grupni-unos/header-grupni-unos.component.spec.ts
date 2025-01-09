import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderGrupniUnosComponent } from './header-grupni-unos.component';

describe('HeaderGrupniUnosComponent', () => {
  let component: HeaderGrupniUnosComponent;
  let fixture: ComponentFixture<HeaderGrupniUnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderGrupniUnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderGrupniUnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
