import { getTarget } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, OnInit } from '@angular/core';
import { EventTime } from 'app/@core/data/event';

@Component({
  selector: 'timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  Events:EventTime[] = []

  constructor() { }

  ngOnInit(): void {
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

  HourInputKeyUp(event:any)
  {
    console.log(parseInt(event.target.value));
    if(event.target.value>23)
    {
      event.target.value = 23;
    }
  }

  MinuteInputKeyUp(event:any)
  {
    if(event.target.value>59)
    {
      event.target.value = 59;
    }
  }

  addEvent(){
    var event : EventTime = {
      'id' : "1",
      'hour' : "00",
      'minute': "00",
      'title' : "",
      'category' : ""
    }
    this.Events.push(event);
    console.log(this.Events);
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

  SortEvents()
  {
    this.Events.sort(this.compareEvents);
  }

}
