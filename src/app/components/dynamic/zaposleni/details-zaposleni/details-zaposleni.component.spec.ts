import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsZaposleniComponent } from './details-zaposleni.component';

describe('DetailsZaposleniComponent', () => {
  let component: DetailsZaposleniComponent;
  let fixture: ComponentFixture<DetailsZaposleniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsZaposleniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsZaposleniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
