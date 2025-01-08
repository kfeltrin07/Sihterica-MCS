import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsKontrolaFondaSatiComponent } from './details-kontrola-fonda-sati.component';

describe('DetailsKontrolaFondaSatiComponent', () => {
  let component: DetailsKontrolaFondaSatiComponent;
  let fixture: ComponentFixture<DetailsKontrolaFondaSatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsKontrolaFondaSatiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsKontrolaFondaSatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
