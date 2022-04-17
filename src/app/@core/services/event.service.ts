import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NbTokenService } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { isConstructorDeclaration } from 'typescript';
import { EventTime } from '../data/event';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  url = "https://localhost:5001/api/event/"

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

  
  GetEvent(): Observable<EventTime[]>
  {
    return this.http.get<EventTime[]>(this.url,this.GetHeader()).pipe();
  }

  DeleteEvent(eventid:string)
  {
    this.http.delete(this.url+eventid,this.GetHeader()).subscribe();
  }

  UpdateEvent(guestid:string,event:EventTime)
  {
    if(event.minute != null) event.minute = event.minute.toString()
    if(event.hour != null) event.hour = event.hour.toString()
    this.http.patch(this.url+guestid,event,this.GetHeader()).subscribe();
  }

  AddEvent(event)
  {
    return this.http.post<EventTime>(this.url,event,this.GetHeader()).pipe();
  }


}
