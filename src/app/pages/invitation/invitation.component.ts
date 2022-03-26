import { Component, OnInit } from '@angular/core';
import { Guest, GuestResponse } from 'app/@core/data/guest';
import { Invitation } from 'app/@core/data/invitation';
import { GuestService } from 'app/@core/services/guest.service';
import { Location, PlatformLocation} from '@angular/common';

import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {

  Guests : Guest[]
  Invitations : Invitation[] = [];
  guestRespone = GuestResponse;
  weddingid : string;

  items = 
  [
  { title: 'Response not known',icon: { icon: 'question',pack:'fa-solid'}, data: GuestResponse.Unknown},
  { title: 'Response pending',icon: { icon: 'clock',pack:'fa-solid'}, data: GuestResponse.Pending},
  { title: 'Only ceremony',icon: { icon: 'church',pack:'fa-solid'}, data: GuestResponse.OnlyCeremony},
  { title: 'Only reception',icon: { icon: 'utensils',pack:'fa-solid'}, data: GuestResponse.OnlyReception},
  { title: 'Confirmed both',icon: { icon: 'check',pack:'fa-solid'}, data: GuestResponse.AcceptedBoth},
  { title: 'Canceled',icon: { icon: 'xmark',pack:'fa-solid'}, data: GuestResponse.Canceled},
  ];

  constructor(public GuestService:GuestService, private platformLocation: PlatformLocation, private clipboardApi: ClipboardService) { }

  ngOnInit(): void {
    this.GetWeddingId();
    this.GetGuests();
  }

  GetGuests()
  {
    this.GuestService.GetGuests().subscribe(guests => this.Guests = guests);
  }

  GetWeddingId()
  {
    this.GuestService.GetWeddingId().subscribe(id => this.weddingid = id);
  }

  copyURL(id: string)
  {
    console.log((this.platformLocation as any).location.origin + "/" + this.weddingid);
    this.clipboardApi.copy((this.platformLocation as any).location.origin + "/invite" +"/" + this.weddingid + "/" + id);
  }

}
