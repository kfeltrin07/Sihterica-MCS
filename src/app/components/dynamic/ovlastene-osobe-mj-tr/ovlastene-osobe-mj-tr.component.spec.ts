import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvlasteneOsobeMjTrComponent } from './ovlastene-osobe-mj-tr.component';

describe('OvlasteneOsobeMjTrComponent', () => {
  let component: OvlasteneOsobeMjTrComponent;
  let fixture: ComponentFixture<OvlasteneOsobeMjTrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OvlasteneOsobeMjTrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OvlasteneOsobeMjTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
