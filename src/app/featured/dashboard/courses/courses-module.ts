import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CoursesRoutingModule } from './courses-routing-module';
import { Courses } from './courses';
import { CoursesTable } from './courses-table/courses-table';
import { CoursesForm } from './courses-form/courses-form';
import { SharedModule } from '../../../shared/shared-module';
import { StoreModule } from '@ngrx/store';
import { CoursesFeature } from './store/courses.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffect } from './store/courses.effects';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';




@NgModule({
  declarations: [Courses, CoursesTable, CoursesForm],
  imports: [
    CommonModule, 
    CoursesRoutingModule, 
    SharedModule, 
    StoreModule.forFeature(CoursesFeature),
    EffectsModule.forFeature([CoursesEffect]),
    MatProgressSpinnerModule
  ],
    
})
export class CoursesModule { }
