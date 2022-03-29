import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { setClassMetadata } from '@angular/core/src/r3_symbols';
import { fabric } from 'fabric';
import { Canvas, Line } from 'fabric/fabric-impl';

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

  constructor() { }

  ngOnInit(): void {
    this.canvas = new fabric.Canvas('canvas');
    this.canvas.setWidth(1220);
    this.canvas.setHeight(1200);
    fabric.ActiveSelection.prototype.hasControls = false;
    this.canvas.on('selection:cleared', x => this.selectionClear());
  }

  selectionClear(){
    this.showDetails = false;
  }

  addRectTable()
  {
    var Table : any = new fabric.Rect({
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

  addCircTable()
  {
    var Table : any = new fabric.Circle({
      left: 100,
      top: 50,
      fill: 'grey',
      radius: 50,
      stroke: 'black',
      strokeWidth: 2,
    });
    this.canvas.add(Table)
   
  }

  addSeat()
  {
    
    var Table : any = new fabric.Circle({
      originX: 'center',
      originY: 'center',
      fill: 'grey',
      radius: 18,
      strokeDashArray: [5, 5],
      stroke: 'black',
      strokeWidth: 2,
    });
    var text  = new fabric.Text(this.Number.toString(), {
      fontSize: 18,
      originX: 'center',
      originY: 'center',
    });
    
    var group : any = new fabric.Group([Table,text],{
      left: 100,
      top: 50,
      hasControls: false
    })

    group.seatid = this.Number;
    group.on('selected', x=>{
      console.log(x);
      this.selectSeat(x.target);
    })

    this.Number++;
    this.Array.push(group);
    this.canvas.add(group)
  }

  selectSeat(target:any){
    if(this.canvas.getActiveObject().type != 'activeSelection' ){
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

  renderSeatNumbers(){
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

  set(Seat:any){
    console.log(Seat);
    Seat.item(0).set({
      fill: 'green'
    });
    this.canvas.requestRenderAll();
  }

}
