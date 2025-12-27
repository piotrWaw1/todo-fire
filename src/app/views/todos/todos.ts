import { Component, inject, OnInit } from '@angular/core';
import { TodosFirebaseService } from '../../services/todosFirebases/todos-firebase-service';
import { TodosHeader } from '../../components/todos-header/todos-header';
import { TodoService } from '../../services/todosService/todo-service';
import { TodosMain } from '../../components/todos-main/todos-main';

@Component({
  selector: 'app-todos',
  imports: [
    TodosHeader,
    TodosMain
  ],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
  standalone: true
})
export class Todos implements OnInit {
  todosFirebaseService = inject(TodosFirebaseService)
  todoService = inject(TodoService)

  ngOnInit() {
    this.todosFirebaseService.getTodos().subscribe(todos => {
      this.todoService.todos.set([...todos]);
    })
  }
}
