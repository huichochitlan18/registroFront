import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cp } from './interface/cp-interface';
import { CodigoPostal } from './service/cp.service';
import { UsuarioService } from './service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'inscripciones';
  catalogoCP: cp[] = [];
  catalogoCPFiltro: cp[] = [];
  horario=[
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
  ]
  // public get usuario(): UsuarioService {
  //   return this._usuario;
  // }

  // public set usuario(value: UsuarioService) {
  //   this._usuario = value;
  // }
  formJoin?:FormGroup;

  secondFormGroup = this._formBuilder.group({
    afiliacionMedica: ['ASDF', Validators.required],
    alergias: ['ASDF', Validators.required],
    padecimientos: ['ASDF', Validators.required],
    estatura: ['234', Validators.required],
    peso: ['234', Validators.required],
    tipoSangre: ['ASDF', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    numeroCelular: ['234', Validators.required],
    numeroCasa: ['234', Validators.required],
    cp: ['', Validators.required],
    estado: ['', Validators.required],
    municipio: ['', Validators.required],
    colonia: ['', Validators.required],
    calle: ['', Validators.required],
    numero: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    nombre: ['JOSE', Validators.required],
    apellidoPaterno: ['asd', Validators.required],
    apellidoMaterno: ['asd', Validators.required],
    parentesco: ['asd', Validators.required],
    numeroCelular: ['asd', Validators.required],
    numeroCasa: ['123', Validators.required],
    correo: ['123', Validators.required],
  });

  fifthFormGroup = this._formBuilder.group({
    disciplina: ['', Validators.required],
    plan: ['', Validators.required],
    lunes: [''],
    martes: [''],
    miercoles: [''],
    jueves: [''],
    viernes: [''],
    sabado: [''],
    doming: [''],

  });

  firstFormGroup = this._formBuilder.group({
    correo: ['jose@jose.com', Validators.required],
    nombre: ['asdf', Validators.required],
    apellidoPaterno: ['asdf', Validators.required],
    apellidoMaterno: ['asdf', Validators.required],
    fechaNacimiento: ['asdf', Validators.required],
    sexo: ['asdf', Validators.required],
    curp: ['asdf', Validators.required],
    datosMedicos: [this.secondFormGroup.value],
    datosContacto: [this.thirdFormGroup.value],
    datosContactoEmergencia: [this.fourthFormGroup.value],
    horario: [this.fifthFormGroup.value]
  });

  isEditable = false;

  constructor(
    // private _usuario: UsuarioService,
    private _formBuilder: FormBuilder,
    private _codigoPostal: CodigoPostal
  ) {}
  ngOnInit(): void {
    // this.codigosPostalesLista();
    // this.listaFormaPago();
    // this.listaMetodoPago();
    // this.listaMoneda();
    // console.log(this.filter());
  }

  datos(){
    this.firstFormGroup.get('datosMedicos')?.patchValue(this.secondFormGroup.value);
    this.firstFormGroup.get('datosContacto')?.patchValue(this.thirdFormGroup.value);
    this.firstFormGroup.get('datosContactoEmergencia')?.patchValue(this.fourthFormGroup.value);
    this.firstFormGroup.get('horario')?.patchValue(this.fifthFormGroup.value);
    console.log(this.firstFormGroup.value);
    // console.log(this.secondFormGroup.value);
    // console.log(this.thirdFormGroup.value);
    // console.log(this.fourthFormGroup.value);
    // console.log(this.fifthFormGroup.value);
    // this.formJoin =new FormGroup({form1:this.firstFormGroup,form2:this.secondFormGroup});
    // console.log(this.formJoin);

  }
  codigosPostalesLista(cp: string) {
    if (cp.length == 5) {
      this._codigoPostal.codigoPostal(cp).subscribe((codigoPostal) => {
        this.catalogoCP = codigoPostal;
        this.thirdFormGroup.get('estado')?.patchValue(this.catalogoCP[0].estado);
        this.thirdFormGroup.get('municipio')?.patchValue(this.catalogoCP[0].municipio);
        this.thirdFormGroup.controls['colonia'].setValue('');
        // this.thirdFormGroup.get('localidad')?.patchValue.();
        console.log(this.catalogoCP);
      });
    }
  }

  codigosPostalesLocalidad(localidad: string): string {
    // console.log(cp+"asdfasdf");
    // localidad = localidad.toLowerCase();
    console.log(localidad);
    return this.catalogoCP.find((x) => x.localidad === localidad)
      ?.localidad!;
  }

  codigosPostalesfilter(cp: string): void {
    // Moneda = Moneda.toLowerCase();
    // if (cp.length == 5) {
      console.log(cp);
      this.catalogoCPFiltro = this.catalogoCP.filter((codigoPostal) =>
        codigoPostal.localidad
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(cp)
      );
    // }
  }
  // displayFn(value?: number) {
  //   return value ? this.catalogoCPFiltro.find(x => x.cp === value).name : undefined;
  // }
}
