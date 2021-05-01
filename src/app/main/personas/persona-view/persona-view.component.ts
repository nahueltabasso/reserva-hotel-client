import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Persona } from '../../../models/model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { DatePipe } from '@angular/common';
import { PersonaService } from '../../../services/persona.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-persona-view',
  templateUrl: './persona-view.component.html',
  styleUrls: ['./persona-view.component.css']
})
export class PersonaViewComponent implements OnInit {

  persona: Persona = new Persona();
  formulario: FormGroup;
  perteneceAlHotel: boolean = false;
  titulo: string;

  constructor(private personaService: PersonaService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe) {}

  ngOnInit() {
    this.createForm();
    this.activatedRoute.paramMap.subscribe(params => {
      const id: number = Number (params.get('id'));
      this.personaService.getById(id).subscribe(data => {
        this.persona = data;
        if (this.persona.rol.nombreRol !== 'Cliente') {
          this.perteneceAlHotel = true;
        }
        this.titulo = `DETALLE DE ${this.persona.nombre.toUpperCase()}, ${this.persona.apellido.toUpperCase()}`;
        this.loadData();
      });
    });

  }

  public createForm() {
    this.formulario = this.fb.group({
      id: [{value: '', disabled: true}],
      nombre: [{value: '', disabled: true}],
      apellido: [{value: '', disabled: true}],
      genero: [{value: '', disabled: true}],
      tipoDoc: [{value: '', disabled: true}],
      nroDoc: [{value: '', disabled: true}],
      cuit: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}],
      telefono: [{value: '', disabled: true}],
      createAt: [{value: '', disabled: true}],
      rol: [{value: '', disabled: true}],
      calle: [{value: '', disabled: true}],
      numero: [{value: '', disabled: true}],
      piso: [{value: '', disabled: true}],
      dpto: [{value: '', disabled: true}],
      ciudad: [{value: '', disabled: true}],
      legajo: [{value: '', disabled: true}],
      sueldo: [{value: '', disabled: true}],
      descripcion: [{value: '', disabled: true}],
    });
  }

  public loadData() {
    this.formulario.controls['id'].setValue(this.persona.id);
    this.formulario.controls['nombre'].setValue(this.persona.nombre);
    this.formulario.controls['apellido'].setValue(this.persona.apellido);
    let genero = this.persona.genero === 'M' ? 'Hombre' : 'Mujer';
    this.formulario.controls['genero'].setValue(genero);
    this.formulario.controls['tipoDoc'].setValue(this.persona.tipoDocumento);
    this.formulario.controls['nroDoc'].setValue(this.persona.nroDocumento);
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
      this.formulario.controls['dpto'].setValue(domicilio.departamento);
    } else {
      this.formulario.controls['piso'].setValue('NO APLICA');
      this.formulario.controls['dpto'].setValue('NO APLICA');
    }
    this.formulario.controls['ciudad'].setValue(domicilio.localidad.nombre);

    if (this.perteneceAlHotel) {
      this.formulario.controls['legajo'].setValue(this.persona.legajo);
      this.formulario.controls['sueldo'].setValue(this.persona.sueldoMensual);
      this.formulario.controls['descripcion'].setValue(this.persona.descripcion);
    }
  }

  public transformDate(date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
}
