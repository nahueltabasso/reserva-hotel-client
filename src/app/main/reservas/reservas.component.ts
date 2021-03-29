import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EstadoReserva, Reserva } from '../../models/model';
import { ReservaService } from '../../services/reserva.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  formulario: FormGroup;
  fechaDesdeFilter: Date = new Date();
  fechaHastaFilter: Date = new Date();
  estadoReservaFilter: EstadoReserva = new EstadoReserva();
  reservaList: Reserva[] = [];
  comboEstados: EstadoReserva[] = [];

  constructor(private reservaService: ReservaService,
              private fb: FormBuilder,
              private datePipe: DatePipe) {}

  ngOnInit() {
    this.reservaService.getAllReservas().subscribe(data => {
      this.reservaList = data;
    });
    this.reservaService.getAllEstados().subscribe(estados => {
      this.comboEstados = estados;
      console.log(this.comboEstados);
      this.estadoReservaFilter = this.comboEstados[0];
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
    this.estadoReservaFilter = event;
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

}
