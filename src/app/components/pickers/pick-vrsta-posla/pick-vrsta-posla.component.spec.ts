import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickVrstaPoslaComponent } from './pick-vrsta-posla.component';

describe('PickVrstaPoslaComponent', () => {
  let component: PickVrstaPoslaComponent;
  let fixture: ComponentFixture<PickVrstaPoslaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickVrstaPoslaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickVrstaPoslaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
