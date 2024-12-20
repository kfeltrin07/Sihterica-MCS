import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteZaposleniComponent } from './delete-zaposleni.component';

describe('DeleteZaposleniComponent', () => {
  let component: DeleteZaposleniComponent;
  let fixture: ComponentFixture<DeleteZaposleniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteZaposleniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteZaposleniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
