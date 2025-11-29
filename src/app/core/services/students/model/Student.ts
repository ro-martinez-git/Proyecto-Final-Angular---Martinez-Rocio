export enum StudentStatus {
  ACTIVE = 'activo',
  SUSPENDED = 'suspendido',
  GRADUATED = 'graduado',
}

export interface Student {
  id: number;
  name: string;
  email: string;
  birthDate: Date;
  status: StudentStatus;
}

export const StudentColumns: string[] = [
  'id',
  'name',
  'email',
  'birthDate',
  'status',
  'actions',
];
