import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../models/model';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PersonaViewComponent } from './persona-view/persona-view.component';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  personaList: Persona[] = [];

  constructor(private personaService: PersonaService) {}

  ngOnInit() {
    this.personaService.getAll().subscribe(data => {
      this.personaList = data;
    });
  }

  public eliminar(persona: Persona) {
    Swal.fire({
      title: 'Estas seguro?',
      text: `Seguro que desea eliminar a ${persona.nombre} ${persona.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.personaService.delete(persona.id).subscribe(() => {
          Swal.fire('Eliminado', 'Persona eliminada con exito', 'success');
          this.ngOnInit();
        }, err => {
          Swal.fire('Error!', `${err.error.message}`, 'error');
        });
      }
    });
  }

}
