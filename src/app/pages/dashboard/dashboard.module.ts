import { NgModule } from '@angular/core';
import { NbCardFooterComponent, NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
