import { Component, inject } from '@angular/core';
import { Filter } from '../../type/filter.enum';
import { NgClass } from '@angular/common';
import { TodosFirebaseService } from '../../services/todosFirebases/todos-firebase-service';
import { TodosInfoPipe } from '../../pipe/todos-info-pipe';

@Component({
  selector: 'app-todos-footer',
  imports: [
    NgClass,
    TodosInfoPipe
  ],
  templateUrl: './todos-footer.html',
  styleUrl: './todos-footer.scss',
  standalone: true
})
export class TodosFooter {
  todoFireService = inject(TodosFirebaseService)

  protected readonly Filter = Filter;
}
