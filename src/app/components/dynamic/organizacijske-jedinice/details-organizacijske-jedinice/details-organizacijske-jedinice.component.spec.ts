import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOrganizacijskeJediniceComponent } from './details-organizacijske-jedinice.component';

describe('DetailsOrganizacijskeJediniceComponent', () => {
  let component: DetailsOrganizacijskeJediniceComponent;
  let fixture: ComponentFixture<DetailsOrganizacijskeJediniceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsOrganizacijskeJediniceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsOrganizacijskeJediniceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
