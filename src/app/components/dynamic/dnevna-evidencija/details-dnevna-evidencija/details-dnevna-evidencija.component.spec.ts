import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDnevnaEvidencijaComponent } from './details-dnevna-evidencija.component';

describe('DetailsDnevnaEvidencijaComponent', () => {
  let component: DetailsDnevnaEvidencijaComponent;
  let fixture: ComponentFixture<DetailsDnevnaEvidencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsDnevnaEvidencijaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsDnevnaEvidencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
