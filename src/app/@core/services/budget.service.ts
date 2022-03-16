import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Budget } from '../data/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  url = "https://localhost:5001/api/preparation/"
  Budget : Budget =
  (
    {
      'id': '1',
      'budget' : 100000,
      'categories' :[
        {
          'id': '1',
          'title': 'category',
          'spendings': []
        },
        {
          'id': '2',
          'title': 'category',
          'spendings': []
        },
      ]
    }
  );

  constructor() { }

  GetBudget(): Observable<Budget>
  {
    return of(this.Budget);
  }
}
