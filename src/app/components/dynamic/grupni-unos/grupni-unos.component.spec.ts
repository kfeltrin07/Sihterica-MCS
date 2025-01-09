import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupniUnosComponent } from './grupni-unos.component';

describe('GrupniUnosComponent', () => {
  let component: GrupniUnosComponent;
  let fixture: ComponentFixture<GrupniUnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupniUnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrupniUnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
