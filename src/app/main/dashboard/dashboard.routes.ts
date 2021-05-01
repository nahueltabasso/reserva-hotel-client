import { DashboardComponent } from './dashboard.component';
import { ReservasComponent } from '../reservas/reservas.component';
import { ReservaAddComponent } from '../reservas/reserva-add/reserva-add.component';
import { Routes } from '@angular/router';
import { ReservaViewComponent } from '../reservas/reserva-view/reserva-view.component';
import { PersonasComponent } from '../personas/personas.component';
import { PersonaViewComponent } from '../personas/persona-view/persona-view.component';
import { PersonaAddComponent } from '../personas/persona-add/persona-add.component';
import { PerfilComponent } from '../perfil/perfil.component';


export const dashboardRoutes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'reservas', component: ReservasComponent },
    { path: 'reservas/nueva-reserva', component: ReservaAddComponent },
    { path: 'reservas/detalle/:id', component: ReservaViewComponent },
    { path: 'personas', component: PersonasComponent },
    { path: 'personas/detalle/:id', component: PersonaViewComponent },
    { path: 'personas/:id', component: PersonaViewComponent },
    { path: 'personas/form/add', component: PersonaAddComponent },
    { path: 'mi-perfil', component: PerfilComponent }
];
   