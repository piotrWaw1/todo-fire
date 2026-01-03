import { Component, computed, inject } from '@angular/core';
import { TodoService } from '../../services/todosService/todo-service';
import { CompletedCountPipe } from '../../pipe/completed-count-pipe';
import { Filter } from '../../type/filter.enum';
import { NgClass } from '@angular/common';
import { TodosFirebaseService } from '../../services/todosFirebases/todos-firebase-service';

@Component({
  selector: 'app-todos-footer',
  imports: [
    CompletedCountPipe,
    NgClass
  ],
  templateUrl: './todos-footer.html',
  styleUrl: './todos-footer.scss',
  standalone: true
})
export class TodosFooter {
  todoService = inject(TodoService)
  todoFireService = inject(TodosFirebaseService)

  todosLen = computed(() => this.todoService.todos().length)
  todoCompletedCount = computed(() => this.todoService.todos().filter((todo) => todo.isCompleted).length)
  protected readonly Filter = Filter;
}
