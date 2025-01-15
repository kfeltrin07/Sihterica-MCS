import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMjesecnaEvidencijaComponent } from './details-mjesecna-evidencija.component';

describe('DetailsMjesecnaEvidencijaComponent', () => {
  let component: DetailsMjesecnaEvidencijaComponent;
  let fixture: ComponentFixture<DetailsMjesecnaEvidencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsMjesecnaEvidencijaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsMjesecnaEvidencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
