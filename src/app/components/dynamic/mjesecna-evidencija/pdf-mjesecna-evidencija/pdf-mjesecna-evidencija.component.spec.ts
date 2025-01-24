import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfMjesecnaEvidencijaComponent } from './pdf-mjesecna-evidencija.component';

describe('PdfMjesecnaEvidencijaComponent', () => {
  let component: PdfMjesecnaEvidencijaComponent;
  let fixture: ComponentFixture<PdfMjesecnaEvidencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfMjesecnaEvidencijaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfMjesecnaEvidencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
