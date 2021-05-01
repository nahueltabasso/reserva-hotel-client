import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Persona, Domicilio, Pais, Provincia, Localidad, Rol } from '../../../models/model';
import { PersonaService } from '../../../services/persona.service';
import { Router } from '@angular/router';
import { PATTERN_ONLYLETTERS, PATTERN_ONLYNUMBER, MIN_DNI, MAX_DNI, DEFAULT_PASSWORD } from '../../../shared/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-persona-add',
  templateUrl: './persona-add.component.html',
  styleUrls: ['./persona-add.component.css']
})
export class PersonaAddComponent implements OnInit {

  formulario: FormGroup;
  persona: Persona = new Persona();
  isEmpleado: boolean = false;
  comboPaises: Pais[] = [];
  comboProvincias: Provincia[] = [];
  comboLocalidades: Localidad[] = [];
  comboRoles: Rol[] = [];

  constructor(private personaService: PersonaService,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit() {
    this.createForm();
    this.persona.domicilio = new Domicilio();
    this.persona.rol = new Rol();
    this.personaService.getPaises().subscribe(data => {
      this.comboPaises = data;
      this.formulario.controls['provincia'].disable();
      this.formulario.controls['ciudad'].disable();
      this.formulario.controls['piso'].disable();
      this.formulario.controls['departamento'].disable();
    });
    this.formulario.controls['password'].setValue(DEFAULT_PASSWORD);
    this.formulario.controls['password'].disable();
    this.formulario.controls['passwordConfirm'].setValue(DEFAULT_PASSWORD);
    this.formulario.controls['passwordConfirm'].disable();
    this.personaService.getRoles().subscribe(roles => {
      this.comboRoles = roles;
    });
  }

  public createForm() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.compose([Validators.required, Validators.pattern(PATTERN_ONLYLETTERS)])],
      apellido: ['', Validators.compose([Validators.required, Validators.pattern(PATTERN_ONLYLETTERS)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', ],
      passwordConfirm: ['', ],
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
      rol: ['', Validators.required],
      departamento: ['', Validators.pattern(PATTERN_ONLYNUMBER)],
      legajo: ['', ],
      sueldo: ['', ],
      descripcion: ['', ] 
    });
  }

  public setRol(event) {
    let rol = event;
    if (rol.nombreRol !== 'Cliente') {
      this.isEmpleado = true;
      this.formulario.controls['legajo'].setValidators([Validators.required, Validators.pattern(PATTERN_ONLYNUMBER)]);
      this.formulario.controls['sueldo'].setValidators([Validators.required, Validators.pattern(PATTERN_ONLYNUMBER)]);
      this.formulario.controls['descripcion'].setValidators([Validators.required]);
    } else {
      this.isEmpleado = false;
      this.formulario.controls['legajo'].setValidators([]);
      this.formulario.get('legajo').updateValueAndValidity();
      this.formulario.controls['sueldo'].setValidators([]);
      this.formulario.get('sueldo').updateValueAndValidity();
      this.formulario.controls['descripcion'].setValidators([]);
      this.formulario.get('descripcion').updateValueAndValidity();
    }
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

  public seleccionarTipoCasa(event) {
    const flag = event;
    if (event) {
      this.formulario.controls['piso'].enable();
      this.formulario.controls['departamento'].enable();
    }
  }

  public compararLocalidad(l1: Localidad, l2: Localidad): boolean{
    return l1.id === l2.id;
  }

  public compararRol(r1: Rol, r2: Rol): boolean{    
    return r1.id === r2.id;
  }

  public save() {
    if (this.formulario.invalid) return;

    const { nombre, apellido, email, password, nroDocumento, tipoDocumento, cuit, telefono,
       genero, ciudad, calle, numero, piso, rol, departamento, legajo, sueldo, descripcion } = this.formulario.value;

    this.persona.nombre = nombre;
    this.persona.apellido = apellido;
    this.persona.email = email;
    this.persona.password = DEFAULT_PASSWORD;
    this.persona.nroDocumento = nroDocumento;
    this.persona.tipoDocumento = tipoDocumento;
    this.persona.cuit = cuit;
    this.persona.telefono = telefono;
    this.persona.genero = genero;
    this.persona.rol = rol;
    if (this.isEmpleado) {
      this.persona.legajo = legajo;
      this.persona.sueldoMensual = sueldo;
      this.persona.descripcion = descripcion;
    } else {
      this.persona.legajo = null;
      this.persona.sueldoMensual = null;
      this.persona.descripcion = null;
    }
    this.persona.domicilio.calle = calle;
    this.persona.domicilio.numero = numero;
    this.persona.domicilio.piso = piso;
    this.persona.domicilio.departamento = departamento;
    this.persona.domicilio.localidad = ciudad;
    this.personaService.registrarPersona(this.persona).subscribe(data => {
      Swal.fire('Registrado!', 'Usuario Registrado con exito!', 'success');
      this.router.navigateByUrl('/personas');
    }, err => {
      Swal.fire('Error!', `${err.error.message}`, 'error');
    });
  }
  
}
