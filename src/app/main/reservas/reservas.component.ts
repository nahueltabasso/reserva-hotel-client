import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EstadoReserva, Reserva, ReservaFilterDTO } from '../../models/model';
import { ReservaService } from '../../services/reserva.service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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
  reservaListRespaldo: Reserva[] = [];
  comboEstados: EstadoReserva[] = [];
  reservaFilterDto: ReservaFilterDTO = new ReservaFilterDTO();

  constructor(private reservaService: ReservaService,
              private authService: AuthService,
              private fb: FormBuilder,
              private datePipe: DatePipe) {}

  ngOnInit() {
    if (this.authService.isCliente()) {
      this.titulo = 'Mis Reservas';
    } else {
      this.titulo = 'Reservas';
    }
    this.reservaService.getAllReservas().subscribe(data => {
      this.reservaList = data;
      this.reservaListRespaldo = data;
    });
    this.reservaService.getAllEstados().subscribe(estados => {
      this.comboEstados = estados;
    });
    this.createForm();    
    this.formulario.controls['fechaDesde'].setValue(this.transformDate(this.fechaDesdeFilter));
    this.formulario.controls['fechaHasta'].setValue(this.transformDate(this.fechaHastaFilter));
  }

  public createForm() {
    this.formulario = this.fb.group({
      fechaDesde: ['', ],
      fechaHasta: ['', this.lastDateValidator.bind(this)],
      estadoReserva: ['', ]
    });
  }

  public seleccionarEstado(event) {
    // this.estadoReservaFilter = event;
    this.reservaFilterDto.estado = event;
  }

  lastDateValidator() {
    try {
      const fechaDesde = this.fechaDesdeFilter;
      const fechaHasta = this.formulario.get('fechaHasta').value.split('/');
      const year = Number(fechaHasta[2]);
      const month = Number(fechaHasta[1]) - 1;
      const day = Number(fechaHasta[0]);
      const fechaHastaDate = new Date(year, month, day);
      fechaHastaDate.setDate(fechaHastaDate.getDate() + 1);
      if (fechaHastaDate < fechaDesde) {
        return {
          lastDateValidator: true
        }; } else {
          return {};
        }
    } catch (e) {
      return {
        lastDateValidator: false
      };
    }
  }

  myFilterDate = (d: Date): boolean => {
    const date = this.fechaDesdeFilter;
    // se puede seleccionar dias desde hoy para adelante
    return d >= date;
  }

  transformDate(date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  public compararEstados(e1: EstadoReserva, e2: EstadoReserva): boolean{
    return e1.id === e2.id;
  }

  public search() {
    if (!this.formulario.valid) return;
  }

  public cleanFilter() {
    this.reservaFilterDto = new ReservaFilterDTO();
    this.formulario.reset();
    this.ngOnInit();
  }

  public eliminar(reserva: Reserva) {

  }
}
