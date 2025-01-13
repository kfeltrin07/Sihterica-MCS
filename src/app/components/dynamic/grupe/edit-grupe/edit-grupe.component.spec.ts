import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGrupeComponent } from './edit-grupe.component';

describe('EditGrupeComponent', () => {
  let component: EditGrupeComponent;
  let fixture: ComponentFixture<EditGrupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditGrupeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditGrupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
