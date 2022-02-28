import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbAccordionModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { ClickstoppropagationDirective } from 'app/@theme/directives/clickstoppropagation.directive';
import { DirectivesModule } from 'app/@theme/directives/directive.module';

import { ThemeModule } from '../../@theme/theme.module';
import { TodoComponent } from './todo.component';

@NgModule({
  imports: [
    FormsModule,
    NbCardModule,
    ThemeModule,
    NbAccordionModule,
    NbCheckboxModule,
    DirectivesModule,
    NbContextMenuModule,
    NbIconModule,
    NbInputModule,
  ],
  declarations: [
    TodoComponent,
  ],
})
export class TodoModule { }
