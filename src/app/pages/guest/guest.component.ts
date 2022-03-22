import { Component, OnInit } from '@angular/core';
import { Guest, GuestResponse } from 'app/@core/data/guest';
import { GuestService } from 'app/@core/services/guest.service';
import { NbContextMenuDirective, NbMenuBag, NbMenuService } from '@nebular/theme';

@Component({
  selector: 'guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {
  items = 
  [
  { title: 'Response not known',icon: { icon: 'question',pack:'fa-solid'}, data: GuestResponse.Unknown},
  { title: 'Response pending',icon: { icon: 'clock',pack:'fa-solid'}, data: GuestResponse.Pending},
  { title: 'Only ceremony',icon: { icon: 'church',pack:'fa-solid'}, data: GuestResponse.OnlyCeremony},
  { title: 'Only reception',icon: { icon: 'utensils',pack:'fa-solid'}, data: GuestResponse.OnlyReception},
  { title: 'Confirmed both',icon: { icon: 'check',pack:'fa-solid'}, data: GuestResponse.AcceptedBoth},
  { title: 'Canceled',icon: { icon: 'xmark',pack:'fa-solid'}, data: GuestResponse.Canceled},
  ];
  Guests:Guest[];
  guestRespone = GuestResponse;

  constructor(public GuestService:GuestService, private nbMenuService: NbMenuService) { }

  ngOnInit(): void {
    this.GetGuests();

    this.nbMenuService.onItemClick()
    .subscribe(
      (menuBag:NbMenuBag) => {
        this.ChangeResponse(menuBag.item.data,menuBag.tag);
      }
    );
  }

  GetGuests()
  {
    this.GuestService.GetGuests().subscribe(guests => this.Guests = guests);
  }

  ClickDiet(guest:Guest)
  {
    console.log(this.Guests);
    guest.editdiet = true;
  }

  ClickComment(guest:Guest)
  {
    guest.editcomment = true;
  }

  BlurDiet(guest:Guest)
  {
    console.log(guest.diet);
    guest.editdiet = false;
  }

  BlurComment(guest:Guest)
  {
    guest.editcomment = false;
  }

  ChangeResponse(response:GuestResponse, id:string)
  {
    var guest = this.Guests.find(x => x.id == id);
    guest.response = response;
  }
}
