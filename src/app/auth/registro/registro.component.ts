import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona, Pais, Provincia, Localidad, Domicilio, Rol } from '../../models/model';
import { PATTERN_ONLYLETTERS, PATTERN_ONLYNUMBER, validEqualsPasswords, MIN_DNI, MAX_DNI, DEFAULT_PASSWORD } from '../../shared/constants';
import Swal from 'sweetalert2';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formulario: FormGroup;
  comboPaises: Pais[] = [];
  comboProvincias: Provincia[] = [];
  comboLocalidades: Localidad[] = [];
  flagDpto: boolean = false
  @Input() personaDTO: Persona = new Persona();
  @Input() flagAltaUsuarioReserva: boolean = false;
  @Output() devolverPersona: EventEmitter<Persona>;

  constructor(private authService: AuthService,
              private personaService: PersonaService,
              private fb: FormBuilder,
              private router: Router) {
    this.devolverPersona = new EventEmitter();
  }

  ngOnInit() {
    this.createForm();
    // Iniciamos el objeto domicilio de la persona;
    this.personaDTO.domicilio = new Domicilio();
    this.personaService.getPaises().subscribe(data => {
      this.comboPaises = data;
      this.formulario.controls['provincia'].disable();
      this.formulario.controls['ciudad'].disable();
      this.formulario.controls['piso'].disable();
      this.formulario.controls['departamento'].disable();
    });
    if (this.flagAltaUsuarioReserva) {
      this.formulario.controls['password'].setValue(DEFAULT_PASSWORD);
      this.formulario.controls['passwordConfirm'].setValue(DEFAULT_PASSWORD);
    }
  }

  public createForm() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.compose([Validators.required, Validators.pattern(PATTERN_ONLYLETTERS)])],
      apellido: ['', Validators.compose([Validators.required, Validators.pattern(PATTERN_ONLYLETTERS)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      nroDocumento: ['', Validators.compose([Validators.required, Validators.pattern(PATTERN_ONLYNUMBER), Validators.min(MIN_DNI), Validators.max(MAX_DNI)])],
      tipoDocumento: ['', Validators.required],
      cuit: ['', Validators.compose([Validators.required, Validators.pattern(PATTERN_ONLYNUMBER)])],
      telefono: ['', Validators.compose([Validators.required, Validators.pattern(PATTERN_ONLYNUMBER)])],
      genero: ['', Validators.required],
      pais: ['', Validators.required],
      provincia: ['', Validators.required],
      ciudad: ['', Validators.required],
      calle: ['', Validators.required],
      numero: ['', Validators.compose([Validators.required, Validators.pattern(PATTERN_ONLYNUMBER)])],
      isDpto: ['', ],
      piso: ['', Validators.pattern(PATTERN_ONLYNUMBER)],
      departamento: ['', Validators.pattern(PATTERN_ONLYNUMBER)]
    }, {
      validators: validEqualsPasswords
    });
  }

  public seleccionarTipoDocumento(event) {
    this.personaDTO.tipoDocumento = event;
  }

  public seleccionarGenero(event) {
    this.personaDTO.genero = event
  }

  public seleccionarPais(event) {
    this.personaService.getProvinciasByPais(event).subscribe(data => {
      this.comboProvincias = data;
      this.formulario.controls['provincia'].enable();
    });
  }

  public seleccionarProvincia(event) {
    this.personaService.getLocalidadesByProvincia(event).subscribe(data => {
      this.comboLocalidades = data;
      this.formulario.controls['ciudad'].enable();
    });
  }

  public seleccionarCiudad(event) {
    this.personaDTO.domicilio.localidad = event;
  }

  public seleccionarTipoCasa(event) {
    const flag = event;
    if (event) {
      this.formulario.controls['piso'].enable();
      this.formulario.controls['departamento'].enable();
    }
  }

  public registrarNuevoUsuario() {
    if (this.formulario.invalid) return;
    const { nombre, apellido, email, password, nroDocumento, cuit, telefono, calle, numero, piso, departamento } = this.formulario.value;
    this.personaDTO.nombre = nombre;
    this.personaDTO.apellido = apellido;
    this.personaDTO.email = email;
    this.personaDTO.password = password;
    this.personaDTO.nroDocumento = nroDocumento;
    this.personaDTO.cuit = cuit;
    this.personaDTO.telefono = telefono;
    // this.personaDTO.domicilio.localidad = ciudad;
    this.personaDTO.domicilio.calle = calle;
    this.personaDTO.domicilio.numero = numero;
    this.personaDTO.domicilio.piso = piso;
    this.personaDTO.domicilio.departamento = departamento;

    this.authService.registracion(this.personaDTO).subscribe(data => {
      Swal.fire('Registrado!', 'Usuario registrado correctamente', 'success');
      if (this.flagAltaUsuarioReserva) {
        this.devolverPersona.emit(data);
      } else {
        this.router.navigate(['/login']);
      }
    }, (err) => {
      Swal.fire('Error!', `${err.error.message}`, 'error');
    });
  }

  public checkPassword(): boolean {
    return this.formulario.hasError('notEquals') &&
           this.formulario.get('password').dirty &&
           this.formulario.get('passwordConfirm').dirty;
  }

  public compararLocalidad(l1: Localidad, l2: Localidad): boolean{
    return l1.id === l2.id;
  }
}
