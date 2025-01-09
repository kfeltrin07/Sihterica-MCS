import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGrupeComponent } from './create-grupe.component';

describe('CreateGrupeComponent', () => {
  let component: CreateGrupeComponent;
  let fixture: ComponentFixture<CreateGrupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGrupeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateGrupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
