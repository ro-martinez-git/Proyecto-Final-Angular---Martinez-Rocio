import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionDialog } from './inscripcion-dialog';

describe('InscripcionDialog', () => {
  let component: InscripcionDialog;
  let fixture: ComponentFixture<InscripcionDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscripcionDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
