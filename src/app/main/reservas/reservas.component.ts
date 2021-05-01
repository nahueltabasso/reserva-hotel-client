import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EstadoReserva, Reserva, ReservaFilterDTO } from '../../models/model';
import { ReservaService } from '../../services/reserva.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  titulo: string;
  formulario: FormGroup;
  fechaDesdeFilter: Date = new Date();
  fechaHastaFilter: Date = new Date();
  reservaList: Reserva[] = [];
  comboEstados: EstadoReserva[] = [];
  reservaFilterDto: ReservaFilterDTO = new ReservaFilterDTO();

  constructor(private reservaService: ReservaService,
              private authService: AuthService,
              private fb: FormBuilder) {}

  ngOnInit() {
    if (this.authService.isCliente()) {
      this.titulo = 'Mis Reservas';
    } else {
      this.titulo = 'Reservas';
    }
    this.reservaService.getAllReservas().subscribe(data => {
      this.reservaList = data;
    });
    this.reservaService.getAllEstados().subscribe(estados => {
      this.comboEstados = estados;
    });
    this.createForm();    
  }

  public createForm() {
    this.formulario = this.fb.group({
      estadoReserva: ['', ]
    });
  }

  public seleccionarEstado(event) {
    // this.estadoReservaFilter = event;
    this.reservaFilterDto.estado = event;
  }

  public compararEstados(e1: EstadoReserva, e2: EstadoReserva): boolean{
    return e1.id === e2.id;
  }

  public search() {
    if (!this.formulario.valid) return;
    this.reservaService.search(this.reservaFilterDto.estado.id).subscribe(data => {
      this.reservaList = data;
    });
  }

  public cleanFilter() {
    this.reservaFilterDto = new ReservaFilterDTO();
    this.formulario.controls['estadoReserva'].setValue('');
    this.ngOnInit();
  }

  public eliminar(reserva: Reserva) {
    Swal.fire({
      title: 'Estas seguro?',
      text: `Seguro que desea eliminar la reserva con ID ${reserva.id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.reservaService.delete(reserva.id).subscribe(() => {
          Swal.fire('Eliminado', 'Reserva eliminado con exito', 'success');
          this.ngOnInit();
        });
      }
    });
  }

  public cancelarReserva(reserva: Reserva) {
    Swal.fire({
      title: 'Estas seguro?',
      text: `Seguro que desea cancelar la reserva con ID ${reserva.id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.reservaService.cancelarReserva(reserva.id).subscribe(() => {
          Swal.fire('Cancelada', 'Reserva cancelada con exito', 'success');
          this.ngOnInit();
        });
      }
    });
  }
}
