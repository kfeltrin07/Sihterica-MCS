import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrstePoslaPdfComponent } from './vrste-posla-pdf.component';

describe('VrstePoslaPdfComponent', () => {
  let component: VrstePoslaPdfComponent;
  let fixture: ComponentFixture<VrstePoslaPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VrstePoslaPdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VrstePoslaPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
