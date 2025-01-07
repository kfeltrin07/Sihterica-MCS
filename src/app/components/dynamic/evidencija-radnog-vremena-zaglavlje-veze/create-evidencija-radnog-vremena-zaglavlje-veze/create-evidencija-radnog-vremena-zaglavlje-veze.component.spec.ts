import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEvidencijaRadnogVremenaZaglavljeVezeComponent } from './create-evidencija-radnog-vremena-zaglavlje-veze.component';

describe('CreateEvidencijaRadnogVremenaZaglavljeVezeComponent', () => {
  let component: CreateEvidencijaRadnogVremenaZaglavljeVezeComponent;
  let fixture: ComponentFixture<CreateEvidencijaRadnogVremenaZaglavljeVezeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEvidencijaRadnogVremenaZaglavljeVezeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEvidencijaRadnogVremenaZaglavljeVezeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
