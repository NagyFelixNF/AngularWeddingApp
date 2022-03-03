import { analyzeAndValidateNgModules } from '@angular/compiler';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { NbTokenService } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { SubTask, Todo } from '../data/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[];
  token : any;

  constructor(private TokenService: NbTokenService) {

    this.todos = 
    [
      {
        'Id' : "2",
        'MainTitle': 'main1',
        'Completed': false,
        'Editing' : false,
        'SubTasks' :
        [
          {
            'Id' : "2",
            'SubTitle': 'sub1',
            'SubCompleted': false,
            'SubEditing' : false,
          },
          {
            'Id' : "1",
            'SubTitle': 'sub2',
            'SubCompleted': false,
            'SubEditing' : false,
          },
        ]
      },
      {
        'Id' : "1",
        'MainTitle': 'main1',
        'Completed': false,
        'Editing' : false,
        'SubTasks' :
        []
      },
    ]

   }

  getTodos() : Observable<Todo[]>
  {
    this.TokenService.get().subscribe(
      x => this.token = x.getValue()
    )
    console.log(this.token);
    const todoar = of(this.todos);
    return todoar;
  }

  AddTodo()
  {
    var a;
    if(this.todos.length>0)
    {
      a = this.todos[0].Id + 1;
    }
    else
    {
       a = '1';
    }
    this.todos.unshift
    (
      {
        'Id' : a,
        'MainTitle': 'Title',
        'Completed': false,
        'Editing' : true,
        'SubTasks' :
        [],
      }
    );
  }

  AddSubTodo(todo: Todo)
  {
    todo.Completed = false;
    var a;
    if(todo.SubTasks.length>0)
    {
      a = todo.SubTasks[0].Id + 1;
    }
    else
    {
       a = '1';
    }
    todo.SubTasks.unshift
    (
      {
        'Id' : a,
        'SubTitle': 'Title',
        'SubCompleted': false,
        'SubEditing' : true,
      }
    );
  }

  DoneEditingTodo(todo: Todo)
  {
    console.log(todo.MainTitle);
    todo.Editing = false;
  }

  DoneEditingSubTodo(todo: SubTask)
  {
    todo.SubEditing = false;
  }

  SubTodoCheckboxChanged(event :any,todo: Todo, subtodo:SubTask,)
  {
    var AllSubDoneFlag: boolean;
    AllSubDoneFlag = true; 
    subtodo.SubCompleted = event;
    todo.SubTasks.forEach(
      sub =>
      {
        if(sub.SubCompleted === false)
        {
          AllSubDoneFlag = false;
          return;
        }
      }
    );
    if(AllSubDoneFlag){
    todo.Completed = true;
    }
    else
    {
      todo.Completed = false;
    }
  }

  TodoCheckboxChanged(event :any,todo: Todo)
  {
    todo.Completed = event;
    todo.SubTasks.forEach(
      sub =>
      {
        sub.SubCompleted = event;
      }
    );
  }

  RemoveTodo(todo:Todo)
  {
    var index = this.todos.indexOf(todo);
    if(index !== -1) {
      this.todos.splice(index, 1);
    }
  }


  RemoveSubTodo(todo: Todo,id:string)
  {
    todo.SubTasks = todo.SubTasks.filter(x => x.Id !== id);
  }
}
