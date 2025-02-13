import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarRekapitulacijaMjesecnaComponent } from './snack-bar-rekapitulacija-mjesecna.component';

describe('SnackBarRekapitulacijaMjesecnaComponent', () => {
  let component: SnackBarRekapitulacijaMjesecnaComponent;
  let fixture: ComponentFixture<SnackBarRekapitulacijaMjesecnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackBarRekapitulacijaMjesecnaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnackBarRekapitulacijaMjesecnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
