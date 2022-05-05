import { P } from '@angular/cdk/keycodes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable, OnInit } from '@angular/core';
import { NbTokenService } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubTask, Todo } from '../data/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[];
  token : any;

  

  url = "https://localhost:5001/api/preparation/"

  constructor(private TokenService: NbTokenService, private http: HttpClient) {

  }

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

  getTodos() : Observable<Todo[]>
  {
    return this.http.get<Todo[]>(this.url,this.GetHeader()).pipe();
  }

  AddTodo() : Observable<Todo>
  {
    var todosample =
    (
      {
        'title': 'Title',
        'completed': false,
        'subPreparations' :
        [],
      }
    );
    return this.http.post<Todo>(this.url,todosample,this.GetHeader()).pipe();
  }

  AddSubTodo(todo: Todo)
  {
    if(todo.completed == true){
    todo.completed = false;
    this.http.patch(this.url+todo.id,todo,this.GetHeader()).subscribe();
    }
    var todosample =
    (
      {
        'title': 'Title',
        'completed': false,
        'subPreparations' :
        [],
      }
    );
    this.http.post<SubTask>(this.url+"sub/"+todo.id,todosample,this.GetHeader()).subscribe(x =>{
      console.log(x);
      x.subEditing = true;
      todo.subPreparations.unshift(x);
    })
  }

  DoneEditingTodo(todo: Todo)
  {
    console.log(todo.title);
    this.http.patch(this.url+todo.id,todo,this.GetHeader()).subscribe();
    todo.editing = false;
  }

  DoneEditingSubTodo(todo: SubTask)
  {
    console.log(todo.title);
    this.http.patch(this.url+"sub/"+todo.id,todo,this.GetHeader()).subscribe();
    todo.subEditing = false;
  }

  SubTodoCheckboxChanged(event: any, todo: Todo, subtodo: SubTask,) {
    var AllSubDoneFlag: boolean;
    AllSubDoneFlag = true;
    subtodo.completed = event;
    this.http.patch(this.url + "sub/" + subtodo.id, subtodo, this.GetHeader()).subscribe();
    todo.subPreparations.forEach(
      sub => {
        if (sub.completed === false) {
          AllSubDoneFlag = false;
          return;
        }
      }
    );
    if (AllSubDoneFlag) {
      if (todo.completed != true) {
        todo.completed = true;
        this.http.patch(this.url + todo.id, todo, this.GetHeader()
        ).subscribe();
      }
    }
    else {
      if (todo.completed != false) {
        todo.completed = false;
        this.http.patch(this.url + todo.id, todo, this.GetHeader()
        ).subscribe();
      }
    }
  }

  TodoCheckboxChanged(event: any, todo: Todo) {
    todo.completed = event;
    this.http.patch(this.url + todo.id, todo, this.GetHeader()).subscribe();
    todo.subPreparations.forEach(
      sub => {
        sub.completed = event;
        this.http.patch(this.url + "sub/" + sub.id, sub, this.GetHeader()
        ).subscribe();
      }
    );
  }

  RemoveTodo(id:string)
  {
    console.log("rtdo")
    this.http.delete(this.url+id,this.GetHeader()).subscribe();
  }


  RemoveSubTodo(id:string)
  {
    console.log("subtdo")
    this.http.delete(this.url+"sub/"+id,this.GetHeader()).subscribe();
  }
}
