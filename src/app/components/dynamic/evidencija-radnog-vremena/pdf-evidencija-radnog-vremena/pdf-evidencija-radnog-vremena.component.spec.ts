import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfEvidencijaRadnogVremenaComponent } from './pdf-evidencija-radnog-vremena.component';

describe('PdfEvidencijaRadnogVremenaComponent', () => {
  let component: PdfEvidencijaRadnogVremenaComponent;
  let fixture: ComponentFixture<PdfEvidencijaRadnogVremenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfEvidencijaRadnogVremenaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfEvidencijaRadnogVremenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
