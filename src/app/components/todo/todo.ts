import { Component, inject, Input } from '@angular/core';
import { TodoService } from '../../services/todosService/todo-service';
import { TodosFirebaseService } from '../../services/todosFirebases/todos-firebase-service';
import { MatCheckbox } from '@angular/material/checkbox';
import { TodoInterface } from '../../type/todo.interface';
import { MatButton } from '@angular/material/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todo',
  imports: [
    MatCheckbox,
    MatButton,
    NgClass,
  ],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
  standalone: true
})
export class Todo {
  @Input({ required: true }) todo!: TodoInterface

  todosService = inject(TodoService)
  todoFireService = inject(TodosFirebaseService)

  deleteTodo() {
    this.todoFireService.deleteTodo(this.todo.id).subscribe(() => {
      this.todosService.deleteTodo(this.todo.id)
    })
  }

  toggleTodo() {
    this.todoFireService.toggleTodo(this.todo.id, !this.todo.isCompleted).subscribe(() => {
      this.todosService.toggleTodo(this.todo.id)
    })
  }
}
