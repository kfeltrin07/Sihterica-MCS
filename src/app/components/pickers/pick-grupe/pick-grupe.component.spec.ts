import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickGrupeComponent } from './pick-grupe.component';

describe('PickGrupeComponent', () => {
  let component: PickGrupeComponent;
  let fixture: ComponentFixture<PickGrupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickGrupeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickGrupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
