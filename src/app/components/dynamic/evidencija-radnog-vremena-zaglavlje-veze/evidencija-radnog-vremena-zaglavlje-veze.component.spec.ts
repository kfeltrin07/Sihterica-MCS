import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidencijaRadnogVremenaZaglavljeVezeComponent } from './evidencija-radnog-vremena-zaglavlje-veze.component';

describe('EvidencijaRadnogVremenaZaglavljeVezeComponent', () => {
  let component: EvidencijaRadnogVremenaZaglavljeVezeComponent;
  let fixture: ComponentFixture<EvidencijaRadnogVremenaZaglavljeVezeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvidencijaRadnogVremenaZaglavljeVezeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvidencijaRadnogVremenaZaglavljeVezeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
