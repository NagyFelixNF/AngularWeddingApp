import { Component, OnInit } from '@angular/core';
import { Guest, GuestResponse } from 'app/@core/data/guest';
import { GuestService } from 'app/@core/services/guest.service';
import { NbContextMenuDirective, NbMenuBag, NbMenuService } from '@nebular/theme';
import { filter } from 'rxjs/operators';
import { debounce } from 'lodash';

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
    .pipe(
      filter(({ tag }) => !(tag == null)),
    )
    .subscribe(
      (menuBag:NbMenuBag) => {
        this.ChangeResponse(menuBag.item.data,menuBag.tag);
      }
    );

    this.UpdateGuestName = debounce(this.UpdateGuestName, 500);
  }

  GetGuests()
  {
    this.GuestService.GetGuests().subscribe(guests => {this.Guests = guests
      console.log(this.Guests);
    });
  }

  ClickDiet(guest:Guest)
  {
    console.log(guest);
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
    this.GuestService.UpdateGuest(guest);
  }

  BlurComment(guest:Guest)
  {
    guest.editcomment = false;
    this.GuestService.UpdateGuest(guest);
  }

  ChangeResponse(response:GuestResponse, id:string)
  {
    var guest : Guest = this.Guests.find(x => x.id == id);
    guest.response = response;
    this.GuestService.UpdateGuest(guest);
  }

  AddGuest(category:string)
  {
    var splitted = category.split('&');
    this.GuestService.AddGuest(splitted).subscribe(guest => this.Guests.push(guest));
  }

  UpdateGuestName(evet:any, guest:Guest)
  {
    guest.name = evet.target.value
    this.GuestService.UpdateGuest(guest);
  }
}
