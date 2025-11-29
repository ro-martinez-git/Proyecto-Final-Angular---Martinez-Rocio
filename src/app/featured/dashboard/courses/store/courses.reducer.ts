import { createFeature, createReducer, on } from '@ngrx/store';
import { Course } from '../../../../core/services/courses/model/Course';
import { CoursesActions } from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
  courses: Course[];
  isLoading: boolean;
  error: any;
}

export const initialCoursesState: CoursesState = {
  courses: [],
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialCoursesState,
  on(CoursesActions.loadCourses, (state): CoursesState => ({
    ...state,
    isLoading: true,
  })),
  on(CoursesActions.loadCoursesSuccess, (state, { courses }): CoursesState => ({
    ...state,
    isLoading: false,
    courses,
  })),
  on(CoursesActions.loadCoursesFailure, (state, { error }): CoursesState => ({
    ...state,
    isLoading: false,
  }))
);

export const CoursesFeature = createFeature({
    name: coursesFeatureKey,
    reducer,
});
