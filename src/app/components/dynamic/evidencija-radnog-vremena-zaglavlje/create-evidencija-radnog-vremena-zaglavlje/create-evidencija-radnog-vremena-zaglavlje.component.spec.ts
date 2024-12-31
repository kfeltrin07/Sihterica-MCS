import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEvidencijaRadnogVremenaZaglavljeComponent } from './create-evidencija-radnog-vremena-zaglavlje.component';

describe('CreateEvidencijaRadnogVremenaZaglavljeComponent', () => {
  let component: CreateEvidencijaRadnogVremenaZaglavljeComponent;
  let fixture: ComponentFixture<CreateEvidencijaRadnogVremenaZaglavljeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEvidencijaRadnogVremenaZaglavljeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEvidencijaRadnogVremenaZaglavljeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
