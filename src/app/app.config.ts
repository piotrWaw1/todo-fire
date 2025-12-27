import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBe_zZy-MrJtB54ZYU-hpVhuDcE5sQrjYo",
  authDomain: "angular-todo-a1f85.firebaseapp.com",
  projectId: "angular-todo-a1f85",
  storageBucket: "angular-todo-a1f85.firebasestorage.app",
  messagingSenderId: "940014846842",
  appId: "1:940014846842:web:a8be7d2c9ad512a6470cc3",
  measurementId: "G-RPEMMPNZ9T"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
