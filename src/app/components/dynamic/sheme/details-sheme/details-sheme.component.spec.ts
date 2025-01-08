import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsShemeComponent } from './details-sheme.component';

describe('DetailsShemeComponent', () => {
  let component: DetailsShemeComponent;
  let fixture: ComponentFixture<DetailsShemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsShemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsShemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
