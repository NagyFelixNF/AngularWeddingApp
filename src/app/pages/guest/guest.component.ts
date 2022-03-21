import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {
  items = 
  [
  { title: 'Response not known',icon: { icon: 'question',pack:'fa-solid'}},
  { title: 'Response pending',icon: { icon: 'clock',pack:'fa-solid'} },
  { title: 'Only ceremony',icon: { icon: 'church',pack:'fa-solid'} },
  { title: 'Only reception',icon: { icon: 'utensils',pack:'fa-solid'} },
  { title: 'Confirmed both',icon: { icon: 'check',pack:'fa-solid'} },
  { title: 'Canceled',icon: { icon: 'xmark',pack:'fa-solid'} },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
