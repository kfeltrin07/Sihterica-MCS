import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMjesecnaEvidencijaComponent } from './delete-mjesecna-evidencija.component';

describe('DeleteMjesecnaEvidencijaComponent', () => {
  let component: DeleteMjesecnaEvidencijaComponent;
  let fixture: ComponentFixture<DeleteMjesecnaEvidencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteMjesecnaEvidencijaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteMjesecnaEvidencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
