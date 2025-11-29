import { Validators } from '@angular/forms';

export const studentFormGroup = {
  id: [null], 
  name: ['', [Validators.required, Validators.minLength(3)]],
  email: ['', [Validators.required, Validators.email]],
  birthDate: ['', Validators.required],
  status: ['', Validators.required],
};
