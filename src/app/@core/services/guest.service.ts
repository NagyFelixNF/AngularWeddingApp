import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Guest, GuestResponse} from '../data/guest';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  guests: Guest[] = [
    {
      'id' : "1",
      'category' : "Groom",
      'response' : GuestResponse.AcceptedBoth,
      'name' : "asd",
      'diet' : "a",
      'editdiet' : false,
      'editcomment' : false,
      'comment' : ""
    },
    {
      'id' : "2",
      'category' : "Bride",
      'response' : GuestResponse.AcceptedBoth,
      'name' : "asd",
      'diet' : "",
      'editdiet' : false,
      'editcomment' : false,
      'comment' : ""
    },
    {
      'id' : "3",
      'category' : "Relative",
      'response' : GuestResponse.AcceptedBoth,
      'name' : "asd",
      'diet' : "",
      'editdiet' : false,
      'editcomment' : false,
      'comment' : ""
    }
  ]

  constructor() { }

  GetGuests(): Observable<Guest[]>
  {
    return of(this.guests);
  }
}
