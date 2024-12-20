import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrstePoslaComponent } from './vrste-posla.component';

describe('VrstePoslaComponent', () => {
  let component: VrstePoslaComponent;
  let fixture: ComponentFixture<VrstePoslaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VrstePoslaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VrstePoslaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
