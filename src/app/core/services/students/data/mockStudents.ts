import { Student, StudentStatus } from '../model/Student';

export const mockStudents: Student[] = [
  {
    id: 1,
    name: 'Ana López',
    email: 'ana.lopez@example.com',
    birthDate: new Date('1995-04-12'),
    status: StudentStatus.ACTIVE,
  },
  {
    id: 2,
    name: 'Carlos Pérez',
    email: 'carlos.perez@example.com',
    birthDate: new Date('1990-07-22'),
    status: StudentStatus.SUSPENDED,
  },
  {
    id: 3,
    name: 'Lucía Fernández',
    email: 'lucia.fernandez@example.com',
    birthDate: new Date('1998-11-03'),
    status: StudentStatus.GRADUATED,
  },
];
