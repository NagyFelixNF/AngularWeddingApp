import { analyzeAndValidateNgModules, BoundDirectivePropertyAst } from '@angular/compiler';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NbContextMenuDirective, NbMenuBag, NbMenuService } from '@nebular/theme';
import { SubTask, Todo } from 'app/@core/data/todo';
import { filter } from 'rxjs-compat/operator/filter';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todos:Todo[];
  items = 
  [
  { title: 'Edit',icon: { icon: 'pen-to-square',pack:'fa-solid'}, data:1 }, 
  { title: 'Remove',icon: { icon: 'trash',pack:'fa-solid'} ,data:2 },
  ];
  subitems = 
  [
  { title: 'Edit',icon: { icon: 'pen-to-square',pack:'fa-solid'}, data:3 }, 
  { title: 'Remove',icon: { icon: 'trash',pack:'fa-solid'} ,data:4 },
  ];
  
  constructor(private nbMenuService: NbMenuService) {
  }

  ngOnInit() {
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

    this.nbMenuService.onItemClick()
    .subscribe(
      (menuBag:NbMenuBag) => {
        if(menuBag.item.data == 1)
        {
          this.EditTodo(menuBag.tag);
        }
        if(menuBag.item.data == 2)
        {
          this.RemoveTodo(menuBag.tag);
        }
        if(menuBag.item.data == 3)
        {
          this.EditSubTodo(menuBag.tag);
        }
        if(menuBag.item.data == 4)
        {
          this.RemoveSubTodo(menuBag.tag);
        }
      }
    );

    
  }

  GetTodoById(id:string)
  {
    return this.todos.find(x => x.Id === id);
  }

  GetSubTodoById(id:string,subid:string)
  {
    var todo: Todo;
    todo = this.todos.find(x => x.Id === id);
    return todo.SubTasks.find(x => x.Id === subid);
  }

  EditTodo(id:string)
  {
      var todo: Todo;
      todo = this.GetTodoById(id);
      todo.Editing = true;
  }

  RemoveTodo(id:string)
  {
    this.todos = this.todos.filter(x => x.Id !== id);
  }

  EditSubTodo(id:string)
  {
      var ids: string[];
      console.log(id);
      ids = id.split("&subtodo=");
      var subtodo: SubTask;
      subtodo = this.GetSubTodoById(ids[0],ids[1]);
      subtodo.SubEditing = true;
  }

  RemoveSubTodo(id:string)
  {
    var ids: string[];
    ids = id.split("&subtodo=");
    console.log(id);
    var todo: Todo;
    todo = this.GetTodoById(ids[0]);
    todo.SubTasks = todo.SubTasks.filter(x => x.Id !== ids[1]);
  }


  DoneEditingTodo(todo: Todo)
  {
    todo.Editing = false;
  }

  DoneEditingSubTodo(todo: SubTask)
  {
    todo.SubEditing = false;
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
}
