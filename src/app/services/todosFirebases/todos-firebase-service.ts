import { computed, inject, Injectable, signal } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  query,
  updateDoc,
  where
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { TodoInterface } from '../../type/todo.interface';
import { AuthService } from '../auth/auth.service';
import { Filter } from '../../type/filter.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TodosFirebaseService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  private todos = signal<TodoInterface[]>([])
  filter = signal<Filter>(Filter.all)
  isPending = signal(false);


  filteredTodos = computed(() => {
    if (this.filter() === Filter.done) {
      return this.todos().filter((todo) => todo.isCompleted)
    } else if (this.filter() === Filter.inProgress) {
      return this.todos().filter((todo) => !todo.isCompleted)
    }

    return this.todos()
  })

  private router = inject(Router)
  private route = inject(ActivatedRoute)

  private todosCollection = collection(this.firestore, 'todos');

  loadTodos(): void {

    const uid = this.authService.currentUserSig()?.uid

    const q = query(
      this.todosCollection,
      where('uid', '==', uid)
    )

    collectionData(q, {
      idField: 'id'
    }).subscribe((data => this.todos.set(data as TodoInterface[])))
  }

  addTodo(text: string): Observable<string> {
    console.log("add todos")
    const uid = this.authService.currentUserSig()?.uid
    const todoToCreate = { uid, title: text, isCompleted: false }

    const promise = addDoc(
      this.todosCollection,
      todoToCreate
    ).then(response => response.id)

    return from(promise);
  }

  deleteTodo(id: string): Observable<void> {
    const docRef = doc(this.todosCollection, id)
    const promise = deleteDoc(docRef);

    return from(promise)
  }

  toggleTodo(id: string, isCompleted: boolean): Observable<void> {
    const docRef = doc(this.todosCollection, id);
    const promise = updateDoc(docRef, { isCompleted });

    return from(promise);
  }

  setFilter(filter: Filter) {
    this.filter.set(filter)

    if (filter !== Filter.all) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { filter },
        queryParamsHandling: 'merge'
      }).then()
    } else {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { filter: null },
        queryParamsHandling: 'merge'
      }).then()
    }
  }

}
