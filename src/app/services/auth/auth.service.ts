import { computed, inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut,
  updateProfile, user
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth)
  user$ = user(this.firebaseAuth)

  private userSignal = toSignal(this.user$);
  isPending = computed(() => this.userSignal() === undefined);

  currentUserSig = computed(() => {
    const user = this.userSignal();
    if (!user) return null;

    return {
      email: user.email!,
      username: user.displayName!,
      uid: user.uid
    };
  });

  signup(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(response => updateProfile(response.user, { displayName: username }));

    return from(promise)
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {
    });

    return from(promise)
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth).then(() => {
    });

    return from(promise)
  }

}
