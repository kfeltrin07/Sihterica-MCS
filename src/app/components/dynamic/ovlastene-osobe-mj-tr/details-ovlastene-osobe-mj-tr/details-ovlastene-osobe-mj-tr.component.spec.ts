import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOvlasteneOsobeMjTrComponent } from './details-ovlastene-osobe-mj-tr.component';

describe('DetailsOvlasteneOsobeMjTrComponent', () => {
  let component: DetailsOvlasteneOsobeMjTrComponent;
  let fixture: ComponentFixture<DetailsOvlasteneOsobeMjTrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsOvlasteneOsobeMjTrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsOvlasteneOsobeMjTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
