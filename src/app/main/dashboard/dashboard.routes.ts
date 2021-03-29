import { DashboardComponent } from './dashboard.component';
import { ReservasComponent } from '../reservas/reservas.component';
import { ReservaAddComponent } from '../reservas/reserva-add/reserva-add.component';
import { Routes } from '@angular/router';


export const dashboardRoutes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'reservas', component: ReservasComponent },
    { path: 'reservas/nueva-reserva', component: ReservaAddComponent },
];
   