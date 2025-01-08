import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelPregledOperateraComponent } from './excel-pregled-operatera.component';

describe('ExcelPregledOperateraComponent', () => {
  let component: ExcelPregledOperateraComponent;
  let fixture: ComponentFixture<ExcelPregledOperateraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcelPregledOperateraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcelPregledOperateraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
