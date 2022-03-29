import { NgModule } from '@angular/core';
import { NbIconModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoModule } from './todo/todo.module';
import { BudgetComponent } from './budget/budget.component';
import { BudgetModule } from './budget/budget.module';
import { GuestModule } from './guest/guest.module';
import { GuestComponent } from './guest/guest.component';
import { InvitationModule } from './invitation/invitation.module';
import { GuestinvitationModule } from './Guestinvitation/Guestinvitation.module';
import { SeatingModule } from './Seating/Seating.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    SeatingModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
