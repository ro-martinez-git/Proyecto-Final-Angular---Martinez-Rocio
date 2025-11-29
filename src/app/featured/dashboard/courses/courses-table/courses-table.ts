import { Component, ViewChild } from '@angular/core';
import { Course } from '../../../../core/services/courses/model/Course';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CoursesService } from '../../../../core/services/courses/courses';
import { RootState } from '../../../../core/store';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CoursesActions } from '../store/courses.actions';
import { selectCourses, selectCoursesLoading, selectCoursesError } from '../store/courses.selector';
import { selectUser } from '../../../../core/store/auth/auth.selector';

@Component({
  selector: 'app-courses-table',
  standalone: false,
  templateUrl: './courses-table.html',
  styleUrls: ['./courses-table.css'],
})
export class CoursesTable {
  role: string = '';

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Course>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(
    private courseService: CoursesService,
    private store: Store<RootState>
  ) {
    this.courses$ = this.store.select(selectCourses);
    this.isLoading$ = this.store.select(selectCoursesLoading);
    this.error$ = this.store.select(selectCoursesError);
  }

  ngOnInit() {


    this.store.select(selectUser).subscribe(user => {
      if (user) {
        this.role = user.role;
        this.setDisplayedColumns();
      }
    });

    this.store.dispatch(CoursesActions.loadCourses());

    this.courses$.subscribe({
      next: (courses) => (this.dataSource.data = courses),
      error: (error) => console.error(error),
    });
  }

  setDisplayedColumns() {
    this.displayedColumns = [
      'id',
      'title',
      'description',
      'beginDate',
      'endDate',
      'status',
    ];

    if (this.role === 'ADMIN') {
      this.displayedColumns.push('actions');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onDeleteCourse(id: number) {
    this.courseService.deleteCourse(id);
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = value;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
