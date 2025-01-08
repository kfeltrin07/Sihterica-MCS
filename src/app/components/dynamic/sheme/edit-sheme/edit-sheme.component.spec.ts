import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShemeComponent } from './edit-sheme.component';

describe('EditShemeComponent', () => {
  let component: EditShemeComponent;
  let fixture: ComponentFixture<EditShemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditShemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditShemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
