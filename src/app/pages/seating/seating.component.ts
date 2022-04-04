import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { setClassMetadata } from '@angular/core/src/r3_symbols';
import { GuestService } from 'app/@core/services/guest.service';
import { Console } from 'console';
import { fabric } from 'fabric';
import { Canvas, Line } from 'fabric/fabric-impl';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { debounce } from 'lodash';
import { Guest } from 'app/@core/data/guest';

@Component({
  selector: 'seating',
  templateUrl: './seating.component.html',
  styleUrls: ['./seating.component.scss']
})
export class SeatingComponent implements OnInit {
  canvas: any;
  Grouptest: any;
  Number = 1;
  Array: any[] = [];
  showDetails = false;
  Seat: any;
  Guests: Guest[]
  GuestValue = null;

  constructor(private GuestService: GuestService) {
    this.saveSeating = debounce(this.saveSeating, 500);
  }

  ngOnInit(): void {
    this.GetGuests()
    this.canvas = new fabric.Canvas('canvas');
    this.canvas.setHeight(650);
    this.canvas.setWidth(800);
    fabric.ActiveSelection.prototype.hasControls = false;
    this.canvas.on('selection:cleared', x => this.selectionClear());
    this.canvas.on('selection:updated', x => this.selectionUpdate(x));
    this.canvas.on('after:render', x => this.saveSeating());
    this.GuestService.GetSeating().subscribe(x => {
      if (x != "") {
        this.canvas.loadFromJSON(x)
        this.canvas.getObjects().forEach(element => {
          if (typeof element.seatid !== 'undefined') {
            element.hasControls = false
            element.on('selected', x => {
              console.log(x);
              this.selectSeat(x.target);
            })
            this.Array.push(element);
            this.Number++;
          }
        });
      }
    });
  }

  GetGuests() {
    this.GuestService.GetGuests().subscribe(guests => {
      this.Guests = guests
      console.log(this.Guests);
    });
  }

  FilterNameless(guests: Guest[]): Guest[] {
    return guests.filter(x => x.name != "").filter(x => !(x.category == 'Groom' || x.category == 'Bride')).filter(x => x.seatid == null);
  }

  saveSeating() {
    console.log(this.canvas.toJSON(['seatid']));
    this.GuestService.SaveSeating(this.canvas.toJSON(['seatid','guestid']));
  }

  selectionClear() {
    this.showDetails = false;
    this.GuestValue = null;
  }
  selectionUpdate(x) {
    this.GuestValue = null;
    console.log(x);
    if (typeof x.selected[0].seatid !== 'undefined') {
      this.showDetails = true;
    }
    else {
      this.showDetails = false;
    }
  }

  isUndefined(val): boolean { return typeof val === 'undefined'; }

  addRectTable() {
    var Table: any = new fabric.Rect({
      left: 100,
      top: 50,
      fill: 'grey',
      width: 160,
      height: 80,
      stroke: 'black',
      strokeWidth: 2,
    });
    this.canvas.add(Table)
  }

  addCircTable() {
    var Table: any = new fabric.Circle({
      left: 100,
      top: 50,
      fill: 'grey',
      radius: 50,
      stroke: 'black',
      strokeWidth: 2,
    });
    this.canvas.add(Table)

  }

  addSeat() {

    var Table: any = new fabric.Circle({
      originX: 'center',
      originY: 'center',
      fill: 'grey',
      radius: 18,
      strokeDashArray: [5, 5],
      stroke: 'black',
      strokeWidth: 2,
    });
    var text = new fabric.Text(this.Number.toString(), {
      fontSize: 18,
      originX: 'center',
      originY: 'center',
    });

    var group: any = new fabric.Group([Table, text], {
      left: 100,
      top: 50,
      hasControls: false
    })

    group.seatid = this.Number;
    group.on('selected', x => {
      console.log(x);
      this.selectSeat(x.target);
    })

    this.Number++;
    this.Array.push(group);
    this.canvas.add(group);
  }

  selectSeat(target: any) {
    if (this.canvas.getActiveObject().type != 'activeSelection') {
      console.log(this.canvas.getActiveObject().type);
      this.showDetails = true;
      this.Seat = target;
    }
  }


  getActive() {
    var SeatRender = false;
    if (typeof this.canvas.getActiveObject() !== 'undefined') {

      console.log(this.canvas.getActiveObject());
      var element = this.canvas.getActiveObject();

      if (element.type != 'activeSelection') {
        this.canvas.remove(element);
        if (typeof element.seatid !== 'undefined') {
          SeatRender = true;
          this.Array.splice(this.Array.indexOf(element), 1);
        }
      }

      else {
        element.getObjects().forEach(object => {
          this.canvas.remove(object);
          if (typeof object.seatid !== 'undefined') {
            SeatRender = true;
            this.Array.splice(this.Array.indexOf(object), 1);
          }
        });
      }
      if (SeatRender) {
        this.renderSeatNumbers();
      }
      this.canvas.discardActiveObject().requestRenderAll();
    }
  }

  renderSeatNumbers() {
    var number = 1;

    this.Array.forEach(element => {
      element.item(1).set({
        text: number.toString(),
      });
      element.seatid = number;
      number++;
    });
    this.Number = this.Array.length + 1;

  }

  set(Seat: any) {
    console.log(Seat);
    if (this.GuestValue != null) {
      Seat.item(0).set({
        fill: 'green'
      });
      Seat.guestid = this.GuestValue;
      var guest : Guest = this.FindGuest(this.GuestValue);
      guest.seatid = Seat.seatid;
      this.GuestService.UpdateGuest(guest);
      this.canvas.requestRenderAll();
    }
  }

  FindGuest(id:string){
    return this.Guests.find(x=>x.id == id);
  }

  DeleteAssignedSeat(Seat: any){
    Seat.item(0).set({
      fill: 'grey'
    });
    var guest : Guest = this.FindGuest(Seat.guestid);
    guest.seatid = null;
    this.GuestService.UpdateGuest(guest);
    delete Seat.guestid;
    this.canvas.requestRenderAll();
  }
}
