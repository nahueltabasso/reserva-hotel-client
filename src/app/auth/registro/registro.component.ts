import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from '../../models/model';
import { PATTERN_ONLYLETTERS, PATTERN_ONLYNUMBER, validEqualsPasswords } from '../../shared/constants';

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
      nroDocumento: ['', Validators.compose([Validators.required, Validators.pattern(PATTERN_ONLYNUMBER)])],
      tipoDocumento: ['', Validators.required],
      cuit: ['', Validators.compose([Validators.required, Validators.pattern(PATTERN_ONLYNUMBER)])],
      telefono: ['', Validators.compose([Validators.required, Validators.pattern(PATTERN_ONLYNUMBER)])],
      genero: ['', Validators.required]
    }, {
      validators: validEqualsPasswords
    });
  }

  public registrarNuevoUsuario() {
    if (this.formulario.invalid) return;
    
  }
}
