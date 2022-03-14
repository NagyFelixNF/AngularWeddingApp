import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { analyzeAndValidateNgModules, BoundDirectivePropertyAst } from '@angular/compiler';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NbContextMenuDirective, NbMenuBag, NbMenuService } from '@nebular/theme';
import { SubTask, Todo } from 'app/@core/data/todo';
import { TodoService } from 'app/@core/services/todo.service';
import { filter } from 'rxjs-compat/operator/filter';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  animations:
  [
    trigger('fade1',[

      transition(':enter',[
        style({opacity: 0, transform: 'translateY(-30px)'}),
        animate('320ms ease-out', style({opacity: 1, transform: 'translateY(0px)'}))
      ]),

      transition(':leave',[
        query('.hide', style({ display: 'none' })),
        animate(225, style({opacity: 0, transform: 'translateX(30px)'}))
      ])
    ])
  ]
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
  
  constructor(private nbMenuService: NbMenuService, public TodoService: TodoService) {

  }

  ngOnInit() {
    this.getTodo();

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

  getTodo(): void
  {
    this.TodoService.getTodos().subscribe(todos => this.todos = todos);
  }

  GetTodoById(id:string)
  {
    return this.todos.find(x => x.id === id);
  }

  GetSubTodoById(id:string,subid:string)
  {
    var todo: Todo;
    todo = this.todos.find(x => x.id === id);
    console.log(todo.subPreparations);
    return todo.subPreparations.find(x => x.id == subid);
  }

  EditTodo(id:string)
  {
      console.log(this.todos[0].title);
      var todo: Todo;
      todo = this.GetTodoById(id);
      todo.editing = true;
  }

  RemoveTodo(id:string)
  {
    var todo: Todo;
    todo = this.GetTodoById(id);
    this.TodoService.RemoveTodo(id);
    console.log("főcal");
    var index = this.todos.indexOf(todo);
    if(index !== -1) {
      this.todos.splice(index, 1);
    }
  }

  EditSubTodo(id:string)
  {
      var ids: string[];
      console.log(id);
      ids = id.split("&subtodo=");
      var subtodo: SubTask;
      subtodo = this.GetSubTodoById(ids[0],ids[1]);
      subtodo.subEditing = true;
  }

  RemoveSubTodo(id:string)
  {
    var ids: string[];
    ids = id.split("&subtodo=");
    var todo: SubTask;
    todo = this.GetSubTodoById(ids[0],ids[1]);
    var main : Todo;
    main = this.GetTodoById(ids[0]);
    this.TodoService.RemoveSubTodo(ids[1]);
    var index = main.subPreparations.indexOf(todo);
    if(index != -1) {
      main.subPreparations.splice(index, 1);
    }
  }

  AddTodo()
  {
    this.TodoService.AddTodo().subscribe(todo => {
      todo.editing = true
      this.todos.unshift(todo)
    });
  }
  


  

 
}
