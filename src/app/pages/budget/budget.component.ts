import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Budget } from 'app/@core/data/budget';

import { BudgetService } from 'app/@core/services/budget.service';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { debounce } from 'lodash';

@Component({
  selector: 'budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  SetBudget: boolean = false;
  @ViewChild('hiddenText') textEl: ElementRef;

  minWidth: number = 60;
  width: number = this.minWidth;

  Budget: Budget

  constructor(public BudgetService:BudgetService){
    this.searchde = debounce(this.searchde, 500)
  }

  ngOnInit(): void {
    this.GetBudget();
  }

  BudgetOnClick(): void
  {
    this.SetBudget = true;
    this.resize();
  }
  BudgetOnBlur(): void
  {
    this.SetBudget = false;
    if(this.Budget.budget == null)
    {
      this.Budget.budget = 1000
    }
  }

  resize() {
    setTimeout(() => this.width = Math.max(this.minWidth, this.textEl.nativeElement.offsetWidth+35));
  }

  search(event: any)
  {
    console.log("notdeb "+event.target.value);
    this.searchde(event.target.value);
  }

  searchde(str)
  {
    console.log("deb "+ str);
  }



  GetBudget()
  {
    this.BudgetService.GetBudget().subscribe(budget => this.Budget = budget);
  }
}
