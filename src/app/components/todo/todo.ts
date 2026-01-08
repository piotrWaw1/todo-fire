import { Component, inject, Input } from '@angular/core';
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

  todoFireService = inject(TodosFirebaseService)

  deleteTodo() {
    this.todoFireService.deleteTodo(this.todo.id)
  }

  toggleTodo() {
    this.todoFireService.toggleTodo(this.todo.id, !this.todo.isCompleted)
  }
}
