import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelGrupeComponent } from './excel-grupe.component';

describe('ExcelGrupeComponent', () => {
  let component: ExcelGrupeComponent;
  let fixture: ComponentFixture<ExcelGrupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcelGrupeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcelGrupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
