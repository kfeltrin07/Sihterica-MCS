import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEvidencijaRadnogVremenaZaglavljeVezeComponent } from './details-evidencija-radnog-vremena-zaglavlje-veze.component';

describe('DetailsEvidencijaRadnogVremenaZaglavljeVezeComponent', () => {
  let component: DetailsEvidencijaRadnogVremenaZaglavljeVezeComponent;
  let fixture: ComponentFixture<DetailsEvidencijaRadnogVremenaZaglavljeVezeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsEvidencijaRadnogVremenaZaglavljeVezeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsEvidencijaRadnogVremenaZaglavljeVezeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
