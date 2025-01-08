import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfShemeComponent } from './pdf-sheme.component';

describe('PdfShemeComponent', () => {
  let component: PdfShemeComponent;
  let fixture: ComponentFixture<PdfShemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfShemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfShemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
