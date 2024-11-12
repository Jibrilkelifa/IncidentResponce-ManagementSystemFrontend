import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// PrimeNG imports
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

// CoreUI imports
import {
  AvatarModule,
  BreadcrumbModule,
  FooterModule,
  GridModule,
  HeaderModule,
  SidebarModule as CoreSidebarModule,
  NavModule,

  // Add other CoreUI modules as needed
} 
from '@coreui/angular';

// Application imports
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.module.routing'; 
import { IncidentsModule } from './incidents/incidents.module';
import { HeaderComponent } from './incidents/header/header.component';
import { FooteComponent } from './incidents/foote/foote.component';
import { SidebarComponent } from './incidents/sidebar/sidebar.component';
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooteComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DropdownModule,
    
    // PrimeNG modules
    ButtonModule,
    DialogModule,
    InputTextModule,
    MenuModule,
    SidebarModule,
    
    // CoreUI modules
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    // CoreSidebarModule,
    NavModule,
    CoreSidebarModule
  
  ],
  providers: [
    {
      // provide: LocationStrategy,
      // useClass: HashLocationStrategy,
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, multi: true
      
    },
    MessageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
