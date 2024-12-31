import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEvidencijaRadnogVremenaZaglavljeComponent } from './delete-evidencija-radnog-vremena-zaglavlje.component';

describe('DeleteEvidencijaRadnogVremenaZaglavljeComponent', () => {
  let component: DeleteEvidencijaRadnogVremenaZaglavljeComponent;
  let fixture: ComponentFixture<DeleteEvidencijaRadnogVremenaZaglavljeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteEvidencijaRadnogVremenaZaglavljeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteEvidencijaRadnogVremenaZaglavljeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
