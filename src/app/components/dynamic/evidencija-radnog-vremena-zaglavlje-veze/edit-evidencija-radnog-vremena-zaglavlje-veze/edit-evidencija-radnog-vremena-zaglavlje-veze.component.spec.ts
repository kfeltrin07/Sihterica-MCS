import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEvidencijaRadnogVremenaZaglavljeVezeComponent } from './edit-evidencija-radnog-vremena-zaglavlje-veze.component';

describe('EditEvidencijaRadnogVremenaZaglavljeVezeComponent', () => {
  let component: EditEvidencijaRadnogVremenaZaglavljeVezeComponent;
  let fixture: ComponentFixture<EditEvidencijaRadnogVremenaZaglavljeVezeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEvidencijaRadnogVremenaZaglavljeVezeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEvidencijaRadnogVremenaZaglavljeVezeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
