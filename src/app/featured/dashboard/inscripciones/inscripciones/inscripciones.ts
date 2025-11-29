import { Component, OnInit } from '@angular/core';
import { InscripcionesService } from '../../../../core/services/inscripciones/inscripciones';
import { Inscripcion } from '../../../../core/services/inscripciones/model/Inscripciones';
import {of, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-inscripciones',
  standalone: false,
  templateUrl: './inscripciones.html',
  styleUrls: ['./inscripciones.css'],
})


export class InscripcionesComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'courseTitle', 'studentName', 'fecha', 'userName', 'acciones'];

  constructor(private inscripcionesService: InscripcionesService) {}

  ngOnInit(): void {
    this.inscripcionesService.getInscripcionesConDetalles().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  crearInscripcion() {
    // acá podrías abrir un dialog con Angular Material para ingresar datos
    console.log('Crear inscripción');
  }

  editarInscripcion(inscripcion: any) {
    // abrir dialog con datos de la inscripción
    console.log('Editar inscripción', inscripcion);
  }

  eliminarInscripcion(id: number) {
    this.inscripcionesService.deleteInscripcion(id);
  }
}
