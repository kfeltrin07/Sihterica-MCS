import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniPdfComponent } from './zaposleni-pdf.component';

describe('ZaposleniPdfComponent', () => {
  let component: ZaposleniPdfComponent;
  let fixture: ComponentFixture<ZaposleniPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZaposleniPdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZaposleniPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
