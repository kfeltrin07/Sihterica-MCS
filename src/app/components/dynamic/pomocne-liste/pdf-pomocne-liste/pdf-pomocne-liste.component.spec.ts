import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfPomocneListeComponent } from './pdf-pomocne-liste.component';

describe('PdfPomocneListeComponent', () => {
  let component: PdfPomocneListeComponent;
  let fixture: ComponentFixture<PdfPomocneListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfPomocneListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfPomocneListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
