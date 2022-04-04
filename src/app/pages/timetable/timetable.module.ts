import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableComponent } from './timetable.component';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbIconModule, NbInputModule, NbButtonModule, NbSelectModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';



@NgModule({
  declarations: [
    TimetableComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    FormsModule,
    ThemeModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
  ]
})
export class TimetableModule { }
