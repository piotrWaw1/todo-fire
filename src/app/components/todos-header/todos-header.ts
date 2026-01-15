import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { TodosFirebaseService } from '../../services/todosFirebases/todos-firebase-service';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  selector: 'app-todos-header',
  imports: [
    FormsModule,
    MatInput,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    LucideAngularModule
  ],
  templateUrl: './todos-header.html',
  styleUrl: './todos-header.scss',
  standalone: true
})
export class TodosHeader {
  readonly PlusIcon = Plus;
  todoFireService = inject(TodosFirebaseService)
  todoTitle = ''

  addTodo() {
    if(this.todoTitle){
      this.todoFireService.addTodo(this.todoTitle)
      this.todoTitle = ''
    }
  }
}
