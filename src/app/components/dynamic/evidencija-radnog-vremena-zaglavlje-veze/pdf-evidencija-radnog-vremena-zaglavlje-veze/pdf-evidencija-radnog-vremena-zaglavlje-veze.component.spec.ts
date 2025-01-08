import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfEvidencijaRadnogVremenaZaglavljeVezeComponent } from './pdf-evidencija-radnog-vremena-zaglavlje-veze.component';

describe('PdfEvidencijaRadnogVremenaZaglavljeVezeComponent', () => {
  let component: PdfEvidencijaRadnogVremenaZaglavljeVezeComponent;
  let fixture: ComponentFixture<PdfEvidencijaRadnogVremenaZaglavljeVezeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfEvidencijaRadnogVremenaZaglavljeVezeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfEvidencijaRadnogVremenaZaglavljeVezeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
