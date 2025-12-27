import { Injectable, signal } from '@angular/core';
import { TodoInterface } from '../../type/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos = signal<TodoInterface[]>([])

  addTodo(title: string, id: string) {
    const newTodo: TodoInterface = {
      id, title,
      isCompleted: false
    }

    this.todos.update((prev) => (
      [...prev, newTodo]
    ))
  }

  deleteTodo(id: string) {
    this.todos.update((prev) => prev.filter((todo) => todo.id !== id))
  }

  toggleTodo(id: string) {
    this.todos.update((prev) => prev.map(todo => (
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted }
        : todo
    )))
  }

}
