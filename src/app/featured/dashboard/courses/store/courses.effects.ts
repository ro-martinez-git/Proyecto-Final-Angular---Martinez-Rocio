import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, delay, map } from 'rxjs/operators';
import { CoursesActions } from './courses.actions';
import { CoursesService } from '../../../../core/services/courses/courses';


@Injectable()
export class CoursesEffect {

  loadCourses$ = createEffect(() =>
     this.actions$.pipe(
      ofType(CoursesActions.loadCourses),
      concatMap(() =>
        this.coursesService.getCoursesForEffect().pipe(
           delay(Math.random() * 2000),

          map((courses) => {
            console.log('Loaded courses:', courses);
            return CoursesActions.loadCoursesSuccess({ courses })
        }),
          catchError((error) => [CoursesActions.loadCoursesFailure({ error })])
        )
      )
    )
  )
   constructor(private coursesService: CoursesService, private actions$: Actions) {
    this.actions$ = inject(Actions);
  }
}
