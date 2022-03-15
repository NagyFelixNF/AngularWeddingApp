import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetComponent } from './budget.component';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbFormFieldModule, NbIconModule, NbInputModule} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { AutofocusFixModule } from 'ngx-autofocus-fix';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DirectivesModule } from 'app/@theme/directives/directive.module';



@NgModule({
  imports: [
    FormsModule,
    NbCardModule,
    ThemeModule,
    NbAccordionModule,
    DirectivesModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbFormFieldModule,
    AutofocusFixModule,
    BrowserAnimationsModule,
  ],
  declarations: [BudgetComponent],
})
export class BudgetModule { }
