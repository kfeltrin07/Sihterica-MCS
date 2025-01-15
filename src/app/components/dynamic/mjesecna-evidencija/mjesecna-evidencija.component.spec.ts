import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MjesecnaEvidencijaComponent } from './mjesecna-evidencija.component';

describe('MjesecnaEvidencijaComponent', () => {
  let component: MjesecnaEvidencijaComponent;
  let fixture: ComponentFixture<MjesecnaEvidencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MjesecnaEvidencijaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MjesecnaEvidencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
