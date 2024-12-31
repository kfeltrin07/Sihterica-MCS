import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidencijaRadnogVremenaZaglavljeComponent } from './evidencija-radnog-vremena-zaglavlje.component';

describe('EvidencijaRadnogVremenaZaglavljeComponent', () => {
  let component: EvidencijaRadnogVremenaZaglavljeComponent;
  let fixture: ComponentFixture<EvidencijaRadnogVremenaZaglavljeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvidencijaRadnogVremenaZaglavljeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvidencijaRadnogVremenaZaglavljeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
