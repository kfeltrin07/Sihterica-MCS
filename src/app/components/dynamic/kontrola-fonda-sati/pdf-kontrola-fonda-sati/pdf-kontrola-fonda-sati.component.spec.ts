import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfKontrolaFondaSatiComponent } from './pdf-kontrola-fonda-sati.component';

describe('PdfKontrolaFondaSatiComponent', () => {
  let component: PdfKontrolaFondaSatiComponent;
  let fixture: ComponentFixture<PdfKontrolaFondaSatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfKontrolaFondaSatiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfKontrolaFondaSatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
