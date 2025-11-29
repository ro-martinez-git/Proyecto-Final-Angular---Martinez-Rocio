import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from '../students-routing-module';
import { SharedModule } from '../../../../shared/shared-module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { StudentsForm } from './students-form';

describe('StudentsForm', () => {
  let component: StudentsForm;
  let fixture: ComponentFixture<StudentsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsForm],
      imports: [ CommonModule, StudentsRoutingModule, SharedModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: {
              params: {
                get: () => null,
              },
            },
          },
        },
        provideHttpClient(withFetch()),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
