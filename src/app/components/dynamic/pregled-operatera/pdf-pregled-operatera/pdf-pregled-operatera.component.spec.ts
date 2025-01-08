import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfPregledOperateraComponent } from './pdf-pregled-operatera.component';

describe('PdfPregledOperateraComponent', () => {
  let component: PdfPregledOperateraComponent;
  let fixture: ComponentFixture<PdfPregledOperateraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfPregledOperateraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfPregledOperateraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
