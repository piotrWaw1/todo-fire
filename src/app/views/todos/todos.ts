import { Component, inject, OnInit } from '@angular/core';
import { TodosFirebaseService } from '../../services/todosFirebases/todos-firebase-service';
import { TodosHeader } from '../../components/todos-header/todos-header';
import { TodosMain } from '../../components/todos-main/todos-main';
import { TodosFooter } from '../../components/todos-footer/todos-footer';
import { ActivatedRoute } from '@angular/router';
import { Filter } from '../../type/filter.enum';

@Component({
  selector: 'app-todos',
  imports: [
    TodosHeader,
    TodosMain,
    TodosFooter,
  ],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
  standalone: true
})
export class Todos implements OnInit {
  todosFirebaseService = inject(TodosFirebaseService)
  route = inject(ActivatedRoute)

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.todosFirebaseService.setFilter(params['filter'] || Filter.all)
    })

    this.todosFirebaseService.loadTodos()
  }
}
