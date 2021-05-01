import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Persona } from '../../models/model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PATTERN_ONLYLETTERS, PATTERN_ONLYNUMBER, MIN_DNI, MAX_DNI } from '../../shared/constants';
import { DatePipe } from '@angular/common';
import { PersonaService } from '../../services/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  persona: Persona = new Persona();
  formulario: FormGroup;

  constructor(public authService: AuthService,
              private personaService: PersonaService,
              private fb: FormBuilder,
              private datePipe: DatePipe) {}

  ngOnInit() {
    this.persona = this.authService.usuarioLogueado;
    console.log(this.persona);
    this.createForm();
    if (!this.authService.isCliente()) {
      this.formulario.controls['legajo'].setValidators([Validators.required, Validators.pattern(PATTERN_ONLYNUMBER)]);
      this.formulario.controls['sueldo'].setValidators([Validators.required, Validators.pattern(PATTERN_ONLYNUMBER)]);
      this.formulario.controls['descripcion'].setValidators([Validators.required]);
    }

    this.loadData();
  }

  public createForm() {
    this.formulario = this.fb.group({
      id: [{value: '', disabled: true}],
      nombre: [{value: '', disabled: true}],
      apellido: [{value: '', disabled: true}],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      nroDocumento: [{value: '', disabled: true}],
      tipoDocumento: [{value: '', disabled: true}],
      cuit: [{value: '', disabled: true}],
      telefono: ['', Validators.compose([Validators.required, Validators.pattern(PATTERN_ONLYNUMBER)])],
      createAt: [{value: '', disabled: true}],
      genero: [{value: '', disabled: true}],
      ciudad: [{value: '', disabled: true}],
      calle: [{value: '', disabled: true}],
      numero: [{value: '', disabled: true}],
      isDpto: [{value: '', disabled: true}],
      piso: [{value: '', disabled: true}],
      rol: [{value: '', disabled: true}],
      departamento: [{value: '', disabled: true}],
      legajo: ['', ],
      sueldo: ['', ],
      descripcion: ['', ] 
    });
  }

  public loadData() {
    this.formulario.controls['id'].setValue(this.persona.id);
    this.formulario.controls['nombre'].setValue(this.persona.nombre);
    this.formulario.controls['apellido'].setValue(this.persona.apellido);
    let genero = this.persona.genero === 'M' ? 'Hombre' : 'Mujer';
    this.formulario.controls['genero'].setValue(genero);
    this.formulario.controls['tipoDocumento'].setValue(this.persona.tipoDocumento);
    this.formulario.controls['nroDocumento'].setValue(this.persona.nroDocumento);
    this.formulario.controls['cuit'].setValue(this.persona.cuit);
    this.formulario.controls['email'].setValue(this.persona.email);
    this.formulario.controls['telefono'].setValue(this.persona.telefono);
    this.formulario.controls['createAt'].setValue(this.transformDate(this.persona.fechaCreacion));
    this.formulario.controls['rol'].setValue(this.persona.rol.nombreRol);
    let domicilio = this.persona.domicilio;
    this.formulario.controls['calle'].setValue(domicilio.calle);
    this.formulario.controls['numero'].setValue(domicilio.numero);
    if (domicilio.piso !== null && domicilio.piso !== undefined) {
      this.formulario.controls['piso'].setValue(domicilio.piso);
      this.formulario.controls['departamento'].setValue(domicilio.departamento);
    } else {
      this.formulario.controls['piso'].setValue('NO APLICA');
      this.formulario.controls['departamento'].setValue('NO APLICA');
    }
    this.formulario.controls['ciudad'].setValue(domicilio.localidad.nombre);

    if (!this.authService.isCliente()) {
      this.formulario.controls['legajo'].setValue(this.persona.legajo);
      this.formulario.controls['sueldo'].setValue(this.persona.sueldoMensual);
      this.formulario.controls['descripcion'].setValue(this.persona.descripcion);
    }
  }

  public transformDate(date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  public save() {
    if (this.formulario.invalid) return;

    const { email, telefono, legajo, sueldo, descripcion } = this.formulario.value;
    this.persona.email = email;
    this.persona.telefono = telefono;
    this.persona.legajo = legajo;
    this.persona.sueldoMensual = sueldo;
    this.persona.descripcion = descripcion;

    this.personaService.actualizarPerfil(this.persona.id, this.persona).subscribe(data => {
      Swal.fire('Perfil Actualizado!', 'Perfil actualizado con exito!', 'success');
    }, err => {
      console.log(err);
    });
  }
}
