import { Pipe, PipeTransform } from '@angular/core';
import { TodoInterface } from '../type/todo.interface';
import { Filter } from '../type/filter.enum';

@Pipe({
  standalone: true,
  name: 'todosInfo'
})
export class TodosInfoPipe implements PipeTransform {

  transform(todos: TodoInterface[], ...args: unknown[]): string {
    const todosLen = todos.length
    if (args[0] === Filter.done) {
      return `Done: ${todosLen}`
    }
    if (args[0] === Filter.inProgress) {
      return `In progress: ${todosLen}`
    }

    const todoCompletedCount = todos.filter((todo) => todo.isCompleted).length

    return `Finished: ${todoCompletedCount} of ${todosLen}`
  }

}
