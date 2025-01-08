import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfEvidencijaRadnogVremenaZaglavljeComponent } from './pdf-evidencija-radnog-vremena-zaglavlje.component';

describe('PdfEvidencijaRadnogVremenaZaglavljeComponent', () => {
  let component: PdfEvidencijaRadnogVremenaZaglavljeComponent;
  let fixture: ComponentFixture<PdfEvidencijaRadnogVremenaZaglavljeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfEvidencijaRadnogVremenaZaglavljeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfEvidencijaRadnogVremenaZaglavljeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
