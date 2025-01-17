import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyDnevnaEvidencijaComponent } from './copy-dnevna-evidencija.component';

describe('CopyDnevnaEvidencijaComponent', () => {
  let component: CopyDnevnaEvidencijaComponent;
  let fixture: ComponentFixture<CopyDnevnaEvidencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyDnevnaEvidencijaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopyDnevnaEvidencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
