import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { ResetPassComponent } from './auth/reset-pass/reset-pass.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { dashboardRoutes } from './main/dashboard/dashboard.routes';
import { AuthGuard } from './services/guard/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'modificar-contraseña', component: ResetPassComponent },
  { path: '', 
    component: DashboardComponent,
    children: dashboardRoutes,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
