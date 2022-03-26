import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuestinvitationComponent } from './Guestinvitation/guestinvitation.component';
const routes: Routes = [{
  path: ':weddingid',
  component: GuestinvitationComponent
},{
  path: ':weddingid/:guestid',
  component: GuestinvitationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InviteRoutingModule {
}