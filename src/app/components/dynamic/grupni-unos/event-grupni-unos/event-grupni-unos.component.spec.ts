import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGrupniUnosComponent } from './event-grupni-unos.component';

describe('EventGrupniUnosComponent', () => {
  let component: EventGrupniUnosComponent;
  let fixture: ComponentFixture<EventGrupniUnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventGrupniUnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventGrupniUnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
