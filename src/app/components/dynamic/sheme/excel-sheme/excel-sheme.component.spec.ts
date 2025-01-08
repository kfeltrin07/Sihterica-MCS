import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelShemeComponent } from './excel-sheme.component';

describe('ExcelShemeComponent', () => {
  let component: ExcelShemeComponent;
  let fixture: ComponentFixture<ExcelShemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcelShemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcelShemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
