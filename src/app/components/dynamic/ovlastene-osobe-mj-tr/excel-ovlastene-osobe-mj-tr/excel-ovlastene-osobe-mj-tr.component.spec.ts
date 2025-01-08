import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelOvlasteneOsobeMjTrComponent } from './excel-ovlastene-osobe-mj-tr.component';

describe('ExcelOvlasteneOsobeMjTrComponent', () => {
  let component: ExcelOvlasteneOsobeMjTrComponent;
  let fixture: ComponentFixture<ExcelOvlasteneOsobeMjTrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcelOvlasteneOsobeMjTrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcelOvlasteneOsobeMjTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
