import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from './service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'inscripciones';
  public get usuario(): UsuarioService {
    return this._usuario;
  }

  public set usuario(value: UsuarioService) {
    this._usuario = value;
  }

  firstFormGroup = this._formBuilder.group({
    nombre: ['', Validators.required],
    apellidoPaterno: ['', Validators.required],
    apellidoMaterno: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    sexo: ['', Validators.required],
    curp: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    afiliacionMedica: ['', Validators.required],
    alergias: ['', Validators.required],
    padecimientos: ['', Validators.required],
    estatura: ['', Validators.required],
    peso: ['', Validators.required],
    tipoSangre: ['', Validators.required]
  });
  thirdFormGroup = this._formBuilder.group({
    numeroCelular: ['', Validators.required],
    numeroCasa: ['', Validators.required],
    email: ['', Validators.required],
    cp: ['', Validators.required],
    estado: ['', Validators.required],
    municipio: ['', Validators.required],
    colonia: ['', Validators.required],
    calle: ['', Validators.required],

  });
  fourthFormGroup = this._formBuilder.group({
    nombre: ['', Validators.required],
    apellidoPaterno: ['', Validators.required],
    apellidoMaterno: ['', Validators.required],
    parentesco: ['', Validators.required],
    numeroCelular: ['', Validators.required],
    numeroCasa: ['', Validators.required],
    email: ['', Validators.required],
  });
  fifthFormGroup = this._formBuilder.group({
    fifthCtrl: ['', Validators.required],
  });

  isEditable = false;

  constructor(
    private _usuario: UsuarioService,
    private _formBuilder: FormBuilder) {}

}
