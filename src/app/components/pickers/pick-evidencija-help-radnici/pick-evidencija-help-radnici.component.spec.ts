import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickEvidencijaHelpRadniciComponent } from './pick-evidencija-help-radnici.component';

describe('PickEvidencijaHelpRadniciComponent', () => {
  let component: PickEvidencijaHelpRadniciComponent;
  let fixture: ComponentFixture<PickEvidencijaHelpRadniciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickEvidencijaHelpRadniciComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickEvidencijaHelpRadniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
