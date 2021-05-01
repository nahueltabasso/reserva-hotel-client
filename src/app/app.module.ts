import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { ResetPassComponent } from './auth/reset-pass/reset-pass.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ReservasComponent } from './main/reservas/reservas.component';
import { ReservaAddComponent } from './main/reservas/reserva-add/reserva-add.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { authInterceptorProvider } from './helpers/auth.interceptor';
import { ReservaViewComponent } from './main/reservas/reserva-view/reserva-view.component';
import { PersonasComponent } from './main/personas/personas.component';
import { PersonaAddComponent } from './main/personas/persona-add/persona-add.component';
import { PersonaEditComponent } from './main/personas/persona-edit/persona-edit.component';
import { PersonaViewComponent } from './main/personas/persona-view/persona-view.component';
import { PerfilComponent } from './main/perfil/perfil.component';

// MATERIAL
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    ResetPassComponent,
    NavbarComponent,
    FooterComponent,
    ReservasComponent,
    ReservaAddComponent,
    DashboardComponent,
    ReservaViewComponent,
    PersonasComponent,
    PersonaAddComponent,
    PersonaEditComponent,
    PersonaViewComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [DatePipe, authInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
