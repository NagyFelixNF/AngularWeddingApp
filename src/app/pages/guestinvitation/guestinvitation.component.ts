import { Component, OnInit } from '@angular/core';
import { NbSpinnerService } from '@nebular/theme';

@Component({
  selector: 'guestinvitation',
  templateUrl: './guestinvitation.component.html',
  styleUrls: ['./guestinvitation.component.scss']
})
export class GuestinvitationComponent implements OnInit {

  constructor(private spinner$: NbSpinnerService) { }

  ngOnInit(): void {
    this.spinner$.load();
  }

}
