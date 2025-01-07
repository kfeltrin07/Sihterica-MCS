import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEvidencijaRadnogVremenaZaglavljeVezeComponent } from './delete-evidencija-radnog-vremena-zaglavlje-veze.component';

describe('DeleteEvidencijaRadnogVremenaZaglavljeVezeComponent', () => {
  let component: DeleteEvidencijaRadnogVremenaZaglavljeVezeComponent;
  let fixture: ComponentFixture<DeleteEvidencijaRadnogVremenaZaglavljeVezeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteEvidencijaRadnogVremenaZaglavljeVezeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteEvidencijaRadnogVremenaZaglavljeVezeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
