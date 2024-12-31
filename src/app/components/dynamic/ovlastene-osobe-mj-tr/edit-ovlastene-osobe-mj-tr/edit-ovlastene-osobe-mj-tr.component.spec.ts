import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOvlasteneOsobeMjTrComponent } from './edit-ovlastene-osobe-mj-tr.component';

describe('EditOvlasteneOsobeMjTrComponent', () => {
  let component: EditOvlasteneOsobeMjTrComponent;
  let fixture: ComponentFixture<EditOvlasteneOsobeMjTrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditOvlasteneOsobeMjTrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditOvlasteneOsobeMjTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
