import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidencijaRadnogVremenaRadnikaComponent } from './evidencija-radnog-vremena-radnika.component';

describe('EvidencijaRadnogVremenaRadnikaComponent', () => {
  let component: EvidencijaRadnogVremenaRadnikaComponent;
  let fixture: ComponentFixture<EvidencijaRadnogVremenaRadnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvidencijaRadnogVremenaRadnikaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvidencijaRadnogVremenaRadnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
