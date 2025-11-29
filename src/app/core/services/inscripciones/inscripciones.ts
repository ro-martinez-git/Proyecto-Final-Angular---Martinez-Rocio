import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URL } from './../../utils/constants';
import { Inscripcion } from './model/Inscripciones';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  private inscripciones: Inscripcion[] = [];
  private inscripcionesSubject = new BehaviorSubject<Inscripcion[]>([]);
  inscripciones$ = this.inscripcionesSubject.asObservable();

  private url = `${API_URL}/inscripciones`;

  constructor(private http: HttpClient) {
    this.getInscripciones();
  }

  // Obtener todas las inscripciones y actualizar el estado
  getInscripciones(): void {
    this.http.get<Inscripcion[]>(this.url).subscribe((data) => {
      this.inscripciones = data;
      this.inscripcionesSubject.next(data);
    });
  }

  // Obtener una inscripción por ID
  getInscripcionById(id: number | string): Observable<Inscripcion> {
    return this.http.get<Inscripcion>(`${this.url}/${id}`);
  }

  // Crear una nueva inscripción
  addInscripcion(inscripcion: Inscripcion): void {
    const newId = String(Number(this.inscripciones[this.inscripciones.length - 1]?.id || 0) + 1);
    inscripcion.id = newId;
    this.http.post<Inscripcion>(this.url, inscripcion).subscribe((created) => {
      this.inscripciones.push(created);
      this.inscripcionesSubject.next([...this.inscripciones]);
    });
  }

  // Actualizar una inscripción existente
  updateInscripcion(inscripcion: Inscripcion): void {
    const updatedInscripciones = this.inscripciones.map((i) => (i.id === inscripcion.id ? inscripcion : i));
    this.http.put<Inscripcion>(`${this.url}/${inscripcion.id}`, inscripcion).subscribe(() => {
      this.inscripciones = updatedInscripciones;
      this.inscripcionesSubject.next(updatedInscripciones);
    });
  }

  // Eliminar una inscripción
  deleteInscripcion(id: number | string): void {
    const updatedInscripciones = this.inscripciones.filter((i) => i.id !== id);
    this.http.delete<void>(`${this.url}/${id}`).subscribe(() => {
      this.inscripciones = updatedInscripciones;
      this.inscripcionesSubject.next(updatedInscripciones);
    });
  }
  getInscripcionesConDetalles(): Observable<any[]> {
  return this.http.get<Inscripcion[]>(this.url).pipe(
    switchMap((inscripciones) => {
      return forkJoin({
        courses: this.http.get<any[]>(`${API_URL}/courses`),
        students: this.http.get<any[]>(`${API_URL}/students`),
        users: this.http.get<any[]>(`${API_URL}/users`)
      }).pipe(
        map(({ courses, students, users }) =>
          inscripciones.map(i => ({
            ...i,
            courseTitle: courses.find(c => c.id === i.courseId)?.title,
            studentName: students.find(s => s.id === i.studentId)?.name,
            userName: users.find(u => u.id === i.usuarioId)?.username
          }))
        )
      );
    })
  );
}

}
