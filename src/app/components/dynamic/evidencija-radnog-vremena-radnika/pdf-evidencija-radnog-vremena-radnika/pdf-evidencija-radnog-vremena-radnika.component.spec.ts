import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfEvidencijaRadnogVremenaRadnikaComponent } from './pdf-evidencija-radnog-vremena-radnika.component';

describe('PdfEvidencijaRadnogVremenaRadnikaComponent', () => {
  let component: PdfEvidencijaRadnogVremenaRadnikaComponent;
  let fixture: ComponentFixture<PdfEvidencijaRadnogVremenaRadnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfEvidencijaRadnogVremenaRadnikaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfEvidencijaRadnogVremenaRadnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
