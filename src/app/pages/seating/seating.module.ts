import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatingComponent } from './seating.component';
import { ThemeModule } from 'app/@theme/theme.module';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbSelectModule, NbToggleModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';



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
    NgbModalModule,
    NbCheckboxModule,
    NbToggleModule,
  ]
})
export class SeatingModule { }
