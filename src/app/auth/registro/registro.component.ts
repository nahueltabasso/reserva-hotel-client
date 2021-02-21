import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from '../../models/model';
import { PATTERN_ONLYLETTERS, PATTERN_ONLYNUMBER, validEqualsPasswords, MIN_DNI, MAX_DNI } from '../../shared/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formulario: FormGroup;
  personaDTO: Persona = new Persona();


  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit() {
    this.createForm();
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
      genero: ['', Validators.required]
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

  public registrarNuevoUsuario() {
    if (this.formulario.invalid) return;
    const { nombre, apellido, email, password, nroDocumento, cuit, telefono } = this.formulario.value;
    this.personaDTO.nombre = nombre;
    this.personaDTO.apellido = apellido;
    this.personaDTO.email = email;
    this.personaDTO.password = password;
    this.personaDTO.nroDocumento = nroDocumento;
    this.personaDTO.cuit = cuit;
    this.personaDTO.telefono = telefono;

    this.authService.registracion(this.personaDTO).subscribe(data => {
      Swal.fire('Registrado!', 'Usuario registrado correctamente', 'success');
      this.router.navigate(['/login']);
    }, (err) => {
      Swal.fire('Error!', 'Ocurrio un error!', 'error');
    });
  }

  public checkPassword(): boolean {
    return this.formulario.hasError('notEquals') &&
           this.formulario.get('password').dirty &&
           this.formulario.get('passwordConfirm').dirty;
  }
}
