import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDnevnaEvidencijaComponent } from './delete-dnevna-evidencija.component';

describe('DeleteDnevnaEvidencijaComponent', () => {
  let component: DeleteDnevnaEvidencijaComponent;
  let fixture: ComponentFixture<DeleteDnevnaEvidencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDnevnaEvidencijaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteDnevnaEvidencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
