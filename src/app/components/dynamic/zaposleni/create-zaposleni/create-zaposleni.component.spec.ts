import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateZaposleniComponent } from './create-zaposleni.component';

describe('CreateZaposleniComponent', () => {
  let component: CreateZaposleniComponent;
  let fixture: ComponentFixture<CreateZaposleniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateZaposleniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateZaposleniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
