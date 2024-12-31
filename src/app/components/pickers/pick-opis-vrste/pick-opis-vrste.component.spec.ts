import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickOpisVrsteComponent } from './pick-opis-vrste.component';

describe('PickOpisVrsteComponent', () => {
  let component: PickOpisVrsteComponent;
  let fixture: ComponentFixture<PickOpisVrsteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickOpisVrsteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickOpisVrsteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
