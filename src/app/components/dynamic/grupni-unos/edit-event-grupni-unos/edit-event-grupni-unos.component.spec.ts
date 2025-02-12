import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventGrupniUnosComponent } from './edit-event-grupni-unos.component';

describe('EditEventGrupniUnosComponent', () => {
  let component: EditEventGrupniUnosComponent;
  let fixture: ComponentFixture<EditEventGrupniUnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEventGrupniUnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEventGrupniUnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
