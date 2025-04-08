import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarcontrasenaComponent } from './cambiarcontrasena.component';

describe('CambiarcontrasenaComponent', () => {
  let component: CambiarcontrasenaComponent;
  let fixture: ComponentFixture<CambiarcontrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambiarcontrasenaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiarcontrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
