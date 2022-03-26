import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbSpinnerService } from '@nebular/theme';
import { GuestResponse } from 'app/@core/data/guest';
import { GuestService } from 'app/@core/services/guest.service';

@Component({
  selector: 'guestinvitation',
  templateUrl: './guestinvitation.component.html',
  styleUrls: ['./guestinvitation.component.scss']
})
export class GuestinvitationComponent implements OnInit {

  DietField:boolean = false
  fullname:string
  diet:string = ""
  comment:string = ""
  response:string
  weddingid:string
  guestid:string
  
  guestRespone = GuestResponse;

  constructor(private spinner$: NbSpinnerService,private route: ActivatedRoute,public GuestService:GuestService) { }

  ngOnInit(): void {
    this.spinner$.load();
    console.log(this.route.snapshot.params.weddingid);
    console.log(this.route.snapshot.params.guestid);
    this.response = "5";
    this.weddingid = this.route.snapshot.params.weddingid;
    if(this.route.snapshot.params.guestid !== undefined )
    {
      this.guestid = this.route.snapshot.params.guestid;
    }
    else this.guestid = null;
  }

  ShowDietField(event:any)
  {
    this.DietField = event;
  }

  SendResponse()
  {
    console.log(this.fullname + this.diet + this.comment + this.response);
    var invite = {
      'guestid': this.guestid,
      'weddingid': this.weddingid,
      'comment': this.comment,
      'name': this.fullname,
      'diet': this.diet,
      'response' : parseInt(this.response)
    }
    this.GuestService.AddInvitation(invite);
  }

}
