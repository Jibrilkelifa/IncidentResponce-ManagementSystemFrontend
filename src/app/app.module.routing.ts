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
import { KnowledgeBaseListComponent } from './incidents/knowledgeBase-list/knowledge-base-list.component';
import { KnowledgeBaseDetailComponent } from './incidents/knowledgeBase-detail/knowledge-base-detail.component';
import { KnowledgeBaseCreateComponent } from './incidents/knowledgeBase-create/knowledge-base-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' }, // Redirect to Signin
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'incidents', component: IncidentListComponent,canActivate: [AuthGuard] },
  { path: 'escalation', component: EscalationListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: CreateIncidentComponent ,canActivate: [AuthGuard]},
  { path: 'incident/:id/escalate', component: EscalationFormComponent,canActivate: [AuthGuard] },
  { path: 'reports', component: SOCReportComponent ,canActivate: [AuthGuard]},
  { path: 'download', component: DownloadComponent ,canActivate: [AuthGuard]},
  { path: 'incident/:id', component: IncidentDetailComponent,canActivate: [AuthGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent,canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent,canActivate: [AuthGuard] },
  { path: 'reset-password', component: ResetPasswordComponent ,canActivate: [AuthGuard]},
  { path: 'knowledge-base', component: KnowledgeBaseListComponent,canActivate: [AuthGuard] },
  { path: 'knowledge-base/create', component: KnowledgeBaseCreateComponent,canActivate: [AuthGuard] },
  { path: 'knowledge-base/:id', component: KnowledgeBaseDetailComponent,canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
