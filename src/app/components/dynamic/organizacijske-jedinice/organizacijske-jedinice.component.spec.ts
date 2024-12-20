import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizacijskeJediniceComponent } from './organizacijske-jedinice.component';

describe('OrganizacijskeJediniceComponent', () => {
  let component: OrganizacijskeJediniceComponent;
  let fixture: ComponentFixture<OrganizacijskeJediniceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizacijskeJediniceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizacijskeJediniceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
