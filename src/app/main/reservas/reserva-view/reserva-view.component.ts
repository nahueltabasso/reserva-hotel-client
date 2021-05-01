import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Reserva } from '../../../models/model';
import { ReservaService } from '../../../services/reserva.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reserva-view',
  templateUrl: './reserva-view.component.html',
  styleUrls: ['./reserva-view.component.css']
})
export class ReservaViewComponent implements OnInit {

  formularioReserva: FormGroup;
  formularioPersona: FormGroup;
  reserva: Reserva = new Reserva();
  isHabitacion: boolean = false;
  perteneceAlHotel: boolean = false;

  constructor(private reservaService: ReservaService,
              private fb: FormBuilder,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe) {}

  ngOnInit() {
    this.createForm();
    this.activatedRoute.paramMap.subscribe(params => {
      const id: number = Number (params.get('id'));
      this.reservaService.getById(id).subscribe(data => {
        this.reserva = data;
        if (!this.authService.isCliente()) {
          this.perteneceAlHotel = true;
        }
        this.loadData();
      });
    });
  }

  public createForm() {
    this.formularioReserva = this.fb.group({
      id: [{value: '', disabled: true}],
      fechaReserva: [{value: '', disabled: true}],
      fechaSalida: [{value: '', disabled: true}],
      fechaEntrada: [{value: '', disabled: true}],
      estadoReserva: [{value: '', disabled: true}],
      fechaCancelacion: [{value: '', disabled: true}],
      tipoHabitacion: [{value: '', disabled: true}],
      nroHabitacion: [{value: '', disabled: true}],
      precioPorDia: [{value: '', disabled: true}],
      nroSalon: [{value: '', disabled: true}],
      cantDias: [{value: '', disabled: true}],
      precioTotal: [{value: '', disabled: true}]
    });

    this.formularioPersona = this.fb.group({
      nombre: [{value: '', disabled: true}],
      apellido: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}],
      tipoNroDoc: [{value: '', disabled: true}],
      cuit: [{value: '', disabled: true}],
      telefono: [{value: '', disabled: true}],
      genero: [{value: '', disabled: true}]
    });
  }

  public loadData() {
    this.formularioReserva.controls['id'].setValue(this.reserva.id);
    this.formularioReserva.controls['fechaReserva'].setValue(this.transformDate(this.reserva.fechaReserva));
    this.formularioReserva.controls['fechaSalida'].setValue(this.transformDate(this.reserva.fechaSalida));
    this.formularioReserva.controls['fechaEntrada'].setValue(this.transformDate(this.reserva.fechaEntrada));
    this.formularioReserva.controls['estadoReserva'].setValue(this.reserva.estadoReserva.descripcion);
    if (this.reserva.fechaCancelacion !== null && this.reserva.fechaCancelacion !== undefined) {
      this.formularioReserva.controls['fechaCancelacion'].setValue(this.transformDate(this.reserva.fechaCancelacion));
    } else {
      this.formularioReserva.controls['fechaCancelacion'].setValue('No Aplica');
    }
    this.formularioReserva.controls['cantDias'].setValue(this.reserva.cantDias + ' dias');
    if (this.reserva.habitacion.id !== null) {
      this.formularioReserva.controls['tipoHabitacion'].setValue(this.reserva.habitacion.tipoHabitacion.descripcion);
      this.formularioReserva.controls['nroHabitacion'].setValue(this.reserva.habitacion.numeroHabitacion);
      this.formularioReserva.controls['precioPorDia'].setValue('$' + this.reserva.habitacion.tipoHabitacion.precioPorDia + ',00');  
      this.isHabitacion = true;
      let precioTotal: number = 0;
      precioTotal = this.reserva.habitacion.tipoHabitacion.precioPorDia * this.reserva.cantDias;
      this.formularioReserva.controls['precioTotal'].setValue('$' + precioTotal + ',00');  
    } else {
      this.formularioReserva.controls['nroSalon'].setValue(this.reserva.salon.nombreSalon);
      this.formularioReserva.controls['precioPorDia'].setValue('$' + this.reserva.salon.precioPorDia + ',00');
      this.isHabitacion = false;
      let precioTotal: number = 0;
      precioTotal = this.reserva.salon.precioPorDia * this.reserva.cantDias;
      this.formularioReserva.controls['precioTotal'].setValue('$' + precioTotal + ',00');  
    }

    const persona = this.reserva.persona;
    this.formularioPersona.controls['nombre'].setValue(persona.nombre);
    this.formularioPersona.controls['apellido'].setValue(persona.apellido);
    this.formularioPersona.controls['email'].setValue(persona.email);
    this.formularioPersona.controls['tipoNroDoc'].setValue(persona.tipoDocumento + ' - ' + persona.nroDocumento);
    this.formularioPersona.controls['cuit'].setValue(persona.cuit);
    this.formularioPersona.controls['telefono'].setValue(persona.telefono);
    if (persona.genero === 'M') {
      this.formularioPersona.controls['genero'].setValue('MASCULINO');
    } else {
      this.formularioPersona.controls['genero'].setValue('FEMENINO');
    }
  }
  
  public transformDate(date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

}
