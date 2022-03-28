import { Component, OnInit } from '@angular/core';
import { Guest, GuestResponse } from 'app/@core/data/guest';
import { Invitation } from 'app/@core/data/invitation';
import { GuestService } from 'app/@core/services/guest.service';
import { Location, PlatformLocation} from '@angular/common';

import { ClipboardService } from 'ngx-clipboard';
import { NbMenuBag, NbMenuService } from '@nebular/theme';
import { filter } from 'rxjs/operators';
import { debounce } from 'lodash';
import { InviteModule } from '../invite.module';

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

  constructor(public GuestService:GuestService, private platformLocation: PlatformLocation, private clipboardApi: ClipboardService, private nbMenuService: NbMenuService ) {
    this.UpdateGuestName = debounce(this.UpdateGuestName, 500);
   }

  ngOnInit(): void {
    this.GetWeddingId();
    this.GetGuests();
    this.GetInvitation();

    this.nbMenuService.onItemClick()
    .pipe(
      filter(({ tag }) => !(tag == null)),
    )
    .subscribe(
      (menuBag:NbMenuBag) => {
        this.ChangeResponse(menuBag.item.data,menuBag.tag);
      }
    );
  }

  ChangeResponse(response:GuestResponse, id:string)
  {
    var guest : Guest = this.Guests.find(x => x.id == id);
    guest.response = response;
    this.GuestService.UpdateGuest(guest);
  }

  GetGuests()
  {
    this.GuestService.GetGuests().subscribe(guests => {this.Guests = guests
      console.log(this.Guests)});
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

  GetInvitation()
  {
    this.GuestService.GetInvitations().subscribe(x => {
      this.Invitations = x;
      console.log(this.Invitations);
    })
  }

  FilterNameless(guests:Guest[]) : Guest[]
  {
    return guests.filter(x => x.name != "").filter(x => !(x.category == 'Groom' || x.category == 'Bride'));
  }

  UpdateGuestName(evet:any, guest:Guest)
  {
    guest.name = evet.target.value
    this.GuestService.UpdateGuest(guest);
  }

  PerformAction(invite:Invitation)
  {
    console.log(invite.action)
    if(invite.action == "add")
    {
      var guest = {
        'category' : "Other",
        'response' : invite.response,
        'name' : invite.name,
        'diet' : invite.diet,
        'side' : "",
        'editdiet' : false,
        'editcomment' : false,
        'comment' : invite.comment,
        'invitations' : [
          invite
        ],
        'weddingid': this.weddingid
      }
      this.GuestService.AddGuestFromInvitation(guest).subscribe(x =>{
        this.Guests.push(x)
      });
    }
    else if(invite.action == "delete")
    {

    }
    else if(invite.action.includes("assign"))
    {
      console.log(invite.action)
    }
    this.Invitations.splice(this.Invitations.indexOf(invite),1);
  }

}
