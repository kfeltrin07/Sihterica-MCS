import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVrstePoslaComponent } from './details-vrste-posla.component';

describe('DetailsVrstePoslaComponent', () => {
  let component: DetailsVrstePoslaComponent;
  let fixture: ComponentFixture<DetailsVrstePoslaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsVrstePoslaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsVrstePoslaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
