import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarRekapitulacijaDnevnaComponent } from './snack-bar-rekapitulacija-dnevna.component';

describe('SnackBarRekapitulacijaDnevnaComponent', () => {
  let component: SnackBarRekapitulacijaDnevnaComponent;
  let fixture: ComponentFixture<SnackBarRekapitulacijaDnevnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackBarRekapitulacijaDnevnaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnackBarRekapitulacijaDnevnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
