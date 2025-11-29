import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from '../students-routing-module';
import { SharedModule } from '../../../../shared/shared-module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { StudentsTable } from './students-table';

describe('StudentsTable', () => {
  let component: StudentsTable;
  let fixture: ComponentFixture<StudentsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsTable],
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

    fixture = TestBed.createComponent(StudentsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
