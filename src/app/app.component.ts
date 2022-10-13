import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  // public get usuario(): UsuarioService {
  //   return this._usuario;
  // }

  // public set usuario(value: UsuarioService) {
  //   this._usuario = value;
  // }

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
    tipoSangre: ['', Validators.required],
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
    numero: ['', Validators.required],
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
    disciplina: ['', Validators.required],
    plan: ['', Validators.required],    
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
    
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    console.log(this.thirdFormGroup.value);
    console.log(this.fourthFormGroup.value);
    console.log(this.fifthFormGroup.value);

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
