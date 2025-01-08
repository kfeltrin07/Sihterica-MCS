import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KontrolaFondaSatiComponent } from './kontrola-fonda-sati.component';

describe('KontrolaFondaSatiComponent', () => {
  let component: KontrolaFondaSatiComponent;
  let fixture: ComponentFixture<KontrolaFondaSatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KontrolaFondaSatiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KontrolaFondaSatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
