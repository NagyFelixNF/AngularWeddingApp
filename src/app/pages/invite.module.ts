import { NgModule } from '@angular/core';

import { GuestinvitationModule } from './Guestinvitation/Guestinvitation.module';
import { InviteRoutingModule } from './invite-routing.module';

@NgModule({
  imports: [
    InviteRoutingModule,
    GuestinvitationModule
  ],
  declarations: [
  ],
})
export class InviteModule {
}
