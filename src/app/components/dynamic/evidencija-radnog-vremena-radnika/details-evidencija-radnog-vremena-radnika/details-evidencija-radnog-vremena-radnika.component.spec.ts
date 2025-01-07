import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEvidencijaRadnogVremenaRadnikaComponent } from './details-evidencija-radnog-vremena-radnika.component';

describe('DetailsEvidencijaRadnogVremenaRadnikaComponent', () => {
  let component: DetailsEvidencijaRadnogVremenaRadnikaComponent;
  let fixture: ComponentFixture<DetailsEvidencijaRadnogVremenaRadnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsEvidencijaRadnogVremenaRadnikaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsEvidencijaRadnogVremenaRadnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
