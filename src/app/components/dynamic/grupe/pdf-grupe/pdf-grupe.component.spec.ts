import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfGrupeComponent } from './pdf-grupe.component';

describe('PdfGrupeComponent', () => {
  let component: PdfGrupeComponent;
  let fixture: ComponentFixture<PdfGrupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfGrupeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfGrupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
