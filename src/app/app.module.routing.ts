import { RouterModule, Routes } from '@angular/router';
import { CreateIncidentComponent } from './incidents/incident-create/incident-create.component';
import { DashboardComponent } from './incidents/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { IncidentDetailComponent } from './incidents/incident-detail/incident-detail.component';
import { SigninComponent } from './incidents/auth/signin/signin.component';
import { SignupComponent } from './incidents/auth/signup/signup.component';
import { SOCReportComponent } from './incidents/report-create/report-create.component';
import { DownloadComponent } from './incidents/download/download.component';
import { EscalationFormComponent } from './incidents/escalation-create/escalation-create.component';
import { IncidentListComponent } from './incidents/incident-list/incident-list.component';
import { EscalationListComponent } from './incidents/escalation-list/escalation-list.component';
import { AuthGuard } from './services/AuthGuard';
import { ForgotPasswordComponent } from './incidents/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './incidents/auth/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' }, // Redirect to Signin
  { path: 'dashboard', component: DashboardComponent },
  { path: 'incidents', component: IncidentListComponent },
  { path: 'escalation', component: EscalationListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: CreateIncidentComponent },
  { path: 'incident/:id/escalate', component: EscalationFormComponent },
  { path: 'reports', component: SOCReportComponent },
  { path: 'download', component: DownloadComponent },
  { path: 'incident/:id', component: IncidentDetailComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
