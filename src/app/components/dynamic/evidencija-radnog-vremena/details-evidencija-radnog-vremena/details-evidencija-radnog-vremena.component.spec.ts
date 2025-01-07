import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEvidencijaRadnogVremenaComponent } from './details-evidencija-radnog-vremena.component';

describe('DetailsEvidencijaRadnogVremenaComponent', () => {
  let component: DetailsEvidencijaRadnogVremenaComponent;
  let fixture: ComponentFixture<DetailsEvidencijaRadnogVremenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsEvidencijaRadnogVremenaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsEvidencijaRadnogVremenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
