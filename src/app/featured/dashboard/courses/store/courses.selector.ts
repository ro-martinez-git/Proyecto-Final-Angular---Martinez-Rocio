import { createFeatureSelector, createSelector } from "@ngrx/store";
import { coursesFeatureKey, CoursesState } from "./courses.reducer";

const selectCoursesState = createFeatureSelector<CoursesState>(coursesFeatureKey);

export const selectCourses = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.courses
)

export const selectCoursesLoading = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.isLoading
)
export const selectCoursesError = createSelector(   
    selectCoursesState,
    (state: CoursesState) => state.error
)