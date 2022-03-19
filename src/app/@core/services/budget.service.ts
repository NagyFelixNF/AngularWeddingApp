import { Y } from '@angular/cdk/keycodes';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbTokenService } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { isConstructorDeclaration } from 'typescript';
import { Budget, Category, Spending } from '../data/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  url = "https://localhost:5001/api/budget/"
  Budget : Budget =
  (
    {
      'id': '1',
      'budget' : 100000,
      'categories' :[]
    }
  );
  asd : Budget;

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

  GetBudget(): Observable<Budget>
  {
    return this.http.get<Budget>(this.url,this.GetHeader());
  }

  AddCategory(id:string): Observable<Category>
  {
    var newCategory = {
    'title': 'Category',
    'total': 0,
    'spendings': []
    };
    return this.http.post<Category>(this.url + "category/" + id,newCategory,this.GetHeader()).pipe();
  }

  AddSpending(id:string): Observable<Spending>
  {
    var newSpending = 
    {
      'cost':null,
      'title':""
    }
    return this.http.post<Spending>(this.url + "spending/" + id,newSpending,this.GetHeader()).pipe();
  }

  UpdateBudge(Budget: Budget): void
  {
    this.http.patch(this.url+Budget.id,Budget,this.GetHeader()).subscribe();
  }

  updateCategory(category:Category)
  {
    this.http.patch<Category>(this.url + "category/" + category.id,category,this.GetHeader()).subscribe();
  }
}
