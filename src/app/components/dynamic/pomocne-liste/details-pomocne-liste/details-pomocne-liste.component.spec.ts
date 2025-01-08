import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPomocneListeComponent } from './details-pomocne-liste.component';

describe('DetailsPomocneListeComponent', () => {
  let component: DetailsPomocneListeComponent;
  let fixture: ComponentFixture<DetailsPomocneListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPomocneListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsPomocneListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
