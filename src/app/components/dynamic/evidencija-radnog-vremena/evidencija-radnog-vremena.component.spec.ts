import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidencijaRadnogVremenaComponent } from './evidencija-radnog-vremena.component';

describe('EvidencijaRadnogVremenaComponent', () => {
  let component: EvidencijaRadnogVremenaComponent;
  let fixture: ComponentFixture<EvidencijaRadnogVremenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvidencijaRadnogVremenaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvidencijaRadnogVremenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
