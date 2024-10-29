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


@NgModule({
  declarations: [
    IncidentListComponent,  
    CreateIncidentComponent,
    DashboardComponent,
    IncidentDetailComponent,
    SigninComponent,
    SignupComponent
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
    PaginatorModule
   

  ]
})
export class IncidentsModule { }
