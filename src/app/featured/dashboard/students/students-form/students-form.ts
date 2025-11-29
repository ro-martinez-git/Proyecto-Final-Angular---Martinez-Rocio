import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../../../core/services/students/students';
import { studentFormGroup } from './validators';

@Component({
  selector: 'app-students-form',
  standalone: false,
  templateUrl: './students-form.html',
  styleUrl: './students-form.css',
})
export class StudentsForm {
  createForm: FormGroup;
  studentId: number | null = null;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private router: Router
  ) {
    this.createForm = this.fb.group(studentFormGroup);

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.studentId = Number(params['id']);
        this.isEditing = true;
        this.studentsService.getStudent(this.studentId).subscribe((student) => {
          if (student) {
            this.createForm.patchValue(student); 
          }
        });
      }
    });
  }

  onSubmit(): void {
    const studentData = this.createForm.value;

    if (this.isEditing) {
      this.studentsService.updateStudent(studentData);
    } else {
      this.studentsService.addStudent(studentData);
    }

    this.createForm.reset();
    this.router.navigate(['dashboard', 'students']);
  }

  inputValid(inputName: 'name' | 'email' | 'birthDate' | 'status') {
    return this.createForm.get(inputName)?.valid && this.createForm.get(inputName)?.touched;
  }

  inputInvalid(inputName: 'name' | 'email' | 'birthDate' | 'status') {
    return (
      this.createForm.get(inputName)?.invalid &&
      this.createForm.get(inputName)?.touched &&
      this.createForm.get(inputName)?.dirty
    );
  }

  getError(inputName: 'name' | 'email' | 'birthDate' | 'status') {
    const controlErrors = this.createForm.get(inputName)?.errors;
    if (!controlErrors) return null;

    const errors = Object.keys(controlErrors);
    if (errors.length === 0) return null;

    let message = '';
    errors.forEach((error) => {
      switch (error) {
        case 'required':
          message += 'Este campo es requerido';
          break;
        case 'minlength':
          message += 'Este campo debe tener al menos 3 caracteres';
          break;
        case 'email':
          message += 'Debe ser un email válido';
          break;
      }
    });

    return message;
  }
}
