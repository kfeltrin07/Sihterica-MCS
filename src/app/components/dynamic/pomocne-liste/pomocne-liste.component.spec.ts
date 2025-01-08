import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomocneListeComponent } from './pomocne-liste.component';

describe('PomocneListeComponent', () => {
  let component: PomocneListeComponent;
  let fixture: ComponentFixture<PomocneListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PomocneListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PomocneListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
