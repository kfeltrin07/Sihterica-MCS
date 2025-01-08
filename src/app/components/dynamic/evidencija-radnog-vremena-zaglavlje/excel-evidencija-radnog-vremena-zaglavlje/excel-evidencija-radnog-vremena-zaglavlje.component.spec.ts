import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelEvidencijaRadnogVremenaZaglavljeComponent } from './excel-evidencija-radnog-vremena-zaglavlje.component';

describe('ExcelEvidencijaRadnogVremenaZaglavljeComponent', () => {
  let component: ExcelEvidencijaRadnogVremenaZaglavljeComponent;
  let fixture: ComponentFixture<ExcelEvidencijaRadnogVremenaZaglavljeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcelEvidencijaRadnogVremenaZaglavljeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcelEvidencijaRadnogVremenaZaglavljeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
