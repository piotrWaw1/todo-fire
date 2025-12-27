import { inject, Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class TodosFirebaseService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  private todosCollection = collection(this.firestore, 'todos');

  getTodos(): Observable<TodoInterface[]> {
    const uid = this.authService.currentUserSig()?.uid

    const q = query(
      this.todosCollection,
      where('uid', '==', uid)
    )

    return collectionData(q, {
      idField: 'id'
    }) as Observable<TodoInterface[]>
  }

  addTodo(text: string): Observable<string> {
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

    return from(promise);
  }

  toggleTodo(id: string, isCompleted: boolean): Observable<void> {
    const docRef = doc(this.todosCollection, id);
    const promise = updateDoc(docRef, { isCompleted });

    return from(promise);
  }

}
