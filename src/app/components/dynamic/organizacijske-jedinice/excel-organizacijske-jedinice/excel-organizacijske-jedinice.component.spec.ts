import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelOrganizacijskeJediniceComponent } from './excel-organizacijske-jedinice.component';

describe('ExcelOrganizacijskeJediniceComponent', () => {
  let component: ExcelOrganizacijskeJediniceComponent;
  let fixture: ComponentFixture<ExcelOrganizacijskeJediniceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcelOrganizacijskeJediniceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcelOrganizacijskeJediniceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
