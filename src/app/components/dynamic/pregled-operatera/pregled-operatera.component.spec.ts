import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledOperateraComponent } from './pregled-operatera.component';

describe('PregledOperateraComponent', () => {
  let component: PregledOperateraComponent;
  let fixture: ComponentFixture<PregledOperateraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PregledOperateraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PregledOperateraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
