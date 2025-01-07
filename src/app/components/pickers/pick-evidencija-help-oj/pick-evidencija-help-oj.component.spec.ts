import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickEvidencijaHelpOjComponent } from './pick-evidencija-help-oj.component';

describe('PickEvidencijaHelpOjComponent', () => {
  let component: PickEvidencijaHelpOjComponent;
  let fixture: ComponentFixture<PickEvidencijaHelpOjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickEvidencijaHelpOjComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickEvidencijaHelpOjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
