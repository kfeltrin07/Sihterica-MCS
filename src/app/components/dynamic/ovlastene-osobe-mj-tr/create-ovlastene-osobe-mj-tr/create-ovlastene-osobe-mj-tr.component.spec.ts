import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOvlasteneOsobeMjTrComponent } from './create-ovlastene-osobe-mj-tr.component';

describe('CreateOvlasteneOsobeMjTrComponent', () => {
  let component: CreateOvlasteneOsobeMjTrComponent;
  let fixture: ComponentFixture<CreateOvlasteneOsobeMjTrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOvlasteneOsobeMjTrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOvlasteneOsobeMjTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
