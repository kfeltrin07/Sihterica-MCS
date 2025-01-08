import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShemeComponent } from './sheme.component';

describe('ShemeComponent', () => {
  let component: ShemeComponent;
  let fixture: ComponentFixture<ShemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
