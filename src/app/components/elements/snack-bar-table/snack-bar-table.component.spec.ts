import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarTableComponent } from './snack-bar-table.component';

describe('SnackBarTableComponent', () => {
  let component: SnackBarTableComponent;
  let fixture: ComponentFixture<SnackBarTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackBarTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnackBarTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
