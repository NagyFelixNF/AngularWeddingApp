import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbFormFieldModule, NbIconModule, NbInputModule } from '@nebular/theme';
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
    NbButtonModule,
    NbFormFieldModule,
  ],
  declarations: [
    TodoComponent,
  ],
})
export class TodoModule { }
