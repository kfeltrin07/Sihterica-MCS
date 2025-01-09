import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGrupeComponent } from './details-grupe.component';

describe('DetailsGrupeComponent', () => {
  let component: DetailsGrupeComponent;
  let fixture: ComponentFixture<DetailsGrupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsGrupeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsGrupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
