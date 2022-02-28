import { NgModule } from '@angular/core';
import { NbIconModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoModule } from './todo/todo.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    TodoModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
