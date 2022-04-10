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

  DeleteGuest(guestid:string)
  {
    this.http.delete(this.url+guestid,this.GetHeader()).subscribe();
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

  AddGuestFromInvitation(guest:any): Observable<Guest>
  {

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

  GetInvitations(): Observable<Invitation[]>
  {
    return this.http.get<Invitation[]>(this.url+"invitation",this.GetHeader()).pipe();
  }

  SaveSeating(Json:any)
  {
    this.http.put(this.url+"seat",Json,this.GetHeader()).subscribe(x => console.log(x));
  }

  GetSeating()
  {
    return this.http.get(this.url+"seat",this.GetHeader()).pipe();
  }

}
