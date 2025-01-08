import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelEvidencijaRadnogVremenaZaglavljeVezeComponent } from './excel-evidencija-radnog-vremena-zaglavlje-veze.component';

describe('ExcelEvidencijaRadnogVremenaZaglavljeVezeComponent', () => {
  let component: ExcelEvidencijaRadnogVremenaZaglavljeVezeComponent;
  let fixture: ComponentFixture<ExcelEvidencijaRadnogVremenaZaglavljeVezeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcelEvidencijaRadnogVremenaZaglavljeVezeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcelEvidencijaRadnogVremenaZaglavljeVezeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
