import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoComponent } from './todo/todo.component';
import { BudgetComponent } from './budget/budget.component';
import { GuestComponent } from './guest/guest.component';
import { InvitationComponent } from './Invitation/invitation.component';
import { SeatingComponent } from './seating/seating.component';
import { TimetableComponent } from './Timetable/timetable.component';
import { VendorComponent } from './Vendor/vendor.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'todo',
      component: TodoComponent,
    },
    {
      path: 'budget',
      component: BudgetComponent
    },
    {
      path: 'guest',
      component: GuestComponent
    },
    {
      path: 'invitation',
      component: InvitationComponent
    },
    {
      path: 'seating',
      component: SeatingComponent
    },
    {
      path: 'time',
      component: TimetableComponent
    },
    {
      path: 'vendor',
      component: VendorComponent
    },
  
  


    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
