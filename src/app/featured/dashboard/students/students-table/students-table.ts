import { Component, ViewChild } from '@angular/core';
import { Student } from '../../../../core/services/students/model/Student';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StudentsService } from '../../../../core/services/students/students';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../core/store';
import { selectUser } from '../../../../core/store/auth/auth.selector';

@Component({
  selector: 'app-students-table',
  standalone: false,
  templateUrl: './students-table.html',
  styleUrls: ['./students-table.css'],
})
export class StudentsTable {
  role: string = '';

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Student>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private studentService: StudentsService,
    private store: Store<RootState>
  ) {}

  ngOnInit() {

   
    this.store.select(selectUser).subscribe(user => {
      if (user) {
        this.role = user.role;
        this.setDisplayedColumns(); 
      }
    });

    
    this.studentService.getStudents();
    this.studentService.students$.subscribe({
      next: (students) => (this.dataSource.data = students),
      error: (error) => console.error(error),
    });
  }

 
  setDisplayedColumns() {
    this.displayedColumns = [
      'id',
      'name',
      'email',
      'birthDate',
      'status',
    ];

    if (this.role === 'ADMIN') {
      this.displayedColumns.push('actions');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onDeleteStudent(id: number) {
    this.studentService.deleteStudent(id);
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = value;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
