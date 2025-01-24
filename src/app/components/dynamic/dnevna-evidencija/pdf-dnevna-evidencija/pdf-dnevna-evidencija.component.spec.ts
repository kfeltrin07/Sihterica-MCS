import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDnevnaEvidencijaComponent } from './pdf-dnevna-evidencija.component';

describe('PdfDnevnaEvidencijaComponent', () => {
  let component: PdfDnevnaEvidencijaComponent;
  let fixture: ComponentFixture<PdfDnevnaEvidencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfDnevnaEvidencijaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfDnevnaEvidencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
