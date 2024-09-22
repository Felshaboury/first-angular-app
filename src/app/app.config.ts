import { CommonModule } from '@angular/common';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'; // Ensure Auth is included if needed
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; // Import Firestore
import { FormsModule } from '@angular/forms';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const firebaseConfig = {
  apiKey: "AIzaSyDr2Q2A86jg2zJPjpdQN6UOfy8a-BosEzI",
  authDomain: "first-angular-app-5aa20.firebaseapp.com",
  projectId: "first-angular-app-5aa20",
  storageBucket: "first-angular-app-5aa20.appspot.com",
  messagingSenderId: "526504834808",
  appId: "1:526504834808:web:4920d9ccdc05c9ec3aed0d"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    importProvidersFrom(FormsModule, CommonModule)
  ]
};
