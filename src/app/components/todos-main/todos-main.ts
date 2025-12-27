import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todosService/todo-service';
import { Todo } from '../todo/todo';

@Component({
  selector: 'app-todos-main',
  imports: [
    Todo
  ],
  templateUrl: './todos-main.html',
  styleUrl: './todos-main.scss',
  standalone: true
})
export class TodosMain {
  todosService = inject(TodoService)
}
