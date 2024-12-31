import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOvlasteneOsobeMjTrComponent } from './delete-ovlastene-osobe-mj-tr.component';

describe('DeleteOvlasteneOsobeMjTrComponent', () => {
  let component: DeleteOvlasteneOsobeMjTrComponent;
  let fixture: ComponentFixture<DeleteOvlasteneOsobeMjTrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteOvlasteneOsobeMjTrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteOvlasteneOsobeMjTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
