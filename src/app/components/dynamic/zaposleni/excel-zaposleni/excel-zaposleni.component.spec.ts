import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelZaposleniComponent } from './excel-zaposleni.component';

describe('ExcelZaposleniComponent', () => {
  let component: ExcelZaposleniComponent;
  let fixture: ComponentFixture<ExcelZaposleniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcelZaposleniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcelZaposleniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
