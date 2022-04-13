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
import { HttpRequest } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ObjectUnsubscribedError } from 'rxjs';

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
  customcanvas: any;
  TextColor = '#000000';
  BorderColor = '#000000';
  FillColor = '#FFFFFF';
  BorderSize = '2';
  FontSize = '16';
  Text = "";
  BringToFront = true;

  constructor(private GuestService: GuestService, private ModalService: NgbModal) {
    this.saveSeating = debounce(this.saveSeating, 900);
  }

  ngOnInit(): void {
    this.GetGuests();
    this.CreateCanvas();
    this.LoadCanvas();
    this.canvas.requestRenderAll();
  }

  CreateCanvas() {
    this.canvas = new fabric.Canvas('canvas');
    this.canvas.setHeight(650);
    this.canvas.setWidth(800);
    fabric.ActiveSelection.prototype.hasControls = false;
    this.canvas.on('selection:cleared', x => this.selectionClear());
    this.canvas.on('selection:updated', x => this.selectionUpdate(x));
    this.canvas.on('after:render', x => this.saveSeating());
  }

  LoadCanvas() {
    this.GuestService.GetSeating().subscribe(x => {
      if (x != "") {
        this.canvas.loadFromJSON(x)
        this.canvas.getObjects().forEach(element => {
          if (!this.isUndefined(element.seatid)) {
            element.hasControls = false
            element.on('selected', x => {
              console.log(x);
              this.selectSeat(x.target);
            })
            this.Array.push(element);
            this.Number++;
            if (!this.isUndefined(element.guestid)) {
              var guest = this.FindGuest(element.guestid);
              if (this.isUndefined(guest)) {
                this.DeleteAssignedSeat(element);
              }
              else {
                element.item(2).set({
                  text: guest.name
                });
                this.canvas.requestRenderAll();
              }
            }
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
    return guests.filter(x => x.name != "").filter(x => x.seatid == null);
  }

  saveSeating() {
    console.log(this.canvas.toJSON(['seatid']));
    this.GuestService.SaveSeating(this.canvas.toJSON(['seatid', 'guestid']));
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
    var name = new fabric.Text("", {
      fontSize: 10,
      originX: 'center',
      originY: 'center',
      top: -27,
    });


    var group: any = new fabric.Group([Table, text, name], {
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
        if (typeof element.seatid !== 'undefined') {
          SeatRender = true;
          this.DeleteAssignedSeat(element);
          this.Array.splice(this.Array.indexOf(element), 1);
        }
        this.canvas.remove(element);
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
      var guest: Guest = this.FindGuest(this.GuestValue);
      Seat.item(2).set({
        text: guest.name
      });
      Seat.guestid = this.GuestValue;
      guest.seatid = Seat.seatid;
      this.GuestService.UpdateGuest(guest);
      this.canvas.requestRenderAll();
    }
  }

  FindGuest(id: string) {
    return this.Guests.find(x => x.id == id);
  }

  DeleteAssignedSeat(Seat: any) {
    Seat.item(0).set({
      fill: 'grey'
    });
    Seat.item(2).set({
      text: ""
    });
    var guest: Guest = this.FindGuest(Seat.guestid);
    if (!this.isUndefined(guest)) {
      guest.seatid = null;
      this.GuestService.UpdateGuest(guest);
    }
    delete Seat.guestid;
    this.canvas.requestRenderAll();
  }

  saveImage(e) {
    var destinationCanvas = document.createElement("canvas");
    destinationCanvas.width = this.canvas.width;
    destinationCanvas.height = this.canvas.height;
    var destCtx = destinationCanvas.getContext('2d');

    destCtx.fillStyle = "#FFFFFF";
    destCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    destCtx.drawImage(this.canvas.getElement(), 0, 0);


    destinationCanvas.toDataURL();

    console.log(e)
    e.href = destinationCanvas.toDataURL();
    e.download = 'canvas.png'
  }

  AddDoor() {
    var Base: any = new fabric.Rect({
      left: 0,
      width: 64,
      top: 0,
      height: 3,
      fill: 'white',
      strokeWidth: 0,
      originX: 'left',
      originY: 'top',
    });
    var door1 = new fabric.Line([0, 0, 0, 32], {
      stroke: 'black',
      strokeWidth: 1
    });
    var door2 = new fabric.Path(`M 0 32 Q 32, 32, 32, 0`, {
      stroke: 'black',
      strokeWidth: 1,
      fill: 'transparent'
    });
    var door3 = new fabric.Line([64, 0, 64, 32], {
      stroke: 'black',
      strokeWidth: 1
    });
    var door4 = new fabric.Path(`M 32 0 Q 32, 32,64, 32`, {
      stroke: 'black',
      strokeWidth: 1,
      fill: 'transparent'
    });

    var group: any = new fabric.Group([Base, door1, door2, door3, door4,], {
      left: 100,
      top: 50,
    })
    this.canvas.add(group);
  }

  openModal(content) {
    this.ModalService.open(content, { size: 'lg' });
    this.customcanvas = new fabric.Canvas('custom');
    this.customcanvas.setHeight(400);
    this.customcanvas.setWidth(500);
    this.customcanvas.on("before:selection:cleared", x => this.BringToFrontEvent(x))
    this.customcanvas.requestRenderAll();
  }

  BringToFrontEvent(x) {
    if (this.BringToFront) {
      x.target.bringToFront();
    }
    else {
      this.BringToFront = true;
    }
  }

  AddText() {
    if (this.Text != "") {
      var text = new fabric.Text(this.Text, {
        left: 250,
        top: 200,
        fontSize: parseInt(this.FontSize),
        fill: this.TextColor
      });
      this.customcanvas.add(text);
      this.customcanvas.requestRenderAll();
    }
  }

  AddRectangle() {
    var rect: any = new fabric.Rect({
      left: 250,
      top: 200,
      fill: this.FillColor,
      width: 100,
      height: 50,
      stroke: this.BorderColor,
      strokeWidth: parseInt(this.BorderSize)
    });
    this.customcanvas.add(rect);
    this.customcanvas.requestRenderAll();
  }

  AddCircle() {
    var rect: any = new fabric.Circle({
      left: 250,
      top: 200,
      fill: this.FillColor,
      radius: 15,
      stroke: this.BorderColor,
      strokeWidth: parseInt(this.BorderSize)
    });
    this.customcanvas.add(rect);
    this.customcanvas.requestRenderAll();
  }

  AddTriangle() {
    var rect: any = new fabric.Triangle({
      left: 250,
      top: 200,
      fill: this.FillColor,
      width: 80,
      height: 80,
      stroke: this.BorderColor,
      strokeWidth: parseInt(this.BorderSize)
    });
    this.customcanvas.add(rect);
    this.customcanvas.requestRenderAll();
  }

  AddLine() {
    var rect: any = new fabric.Line([200, 200, 300, 200],{
      fill: this.FillColor,
      stroke: this.BorderColor,
      strokeWidth: parseInt(this.BorderSize)
    });
    this.customcanvas.add(rect);
    this.customcanvas.requestRenderAll();
  }

  DeleteCustom() {
    var element = this.customcanvas.getActiveObject();
    if (!this.isUndefined(element)) {
      this.BringToFront = false;
      if (element.type != 'activeSelection') {
        this.customcanvas.remove(element);
      }
      else {
        element.getObjects().forEach(object => {
          this.customcanvas.remove(object);
        });
      }
      this.customcanvas.requestRenderAll().discardActiveObject();
    }
  }

  AddCustomElement()
  {
    var objs = this.customcanvas.getObjects();
    if(objs.length != 0){
    var group = new fabric.Group(objs, {
      left: 325,
      top: 400,
    });
    this.canvas.add(group);
    this.ModalService.dismissAll();
    this.canvas.requestRenderAll();
    }
  }

}
