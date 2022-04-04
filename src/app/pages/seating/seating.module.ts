import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatingComponent } from './seating.component';
import { ThemeModule } from 'app/@theme/theme.module';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SeatingComponent
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
export class SeatingModule { }