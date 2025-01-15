import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnevnaEvidencijaComponent } from './dnevna-evidencija.component';

describe('DnevnaEvidencijaComponent', () => {
  let component: DnevnaEvidencijaComponent;
  let fixture: ComponentFixture<DnevnaEvidencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DnevnaEvidencijaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DnevnaEvidencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
