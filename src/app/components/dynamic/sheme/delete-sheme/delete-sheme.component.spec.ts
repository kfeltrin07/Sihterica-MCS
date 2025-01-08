import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteShemeComponent } from './delete-sheme.component';

describe('DeleteShemeComponent', () => {
  let component: DeleteShemeComponent;
  let fixture: ComponentFixture<DeleteShemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteShemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteShemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
