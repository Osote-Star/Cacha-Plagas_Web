import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTrampaComponent } from './agregar-trampa.component';

describe('AgregarTrampaComponent', () => {
  let component: AgregarTrampaComponent;
  let fixture: ComponentFixture<AgregarTrampaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarTrampaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTrampaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
