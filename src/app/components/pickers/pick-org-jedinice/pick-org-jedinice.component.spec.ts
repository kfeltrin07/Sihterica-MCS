import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickOrgJediniceComponent } from './pick-org-jedinice.component';

describe('PickOrgJediniceComponent', () => {
  let component: PickOrgJediniceComponent;
  let fixture: ComponentFixture<PickOrgJediniceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickOrgJediniceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickOrgJediniceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
