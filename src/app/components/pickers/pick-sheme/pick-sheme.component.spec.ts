import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickShemeComponent } from './pick-sheme.component';

describe('PickShemeComponent', () => {
  let component: PickShemeComponent;
  let fixture: ComponentFixture<PickShemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickShemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickShemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
