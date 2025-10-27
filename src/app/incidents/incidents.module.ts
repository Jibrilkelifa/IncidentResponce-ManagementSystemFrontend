import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IncidentListComponent } from './incident-list/incident-list.component';
import { CreateIncidentComponent } from './incident-create/incident-create.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooteComponent } from './foote/foote.component';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';


import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { IncidentDetailComponent } from './incident-detail/incident-detail.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SidebarModule } from '@coreui/angular';
import { SOCReportComponent } from './report-create/report-create.component';
import { DownloadComponent } from './download/download.component';
import { EscalationFormComponent } from './escalation-create/escalation-create.component';
import { EscalationListComponent } from './escalation-list/escalation-list.component';
import { ChartModule } from 'primeng/chart';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { KnowledgeBaseCreateComponent } from './knowledgeBase-create/knowledge-base-create.component';
import { KnowledgeBaseListComponent } from './knowledgeBase-list/knowledge-base-list.component';
import { KnowledgeBaseDetailComponent } from './knowledgeBase-detail/knowledge-base-detail.component';
import { ScheduleViewComponent } from './components/schedule-view/schedule-view.component';
import { AnalystViewComponent } from './components/analyst-view/analyst-view.component';
import { GenerateScheduleComponent } from './components/generate-schedule/generate-schedule.component';
import { CreateAnalystComponent } from './components/create-analyst/create-analyst.component';
import { GrafanaAlertsComponent } from './grafana/grafana.alert.omponent';
import { PhishingDetailComponent } from './phishing-detail/phishing-detail.component';
import { AnomalyDetailComponent } from './anomaly-detail/anomaly-detail.component';
import { ThreatIntelComponent } from './threat-intel/threat-intel.component';
import { EventListComponent } from './event-list/event-list.component';
import { SystemHealthComponent } from './system-health/system-health.component';
import { CyberaiDashboardComponent } from './cyberai-dashboard/cyberai-dashboard.component';
import { ToolHealthCheckComponent } from './health-check/tool-health-check.component';
import { ShiftHandoverComponent } from './shift-handover/shift-handover.component';


@NgModule({
  declarations: [
    IncidentListComponent,
    EventListComponent,
    CreateIncidentComponent,
    DashboardComponent,
    IncidentDetailComponent,
    SigninComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SignupComponent,
    SOCReportComponent,
    DownloadComponent,
    EscalationFormComponent,
    EscalationListComponent,
    KnowledgeBaseCreateComponent,
    KnowledgeBaseListComponent,
    KnowledgeBaseDetailComponent,
    ScheduleViewComponent,
    AnalystViewComponent,
    GenerateScheduleComponent,
    CreateAnalystComponent,
    GrafanaAlertsComponent,
    PhishingDetailComponent,
    AnomalyDetailComponent,
    ThreatIntelComponent,
    CyberaiDashboardComponent,
    SystemHealthComponent,
    ToolHealthCheckComponent,
    ShiftHandoverComponent,

    // HeaderComponent,
    // SidebarComponent,
    // FooteComponent
    ],
  imports: [
    RouterModule,
    CalendarModule,
    FormsModule,
    ToastModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    CommonModule,
    ProgressSpinnerModule,
    PaginatorModule,
    ChartModule,
    
   

  ]
})
export class IncidentsModule { }
