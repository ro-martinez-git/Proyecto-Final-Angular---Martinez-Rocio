export interface Inscripcion {
  id?: number | string;   
  courseId: number | string;
  studentId: number | string;
  fecha: Date;
  usuarioId: number | string;
}
