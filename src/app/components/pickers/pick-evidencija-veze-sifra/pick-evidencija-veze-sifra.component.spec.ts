import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickEvidencijaVezeSifraComponent } from './pick-evidencija-veze-sifra.component';

describe('PickEvidencijaVezeSifraComponent', () => {
  let component: PickEvidencijaVezeSifraComponent;
  let fixture: ComponentFixture<PickEvidencijaVezeSifraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickEvidencijaVezeSifraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickEvidencijaVezeSifraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
