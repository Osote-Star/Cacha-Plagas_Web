import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTrampasComponent } from './ver-trampas.component';

describe('VerTrampasComponent', () => {
  let component: VerTrampasComponent;
  let fixture: ComponentFixture<VerTrampasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerTrampasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerTrampasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
