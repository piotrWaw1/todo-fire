import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { TodosFirebaseService } from '../../services/todosFirebases/todos-firebase-service';
import { TodoService } from '../../services/todosService/todo-service';

@Component({
  selector: 'app-todos-header',
  imports: [
    FormsModule,
    MatInput,
    ReactiveFormsModule,
    MatFormField,
    MatLabel
  ],
  templateUrl: './todos-header.html',
  styleUrl: './todos-header.scss',
  standalone: true
})
export class TodosHeader {
  todoFireService = inject(TodosFirebaseService)
  todoService = inject(TodoService)
  todoTitle = ''

  addTodo() {
    if(this.todoTitle){
      this.todoFireService.addTodo(this.todoTitle).subscribe((response) => {
        this.todoService.addTodo(this.todoTitle, response);
      })
      this.todoTitle = ''
    }
  }
}
