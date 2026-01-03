import { Component, inject, OnInit } from '@angular/core';
import { TodosFirebaseService } from '../../services/todosFirebases/todos-firebase-service';
import { TodosHeader } from '../../components/todos-header/todos-header';
import { TodoService } from '../../services/todosService/todo-service';
import { TodosMain } from '../../components/todos-main/todos-main';
import { TodosFooter } from '../../components/todos-footer/todos-footer';
import { ActivatedRoute } from '@angular/router';
import { Filter } from '../../type/filter.enum';

@Component({
  selector: 'app-todos',
  imports: [
    TodosHeader,
    TodosMain,
    TodosFooter
  ],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
  standalone: true
})
export class Todos implements OnInit {
  todosFirebaseService = inject(TodosFirebaseService)
  todoService = inject(TodoService)
  route = inject(ActivatedRoute)

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.todosFirebaseService.filter.set(params['filter'] || Filter.all)
    })

    this.todosFirebaseService.getTodos().subscribe(todos => {
      this.todoService.todos.set([...todos]);
    })
  }
}
