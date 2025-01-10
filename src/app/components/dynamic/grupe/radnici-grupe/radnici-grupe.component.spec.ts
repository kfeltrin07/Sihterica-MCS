import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadniciGrupeComponent } from './radnici-grupe.component';

describe('RadniciGrupeComponent', () => {
  let component: RadniciGrupeComponent;
  let fixture: ComponentFixture<RadniciGrupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadniciGrupeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadniciGrupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
