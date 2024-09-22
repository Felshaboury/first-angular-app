import { importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyDr2Q2A86jg2zJPjpdQN6UOfy8a-BosEzI",
  authDomain: "first-angular-app-5aa20.firebaseapp.com",
  projectId: "first-angular-app-5aa20",
  storageBucket: "first-angular-app-5aa20.appspot.com",
  messagingSenderId: "526504834808",
  appId: "1:526504834808:web:4920d9ccdc05c9ec3aed0d"
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Set up routing
    importProvidersFrom(FormsModule), // Import other necessary modules
    importProvidersFrom(RouterModule.forRoot(routes)),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
}).catch(err => console.error(err));
