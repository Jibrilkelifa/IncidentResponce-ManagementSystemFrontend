import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './services/AuthGuard';

// Components
import { SigninComponent } from './incidents/auth/signin/signin.component';
import { SignupComponent } from './incidents/auth/signup/signup.component';
import { ForgotPasswordComponent } from './incidents/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './incidents/auth/reset-password/reset-password.component';
import { DashboardComponent } from './incidents/dashboard/dashboard.component';
import { IncidentListComponent } from './incidents/incident-list/incident-list.component';
import { IncidentDetailComponent } from './incidents/incident-detail/incident-detail.component';
import { CreateIncidentComponent } from './incidents/incident-create/incident-create.component';
import { EscalationListComponent } from './incidents/escalation-list/escalation-list.component';
import { EscalationFormComponent } from './incidents/escalation-create/escalation-create.component';
import { SOCReportComponent } from './incidents/report-create/report-create.component';
import { DownloadComponent } from './incidents/download/download.component';
import { KnowledgeBaseListComponent } from './incidents/knowledgeBase-list/knowledge-base-list.component';
import { KnowledgeBaseDetailComponent } from './incidents/knowledgeBase-detail/knowledge-base-detail.component';
import { KnowledgeBaseCreateComponent } from './incidents/knowledgeBase-create/knowledge-base-create.component';
import { GenerateScheduleComponent } from './incidents/components/generate-schedule/generate-schedule.component';
import { ScheduleViewComponent } from './incidents/components/schedule-view/schedule-view.component';
import { CreateAnalystComponent } from './incidents/components/create-analyst/create-analyst.component';

const routes: Routes = [
  // Public Routes
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  // Protected Routes
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'incidents', component: IncidentListComponent, canActivate: [AuthGuard] },
  { path: 'incident/:id', component: IncidentDetailComponent, canActivate: [AuthGuard] },
  { path: 'create', component: CreateIncidentComponent, canActivate: [AuthGuard] },
  { path: 'escalation', component: EscalationListComponent, canActivate: [AuthGuard] },
  { path: 'incident/:id/escalate', component: EscalationFormComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: SOCReportComponent, canActivate: [AuthGuard] },
  { path: 'download', component: DownloadComponent, canActivate: [AuthGuard] },
  { path: 'knowledge-base', component: KnowledgeBaseListComponent, canActivate: [AuthGuard] },
  { path: 'knowledge-base/create', component: KnowledgeBaseCreateComponent, canActivate: [AuthGuard] },
  { path: 'knowledge-base/:id', component: KnowledgeBaseDetailComponent, canActivate: [AuthGuard] },
  { path: 'scheduler/generate', component: GenerateScheduleComponent, canActivate: [AuthGuard] },
  { path: 'scheduler/view', component: ScheduleViewComponent, canActivate: [AuthGuard] },
  { path: 'scheduler/create-analyst', component: CreateAnalystComponent, canActivate: [AuthGuard] },

  // Wildcard Route for 404 Page
  { path: '**', redirectTo: '/signin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
