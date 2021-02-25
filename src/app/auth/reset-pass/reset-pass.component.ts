import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';
import { validEqualsPasswords } from '../../shared/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

  path: UrlTree;
  flagToken: boolean;
  formularioSolicitud: FormGroup;
  formularioResetPass: FormGroup;
  email: string;
  password: string;
  token: string;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit() {
    this.path = this.router.parseUrl(this.router.url);
    this.token = this.path.queryParams['token'];
    if (this.token != '' && this.token != null && this.token != undefined) {
      this.flagToken = true;
    } else {
      this.flagToken = false;
    }
    this.createForm();
  }

  public createForm() {
    this.formularioSolicitud = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
    this.formularioResetPass = this.fb.group({
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    }, {
      validators: validEqualsPasswords
    });
  }

  public solicitarCambioContrasenia() {
    if (this.formularioSolicitud.invalid) return;

    const { email } = this.formularioSolicitud.value;
    this.email = email;

    this.authService.forgotPassword(this.email).subscribe(data => {
      console.log("entra", data);
      Swal.fire('Listo!', 'Se te ha enviado un correo a tu casilla con los pasos a seguir!', 'success');
    }, (err) => {
      Swal.fire('Error!', `${err.error.message}`, 'error');
    });
  }

  public modificarContrasenia() {
    if (this.formularioResetPass.invalid) return ;
    const { password } = this.formularioResetPass.value;
    this.password = password;
    this.authService.resetPassword(this.token, this.password).subscribe(data => {
      Swal.fire('Listo', 'Contraseña modificada exitosamente!', 'success');
      this.router.navigate(['/login']);
    }, (err) => {
      Swal.fire('Error!', `${err.error.message}`, 'error');
    })
  }

  public checkPassword(): boolean {
    return this.formularioResetPass.hasError('notEquals') &&
           this.formularioResetPass.get('password').dirty &&
           this.formularioResetPass.get('passwordConfirm').dirty;
  }
}
