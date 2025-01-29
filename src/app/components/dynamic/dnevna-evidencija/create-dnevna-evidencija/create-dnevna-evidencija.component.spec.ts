import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDnevnaEvidencijaComponent } from './create-dnevna-evidencija.component';

describe('CreateDnevnaEvidencijaComponent', () => {
  let component: CreateDnevnaEvidencijaComponent;
  let fixture: ComponentFixture<CreateDnevnaEvidencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDnevnaEvidencijaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDnevnaEvidencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
