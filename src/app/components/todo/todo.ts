import { Component, inject, Input } from '@angular/core';
import { TodosFirebaseService } from '../../services/todosFirebases/todos-firebase-service';
import { MatCheckbox } from '@angular/material/checkbox';
import { TodoInterface } from '../../type/todo.interface';
import { NgClass } from '@angular/common';
import { LucideAngularModule, Plus, Trash2Icon } from 'lucide-angular';

@Component({
  selector: 'app-todo',
  imports: [
    MatCheckbox,
    NgClass,
    LucideAngularModule
  ],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
  standalone: true
})
export class Todo {
  @Input({ required: true }) todo!: TodoInterface
  readonly TrashIcon = Trash2Icon
  todoFireService = inject(TodosFirebaseService)

  deleteTodo() {
    this.todoFireService.deleteTodo(this.todo.id)
  }

  toggleTodo() {
    this.todoFireService.toggleTodo(this.todo.id, !this.todo.isCompleted)
  }

  protected readonly PlusIcon = Plus;
}
