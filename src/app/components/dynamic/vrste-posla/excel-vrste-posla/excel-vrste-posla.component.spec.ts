import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelVrstePoslaComponent } from './excel-vrste-posla.component';

describe('ExcelVrstePoslaComponent', () => {
  let component: ExcelVrstePoslaComponent;
  let fixture: ComponentFixture<ExcelVrstePoslaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcelVrstePoslaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcelVrstePoslaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
