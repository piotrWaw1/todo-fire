import { Pipe, PipeTransform } from '@angular/core';
import { TodoInterface } from '../type/todo.interface';

@Pipe({
  standalone: true,
  name: 'completedCount'
})
export class CompletedCountPipe implements PipeTransform {

  transform(todos: TodoInterface[]): number {
    return todos.filter((todo) => todo.isCompleted).length;
  }

}
