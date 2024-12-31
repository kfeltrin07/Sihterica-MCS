import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickZaposleniComponent } from './pick-zaposleni.component';

describe('PickZaposleniComponent', () => {
  let component: PickZaposleniComponent;
  let fixture: ComponentFixture<PickZaposleniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickZaposleniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickZaposleniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
