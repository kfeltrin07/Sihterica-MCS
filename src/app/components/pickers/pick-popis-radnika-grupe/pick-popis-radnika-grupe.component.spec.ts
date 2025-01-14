import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickPopisRadnikaGrupeComponent } from './pick-popis-radnika-grupe.component';

describe('PickPopisRadnikaGrupeComponent', () => {
  let component: PickPopisRadnikaGrupeComponent;
  let fixture: ComponentFixture<PickPopisRadnikaGrupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickPopisRadnikaGrupeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickPopisRadnikaGrupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
