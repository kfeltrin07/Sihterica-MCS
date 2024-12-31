import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizacijskeJedinicePdfComponent } from './organizacijske-jedinice-pdf.component';

describe('OrganizacijskeJedinicePdfComponent', () => {
  let component: OrganizacijskeJedinicePdfComponent;
  let fixture: ComponentFixture<OrganizacijskeJedinicePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizacijskeJedinicePdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizacijskeJedinicePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
