import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../../services/reserva.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Reserva, TipoHabitacion, Habitacion, Salon, Persona } from '../../../models/model';
import { TipoHabitacionService } from '../../../services/tipo-habitacion.service';
import { HabitacionService } from '../../../services/habitacion.service';
import { SalonService } from '../../../services/salon.service';
import { AuthService } from '../../../services/auth.service';
import { PATTERN_ONLYNUMBER, MIN_DNI, MAX_DNI } from '../../../shared/constants';
import { PersonaService } from '../../../services/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserva-add',
  templateUrl: './reserva-add.component.html',
  styleUrls: ['./reserva-add.component.css']
})
export class ReservaAddComponent implements OnInit {

  formularioFilter: FormGroup;
  formularioNuevaReserva: FormGroup;
  formularioFilterPersona: FormGroup;
  reserva: Reserva = new Reserva();
  persona: Persona = new Persona();
  comboTipoHab: TipoHabitacion[] = [];
  habitacionesDisponibles: Habitacion[] = [];
  salonesDisponibles: Salon[] = [];
  personaSeleccionada: Persona = new Persona();
  mostrarListadoHabitacionesDisp: boolean = false;
  mostrarListadoSalonesDisp: boolean = false;
  mostrarFiltrosPersona: boolean = false;
  perteneceAlHotel: boolean = false;
  mostrarFormularioAltaNuevoUsuario: boolean = false;
  mostrarFormularioReserva: boolean = false;
  mostrarCamposFormReserva: boolean = false;

  constructor(private reservaService: ReservaService,
              private tipoHabitacionService: TipoHabitacionService,
              private habitacionService: HabitacionService,
              private salonService: SalonService,
              private authService: AuthService,
              private personaService: PersonaService,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit() {
    this.tipoHabitacionService.getAll().subscribe(data => {
      this.comboTipoHab = data;
      this.createForm();
    });
    if (!this.authService.isCliente()) {
      this.perteneceAlHotel = true;
    }
  }

  public createForm() {
    this.formularioFilter = this.fb.group({
      salon: ['', Validators.required],
      tipoHab: ['', Validators.required],
      fechaDesde: ['', Validators.required]
    });

    this.formularioFilterPersona = this.fb.group({
      nroDocumento: ['', Validators.compose([Validators.required, Validators.pattern(PATTERN_ONLYNUMBER), Validators.min(MIN_DNI), Validators.max(MAX_DNI)])],
      tipoDocumento: ['', Validators.required],
    });

    this.formularioNuevaReserva = this.fb.group({
      fechaEntrada: ['', Validators.required],
      fechaSalida: ['', Validators.required],
      cantDias: ['', ],
      total: ['', ]
    });
  }

  public compararTipo(t1: TipoHabitacion, t2: TipoHabitacion): boolean{
    return t1.id === t2.id;
  }

  public searchHabitacionesOrSalonesDisponibles() {
    const { salon, tipoHab, fechaDesde } = this.formularioFilter.value;
    if (salon === 1 || salon === '1') {
      this.habitacionService.searchHabitacionesDisponibles(tipoHab, fechaDesde).subscribe(data => {
        this.habitacionesDisponibles = data;
        this.mostrarListadoHabitacionesDisp = true;
      });
    } else {
      this.salonService.getAllDisponibles(fechaDesde).subscribe(data => {
        this.salonesDisponibles = data;
        this.mostrarListadoSalonesDisp = true;
      });
    }
  }

  public seleccionarHabitacion(habitacion: Habitacion) {
    this.habitacionesDisponibles.forEach(h => {
      if (h.id !== habitacion.id) {
        h.seleccionada = true;
      }
    });
    // Asignamos la habitacion seleccionada a la reserva
    this.reserva.habitacion = habitacion;
    this.mostrarFiltrosPersona = true;
  }

  public seleccionarSalon(salon: Salon) {
    this.salonesDisponibles.forEach(s => {
      if (s.id !== salon.id) {

      }
    });
    this.reserva.salon = salon;
    this.mostrarFiltrosPersona = true;
  }

  public searchPersona() {
    if (this.formularioFilterPersona.invalid) return;

    const { tipoDocumento, nroDocumento } = this.formularioFilterPersona.value;

    this.personaService.getPersonaByDocumento(tipoDocumento, nroDocumento).subscribe(data => {
      this.personaSeleccionada = data;
      if (this.personaSeleccionada === null) {
        Swal.fire('No existe!', 'La persona no existe!', 'error');
        this.mostrarFormularioAltaNuevoUsuario = true;
      } else {
        this.reserva.persona = this.personaSeleccionada;
        this.mostrarFormularioReserva = true;
      }
    });
  }

  public obtenerPersonaParaReserva(event) {
    const persona = event;
    this.reserva.persona = persona;
    this.mostrarFormularioReserva = true;
  }

  public save() {
    if (this.formularioNuevaReserva.invalid) return;

    const { fechaEntrada, fechaSalida } = this.formularioNuevaReserva.value
    console.log(fechaEntrada, fechaSalida);

    this.reserva.fechaEntrada = fechaEntrada;
    this.reserva.fechaSalida = fechaSalida;
    console.log(this.reserva);
    this.reservaService.registrarNuevaReserva(this.reserva).subscribe(data => {
      this.reserva = data;
      Swal.fire('Registrada!', 'Reserva registrada con exito', 'success');
      this.formularioNuevaReserva.controls['cantDias'].setValue(this.reserva.cantDias + ' dias');
      let total = this.reserva.cantDias * this.reserva.habitacion.tipoHabitacion.precioPorDia;
      this.formularioNuevaReserva.controls['total'].setValue('$' + total + ',00');
      this.mostrarCamposFormReserva = true;
    }, err => {
      Swal.fire('Error!', 'Ocurrio un error. Consulte al Administrador!', 'error');
    });
  }
}
