import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/model';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  persona: Persona = new Persona();
  formulario: FormGroup;

  constructor(private authService: AuthService,
              private storage: TokenStorageService,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.formulario = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  public login() {
    if (this.formulario.invalid) return;
    const { email, password } = this.formulario.value;
    this.persona.email = email;
    this.persona.password = password;

    this.authService.login(this.persona).subscribe(data => {
      this.persona = data;
      this.storage.saveUser(this.persona);
      this.storage.saveToken(this.persona.token);
      this.router.navigate(['']);
      Swal.fire('Login', `Hola ${this.persona.nombre} ${this.persona.apellido}, has iniciado sesion con exito!`, 'success');
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error!',
        text: 'Email o contraseña incorrectas'
      });
    });
  }

  public reloadPage(): void {
    window.location.reload();
  }
}
