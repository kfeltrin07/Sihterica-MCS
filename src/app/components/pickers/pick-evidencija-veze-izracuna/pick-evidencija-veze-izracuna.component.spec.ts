import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickEvidencijaVezeIzracunaComponent } from './pick-evidencija-veze-izracuna.component';

describe('PickEvidencijaVezeIzracunaComponent', () => {
  let component: PickEvidencijaVezeIzracunaComponent;
  let fixture: ComponentFixture<PickEvidencijaVezeIzracunaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickEvidencijaVezeIzracunaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickEvidencijaVezeIzracunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
