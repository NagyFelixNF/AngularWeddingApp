import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbTokenService } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { Guest, GuestResponse} from '../data/guest';
import { Invitation } from '../data/invitation';

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
      'side' : "",
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
      'side' : "",
      'editdiet' : false,
      'editcomment' : false,
      'comment' : ""
    },
    {
      'id' : "3",
      'category' : "Relative",
      'response' : GuestResponse.AcceptedBoth,
      'name' : "asd",
      'side' : "bride",
      'diet' : "",
      'editdiet' : false,
      'editcomment' : false,
      'comment' : ""
    }
  ]
  url = "https://localhost:5001/api/guest/"

  constructor(private TokenService: NbTokenService, private http: HttpClient) { }

  getToken()
  {
    var token;
    this.TokenService.get().subscribe(
      x => token = x.getValue()
    )
    return token;
  }

  GetHeader()
  {
    console.log("header");
    return  {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.getToken()}`)
    }
    
  }

  GetGuests(): Observable<Guest[]>
  {
    return this.http.get<Guest[]>(this.url,this.GetHeader()).pipe();
  }

  GetWeddingId(): Observable<string>
  {
    return this.http.get<string>(this.url+"wedding",this.GetHeader()).pipe();
  }

  AddGuest(splitted: string[]): Observable<Guest>
  {
    var guest = {
      'category' : splitted[1],
      'response' : GuestResponse.Unknown,
      'name' : "",
      'diet' : "",
      'side' : splitted[0],
      'editdiet' : false,
      'editcomment' : false,
      'comment' : ""
    }
    return this.http.post<Guest>(this.url,guest,this.GetHeader()).pipe();
  }

  UpdateGuest(guest: Guest): void
  {
    this.http.patch(this.url+guest.id,guest,this.GetHeader()).subscribe();
  }

  AddInvitation(invitation:any)
  {
    this.http.post(this.url+"invitation",invitation,this.GetHeader()).subscribe();
  }
}
