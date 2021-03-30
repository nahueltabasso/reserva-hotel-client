import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { ResetPassComponent } from './auth/reset-pass/reset-pass.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ReservasComponent } from './main/reservas/reservas.component';
import { ReservaAddComponent } from './main/reservas/reserva-add/reserva-add.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { authInterceptorProvider } from './helpers/auth.interceptor';

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
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [DatePipe, authInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
