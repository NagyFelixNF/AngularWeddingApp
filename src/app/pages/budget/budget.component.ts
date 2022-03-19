import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Budget, Category, Spending } from 'app/@core/data/budget';

import { BudgetService } from 'app/@core/services/budget.service';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { debounce } from 'lodash';
import { ThisReceiver } from '@angular/compiler';

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

  Budget: Budget;
  TotalSpendings: number;
  Total: number;

  constructor(public BudgetService:BudgetService){
    this.searchde = debounce(this.searchde, 500)
    this.updateCategory = debounce(this.updateCategory, 600)
    }

  ngOnInit(): void {
    this.GetBudget();
  }

  BudgetOnClick(): void
  {
    this.SetBudget = true;
    this.resize();
  }

  BudgetOnBlur(budget:Budget): void
  {
    this.SetBudget = false;
    if(this.Budget.budget == null)
    {
      this.Budget.budget = 1000
    }
    this.RecalcTotal();
    this.UpdateBudget(budget);
  }

  UpdateBudget(Budget:Budget)
  {
    this.BudgetService.UpdateBudge(Budget);
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

  AddNewCategory(Buget:Budget)
  {
    this.BudgetService.AddCategory(this.Budget.id).subscribe(category=> this.Budget.categories.push(category));
  }

  AddNewSpending(category: Category)
  {
    this.BudgetService.AddSpending(category.id).subscribe(spending => category.spendings.push(spending));
  }

  GetBudget()
  {
    this.BudgetService.GetBudget().subscribe(budget =>{ (this.Budget = budget)
      this.TotalSpendings = 0;
      this.Total = 0;
      if(this.Budget.categories != null){
      this.Budget.categories.forEach(element => {
        var sum =0;
        element.spendings.forEach(element => {
          sum = sum + element.cost
        });
        element.total = sum;
        this.TotalSpendings = this.TotalSpendings + sum;
      });
      this.Total = this.Budget.budget - this.TotalSpendings;
    }
    });
  }

  Spendingupdate(category:Category)
  {
    var newsum = 0;
    category.spendings.forEach(element => {
      newsum = newsum + element.cost
    });
    category.total = newsum;
    this.RecalcTotal();
  }

  RecalcTotal()
  {
    var newsum = 0;
    this.Budget.categories.forEach(element => {
      newsum = newsum + element.total;
    });
    this.TotalSpendings = newsum;
    this.Total = this.Budget.budget - this.TotalSpendings;
  }

  DeleteSpending(category:Category,spending:Spending)
  {
    var index = category.spendings.indexOf(spending);
    category.spendings.splice(index,1);
    this.Spendingupdate(category)
  }

  updateCategory(event:any, category:Category)
  {
    category.title = event.target.value
    this.BudgetService.updateCategory(category);
  }
}
