import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGrupeComponent } from './delete-grupe.component';

describe('DeleteGrupeComponent', () => {
  let component: DeleteGrupeComponent;
  let fixture: ComponentFixture<DeleteGrupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteGrupeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteGrupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
