import { Component, inject } from '@angular/core';
import { Todo } from '../todo/todo';
import { TodosFirebaseService } from '../../services/todosFirebases/todos-firebase-service';

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
  todosFirebaseService = inject(TodosFirebaseService)
}
