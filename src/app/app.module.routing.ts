import { RouterModule, Routes } from '@angular/router';
import { IncidentListComponent } from './incidents/incident-list/incident-list.component';
import { CreateIncidentComponent } from './incidents/incident-create/incident-create.component';
import { DashboardComponent } from './incidents/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { IncidentDetailComponent } from './incidents/incident-detail/incident-detail.component';
import { SigninComponent } from './incidents/auth/signin/signin.component';
import { SignupComponent } from './incidents/auth/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'incidents', component: IncidentListComponent },
  { path: 'create', component: CreateIncidentComponent },
  { path: 'incident/:id', component: IncidentDetailComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
