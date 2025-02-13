import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarGrupniUnosRadnikaComponent } from './snack-bar-grupni-unos-radnika.component';

describe('SnackBarGrupniUnosRadnikaComponent', () => {
  let component: SnackBarGrupniUnosRadnikaComponent;
  let fixture: ComponentFixture<SnackBarGrupniUnosRadnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackBarGrupniUnosRadnikaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnackBarGrupniUnosRadnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
