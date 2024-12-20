import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPregledOperateraComponent } from './details-pregled-operatera.component';

describe('DetailsPregledOperateraComponent', () => {
  let component: DetailsPregledOperateraComponent;
  let fixture: ComponentFixture<DetailsPregledOperateraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPregledOperateraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsPregledOperateraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
