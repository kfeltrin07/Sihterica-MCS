import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniComponent } from './zaposleni.component';

describe('ZaposleniComponent', () => {
  let component: ZaposleniComponent;
  let fixture: ComponentFixture<ZaposleniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZaposleniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZaposleniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
