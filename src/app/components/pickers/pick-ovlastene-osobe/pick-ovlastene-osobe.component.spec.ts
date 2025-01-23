import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickOvlasteneOsobeComponent } from './pick-ovlastene-osobe.component';

describe('PickOvlasteneOsobeComponent', () => {
  let component: PickOvlasteneOsobeComponent;
  let fixture: ComponentFixture<PickOvlasteneOsobeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickOvlasteneOsobeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickOvlasteneOsobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
