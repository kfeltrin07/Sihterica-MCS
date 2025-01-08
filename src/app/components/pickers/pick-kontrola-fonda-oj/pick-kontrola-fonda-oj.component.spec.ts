import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickKontrolaFondaOjComponent } from './pick-kontrola-fonda-oj.component';

describe('PickKontrolaFondaOjComponent', () => {
  let component: PickKontrolaFondaOjComponent;
  let fixture: ComponentFixture<PickKontrolaFondaOjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickKontrolaFondaOjComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickKontrolaFondaOjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
