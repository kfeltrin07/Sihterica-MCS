import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelKontrolaFondaSatiComponent } from './excel-kontrola-fonda-sati.component';

describe('ExcelKontrolaFondaSatiComponent', () => {
  let component: ExcelKontrolaFondaSatiComponent;
  let fixture: ComponentFixture<ExcelKontrolaFondaSatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcelKontrolaFondaSatiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcelKontrolaFondaSatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
