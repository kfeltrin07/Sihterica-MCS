import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEvidencijaRadnogVremenaZaglavljeComponent } from './details-evidencija-radnog-vremena-zaglavlje.component';

describe('DetailsEvidencijaRadnogVremenaZaglavljeComponent', () => {
  let component: DetailsEvidencijaRadnogVremenaZaglavljeComponent;
  let fixture: ComponentFixture<DetailsEvidencijaRadnogVremenaZaglavljeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsEvidencijaRadnogVremenaZaglavljeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsEvidencijaRadnogVremenaZaglavljeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
