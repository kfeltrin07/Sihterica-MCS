import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEvidencijaRadnogVremenaZaglavljeComponent } from './edit-evidencija-radnog-vremena-zaglavlje.component';

describe('EditEvidencijaRadnogVremenaZaglavljeComponent', () => {
  let component: EditEvidencijaRadnogVremenaZaglavljeComponent;
  let fixture: ComponentFixture<EditEvidencijaRadnogVremenaZaglavljeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEvidencijaRadnogVremenaZaglavljeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEvidencijaRadnogVremenaZaglavljeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
