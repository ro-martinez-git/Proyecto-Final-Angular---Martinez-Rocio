import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { InscripcionesRoutingModule } from './inscripciones-routing-module';
import { InscripcionesComponent } from './inscripciones/inscripciones';
import { InscripcionDialog } from './inscripcion-dialog/inscripcion-dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    InscripcionesComponent,
    InscripcionDialog
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    MatTableModule,
    MatIconModule,
  ]
})
export class InscripcionesModule { }
