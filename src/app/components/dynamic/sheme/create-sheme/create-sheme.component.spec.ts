import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShemeComponent } from './create-sheme.component';

describe('CreateShemeComponent', () => {
  let component: CreateShemeComponent;
  let fixture: ComponentFixture<CreateShemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateShemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateShemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
