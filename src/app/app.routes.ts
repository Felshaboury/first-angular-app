// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BugReviewComponent } from './bug-review/bug-review.component';

export const routes: Routes = [
  { path: '', component: AppComponent }, // Main page
  { path: 'bug-review', component: BugReviewComponent }
];
