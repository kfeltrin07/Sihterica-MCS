import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfOvlasteneOsobeMjTrComponent } from './pdf-ovlastene-osobe-mj-tr.component';

describe('PdfOvlasteneOsobeMjTrComponent', () => {
  let component: PdfOvlasteneOsobeMjTrComponent;
  let fixture: ComponentFixture<PdfOvlasteneOsobeMjTrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfOvlasteneOsobeMjTrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfOvlasteneOsobeMjTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
