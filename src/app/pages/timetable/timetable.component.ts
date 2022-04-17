import { getTarget } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, OnInit } from '@angular/core';
import { EventTime } from 'app/@core/data/event';
import { EventService } from 'app/@core/services/event.service';
import { debounce } from 'lodash';

@Component({
  selector: 'timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  Events:EventTime[] = []
  Regex: RegExp = new RegExp("^[0-9]$");

  constructor(private EventService: EventService) {
    this.updateEvent = debounce(this.updateEvent,600);
   }

  ngOnInit(): void {
    this.GetEvents();
  }

  GetEvents()
  {
    this.EventService.GetEvent().subscribe(events =>
      {
        events.sort(this.compareEvents);
        this.Events = events
      }); 
  }

  TimeKeyDown(event:any){
    console.log(event);
    if(event.target.value+event.key>99 || event.target.value+event.key == "000")
    {
      console.log(event.target.value);
      event.preventDefault();
    }
    if(event.key=="-" || event.key=="," || event.key=="." || event.key=="e")
    {
      event.preventDefault();
    }
  }

  HourInputKeyUp(event:any,eventtime)
  {
    if(event.target.value>23)
    {
      eventtime.hour = 23;
    }
    this.updateEvent(eventtime);
  }

  MinuteInputKeyUp(event:any,eventtime)
  {
    if(event.target.value>59)
    {
      eventtime.minute = 59;
    }
    this.updateEvent(eventtime);
  }

  addEvent(){
    var event = {
      'hour' : "00",
      'minute': "00",
      'title' : "",
    }
    this.EventService.AddEvent(event).subscribe(event => {
      this.Events.push(event)
      this.Events.sort(this.compareEvents);
    });
  
  }

  updateEvent(event)
  {
    this.EventService.UpdateEvent(event.id,event);
  }

  compareEvents(a:EventTime,b:EventTime) : number
  {
    if(a.hour < b.hour)
    {
      return -1;
    }
    if(a.hour > b.hour)
    {
      return 1;
    }
    if(a.hour == b.hour)
    {
      if(a.minute < b.minute)
      {
        return -1;
      }
      if(a.minute > b.minute)
      {
        return 1;
      }
    }
    return 0;
  }

  SortEvents(event)
  {
    this.Events.sort(this.compareEvents);
    if(event.minute !=null)
    {
      if(this.Regex.test(event.minute.toString()))
      {
        event.minute = "0" + event.minute.toString();
      }
    }
    if(event.hour !=null)
    {
      if(this.Regex.test(event.hour.toString()))
      {
        event.hour = "0" + event.hour.toString();
      }
    }
  }

  deleteEvent(event)
  {
    console.log(event)
    this.EventService.DeleteEvent(event.id);
    this.Events.splice(this.Events.indexOf(event),1);
  }

}
